
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ApiIntegration } from '@/hooks/use-api-integrations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface NewLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadLog: (file: File, apiIntegrationId?: string) => Promise<void>;
  isResolved: boolean;
  onMarkAsResolved: () => void;
  isAnalyzing: boolean;
  integrations: ApiIntegration[];
}

const NewLogModal: React.FC<NewLogModalProps> = ({
  open,
  onOpenChange,
  onUploadLog,
  isResolved,
  onMarkAsResolved,
  isAnalyzing,
  integrations
}) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedApi, setSelectedApi] = React.useState<string | undefined>(undefined);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const acceptedFileTypes = ['.log', '.txt', '.csv', '.json'];
  const acceptString = acceptedFileTypes.join(',');
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const processFile = (file: File) => {
    const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    // Check if file type is accepted
    if (!acceptedFileTypes.includes(fileExt)) {
      toast({
        title: 'Invalid File Type',
        description: `Please upload a file with one of these extensions: ${acceptedFileTypes.join(', ')}`,
        variant: 'destructive'
      });
      return;
    }
    
    // Check file size (10MB limit)
    const MAX_SIZE = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > MAX_SIZE) {
      toast({
        title: 'File Too Large',
        description: 'Please upload a file smaller than 10MB',
        variant: 'destructive'
      });
      return;
    }
    
    setFile(file);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await onUploadLog(file, selectedApi);
      setFile(null);
      setSelectedApi(undefined);
      onOpenChange(false);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const activeIntegrations = integrations.filter(i => i.isActive);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-background border-cyber-purple/20">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            {isResolved ? "Upload New Log File" : "Current Log Not Resolved"}
          </DialogTitle>
          <DialogDescription>
            {isResolved 
              ? "Upload a log file to analyze for security threats and patterns." 
              : "The current log needs to be resolved before uploading a new one."}
          </DialogDescription>
        </DialogHeader>
        
        {!isResolved ? (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-4 flex items-start">
              <AlertTriangle className="text-amber-500 h-5 w-5 mr-2 mt-0.5" />
              <div>
                <h3 className="text-amber-500 font-medium mb-1">Unresolved Log Found</h3>
                <p className="text-sm text-gray-300">
                  To maintain an organized workflow, please mark your current log as resolved before uploading a new one.
                </p>
              </div>
            </div>
            
            <Button
              onClick={onMarkAsResolved}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Mark Current Log as Resolved
            </Button>
          </div>
        ) : (
          <>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-md p-6 transition-all duration-200 flex flex-col items-center justify-center gap-4 ${
                isDragging
                  ? "border-cyber-purple bg-cyber-purple/10"
                  : "border-white/20 hover:border-white/40"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept={acceptString}
                className="hidden"
              />
              
              {file ? (
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
                  <h3 className="text-lg font-medium mb-1">{file.name}</h3>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024).toFixed(1)} KB • Ready to upload
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFile(null)}
                    className="mt-2"
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2 text-white">
                      {isDragging ? "Drop your log file here" : "Upload Log File"}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Drag & drop your log file here, or click to select a file
                    </p>
                  </div>
                  
                  <Button 
                    onClick={handleButtonClick}
                    className="bg-cyber-purple hover:bg-cyber-purple/80"
                  >
                    Select File
                  </Button>
                </>
              )}
            </div>
            
            <div className="space-y-4 pt-2">
              {activeIntegrations.length > 0 && (
                <div className="space-y-2">
                  <Label htmlFor="api-selection">Analysis Method</Label>
                  <Select value={selectedApi} onValueChange={setSelectedApi}>
                    <SelectTrigger className="w-full bg-gray-900 border-gray-700">
                      <SelectValue placeholder="Default (BetterStack)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={undefined}>Default (BetterStack)</SelectItem>
                      {activeIntegrations.map(integration => (
                        <SelectItem key={integration.id} value={integration.id}>
                          {integration.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <DialogFooter className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFile(null);
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!file || isAnalyzing}
                className="bg-cyber-purple hover:bg-cyber-purple/90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Upload & Analyze"
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewLogModal;
