
-- Create API Keys table
CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  key_name TEXT NOT NULL,
  key_value TEXT NOT NULL, -- This would be the masked version of the key
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Set up Row Level Security for API Keys
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Create policy for users to select only their own API keys
CREATE POLICY "Users can view their own API keys" 
ON public.api_keys 
FOR SELECT 
USING (auth.uid() = user_id);

-- Create policy for users to insert their own API keys
CREATE POLICY "Users can create their own API keys" 
ON public.api_keys 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policy for users to delete their own API keys
CREATE POLICY "Users can delete their own API keys" 
ON public.api_keys 
FOR DELETE 
USING (auth.uid() = user_id);
