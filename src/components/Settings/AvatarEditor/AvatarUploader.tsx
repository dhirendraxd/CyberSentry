
import React, { useState, useRef, useCallback } from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface AvatarUploaderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (imageFile: Blob) => Promise<void>;
  initialImage?: string | null;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  open,
  onOpenChange,
  onSave,
  initialImage
}) => {
  const [image, setImage] = useState<string | File | undefined>(initialImage || undefined);
  const [scale, setScale] = useState<number[]>([1.2]);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<ReactAvatarEditor | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.match(/^image\/(jpeg|png|gif)$/)) {
        setImage(file);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid image file (JPEG, PNG, GIF)",
          variant: "destructive"
        });
      }
    }
  };

  const handleSave = async () => {
    if (editorRef.current && image) {
      setIsSaving(true);
      try {
        const canvas = editorRef.current.getImageScaledToCanvas();
        canvas.toBlob(async (blob) => {
          if (blob) {
            await onSave(blob);
            onOpenChange(false);
          }
        }, 'image/jpeg', 0.95);
      } catch (error) {
        console.error('Error saving avatar:', error);
        toast({
          title: "Upload Error",
          description: "Failed to process the image",
          variant: "destructive"
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const setEditorRef = useCallback((editor: ReactAvatarEditor | null) => {
    editorRef.current = editor;
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-cyber-purple/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Edit Profile Picture</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="border-2 border-cyber-purple/30 rounded-lg overflow-hidden">
              {image ? (
                <ReactAvatarEditor
                  ref={setEditorRef}
                  image={image}
                  width={250}
                  height={250}
                  border={0}
                  borderRadius={125}
                  color={[0, 0, 0, 0.6]} // RGBA
                  scale={scale[0]}
                  rotate={0}
                />
              ) : (
                <div className="w-[250px] h-[250px] flex items-center justify-center bg-black/30 text-gray-400">
                  No image selected
                </div>
              )}
            </div>
            
            <div className="w-full max-w-[250px] flex items-center gap-2">
              <span className="text-xs text-gray-400">Zoom:</span>
              <Slider
                value={scale}
                onValueChange={setScale}
                min={1}
                max={3}
                step={0.01}
                className="flex-1"
              />
            </div>
            
            <div className="mt-2">
              <Button
                variant="outline"
                className="border-cyber-purple/30 hover:bg-cyber-purple/10"
                onClick={() => document.getElementById('avatar-file-input')?.click()}
              >
                {image ? 'Change Image' : 'Select Image'}
              </Button>
              <input
                type="file"
                id="avatar-file-input"
                accept="image/jpeg, image/png, image/gif"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!image || isSaving}
            className="bg-cyber-purple hover:bg-cyber-purple/90"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile Picture'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarUploader;
