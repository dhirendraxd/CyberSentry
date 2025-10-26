
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Profile } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Camera, Loader2, User as UserIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AvatarUploader from './AvatarEditor/AvatarUploader';

// Define the form schema with Zod
const profileFormSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  username: z.string().min(3, 'Username must be at least 3 characters').max(20),
  bio: z.string().max(160, 'Bio must not exceed 160 characters').optional(),
  website: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  company: z.string().max(50).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileForm = ({ user }: { user: User | null }) => {
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAvatarEditorOpen, setIsAvatarEditorOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: '',
      username: '',
      bio: '',
      website: '',
      company: '',
    },
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Profile fetch error:', error);
          if (error.code === 'PGRST116') {
            // Record not found, create a new profile
            try {
              const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert({
                  id: user.id,
                  full_name: user.user_metadata?.full_name || '',
                  username: user.email?.split('@')[0] || '',
                  avatar_url: user.user_metadata?.avatar_url || null,
                  created_at: new Date().toISOString()
                })
                .select()
                .single();
                
              if (insertError) throw insertError;
              
              if (newProfile) {
                setProfile(newProfile as Profile);
                form.reset({
                  full_name: newProfile.full_name || '',
                  username: newProfile.username || '',
                  bio: newProfile.bio || '',
                  website: newProfile.website || '',
                  company: newProfile.company || '',
                });
                setAvatarUrl(newProfile.avatar_url);
              }
            } catch (insertErr) {
              console.error('Error creating new profile:', insertErr);
            }
            return;
          }
          
          throw error;
        }

        if (data) {
          setProfile(data as Profile);
          form.reset({
            full_name: data.full_name || '',
            username: data.username || '',
            bio: data.bio || '',
            website: data.website || '',
            company: data.company || '',
          });
          setAvatarUrl(data.avatar_url);
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error loading profile",
          description: "We couldn't load your profile data. Please try again.",
          variant: "destructive"
        });
      }
    };

    fetchProfile();
  }, [user, form]);

  // Handle profile update submission
  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to update your profile",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: values.full_name,
          username: values.username,
          bio: values.bio || null,
          website: values.website || null,
          company: values.company || null,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar save from editor
  const handleAvatarSave = async (blob: Blob) => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please sign in to update your avatar",
        variant: "destructive"
      });
      return;
    }
    
    setUploadLoading(true);

    try {
      // Generate a unique filename using timestamp
      const fileExt = 'jpg';
      const fileName = `avatar-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      // Create a File object from the Blob
      const file = new File([blob], fileName, { type: 'image/jpeg' });
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update user profile with avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          avatar_url: publicUrlData.publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) throw updateError;

      setAvatarUrl(publicUrlData.publicUrl);
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error: any) {
      console.error('Avatar upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload avatar.",
        variant: "destructive",
      });
    } finally {
      setUploadLoading(false);
    }
  };

  const userInitials = user?.email 
    ? user.email.substring(0, 2).toUpperCase() 
    : user?.user_metadata?.name
      ? `${user.user_metadata.name.charAt(0)}`
      : 'U';

  // Determine if the user has connected with Google
  const isGoogleConnected = user?.app_metadata?.provider === 'google';

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 border-cyber-purple/20 mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-white font-medium text-xl flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-cyber-purple" />
            Account Information
          </CardTitle>
          <CardDescription>
            View and manage your account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-cyber-purple/30 bg-black/40">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="Profile picture" />
                  ) : (
                    <AvatarFallback className="bg-cyber-purple/20 text-white text-xl">
                      {userInitials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="absolute -bottom-2 -right-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setIsAvatarEditorOpen(true)} 
                    disabled={uploadLoading}
                    className="rounded-full bg-cyber-purple p-2 cursor-pointer shadow-lg hover:bg-cyber-purple/80 transition-colors"
                  >
                    {uploadLoading ? (
                      <Loader2 className="h-4 w-4 text-white animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4 text-white" />
                    )}
                    <span className="sr-only">Edit avatar</span>
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Click the camera icon to upload
                </p>
              </div>
            </div>
            
            <div className="flex-1 space-y-4 w-full">
              <div className="bg-black/30 p-4 rounded-lg border border-cyber-purple/10">
                <h3 className="text-white text-sm font-medium mb-2">Account Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm text-white">{user?.email || 'Not available'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Auth Provider</p>
                    <div className="flex items-center gap-1 text-sm text-white">
                      {isGoogleConnected ? (
                        <>
                          <svg className="h-3 w-3 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                          </svg>
                          Google
                        </>
                      ) : (
                        'Email & Password'
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Account Created</p>
                    <p className="text-sm text-white">
                      {user?.created_at 
                        ? new Date(user.created_at).toLocaleDateString() 
                        : 'Not available'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Last Sign In</p>
                    <p className="text-sm text-white">
                      {new Date().toLocaleDateString()} {/* Typically this would come from auth state */}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className="bg-black/30 border-cyber-purple/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a username"
                      className="bg-black/30 border-cyber-purple/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    className="bg-black/30 border-cyber-purple/20 resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://yourwebsite.com"
                      className="bg-black/30 border-cyber-purple/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Company/Organization</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Where you work"
                      className="bg-black/30 border-cyber-purple/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="bg-cyber-purple hover:bg-cyber-purple/90 text-white w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Profile'
              )}
            </Button>
          </div>
        </form>
      </Form>
      
      {/* Avatar Editor Modal */}
      <AvatarUploader
        open={isAvatarEditorOpen}
        onOpenChange={setIsAvatarEditorOpen}
        onSave={handleAvatarSave}
        initialImage={avatarUrl}
      />
    </div>
  );
};

export default ProfileForm;
