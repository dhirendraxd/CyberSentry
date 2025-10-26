
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Upload, FileText, File, File as FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileUpload: (file: File) => Promise<void>;
  isLoading: boolean;
  acceptedFileTypes?: string[];
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  isLoading,
  acceptedFileTypes = ['.log', '.txt', '.csv', '.json']
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
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
  
  const processFile = async (file: File) => {
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
    
    try {
      await onFileUpload(file);
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive'
      });
    }
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
  
  // Function to get appropriate file icon based on extension
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case '.json':
        return <FileText className="h-12 w-12 text-cyber-purple" />;
      case '.csv':
        return <FileIcon className="h-12 w-12 text-cyber-blue" />;
      case '.log':
      case '.txt':
      default:
        return <FileText className="h-12 w-12 text-white" />;
    }
  };
  
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-2xl p-10 transition-all duration-200 flex flex-col items-center justify-center gap-4",
        isDragging
          ? "border-cyber-purple bg-cyber-purple/10"
          : "border-white/20 hover:border-white/40",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={acceptString}
        className="hidden"
        disabled={isLoading}
      />
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        {acceptedFileTypes.map(fileType => (
          <div key={fileType} className="flex flex-col items-center">
            {getFileIcon(fileType)}
            <span className="text-xs text-gray-400 mt-2">{fileType}</span>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-medium mb-2 text-white">
          {isDragging ? "Drop your log file here" : "Upload Log File"}
        </h3>
        <p className="text-gray-400 mb-4">
          Drag & drop your log file here, or click to select a file
        </p>
      </div>
      
      <Button 
        onClick={handleButtonClick} 
        disabled={isLoading}
        className="bg-cyber-purple hover:bg-cyber-purple/80"
      >
        <Upload className="mr-2 h-4 w-4" />
        {isLoading ? "Uploading..." : "Select File"}
      </Button>
      
      <p className="text-xs text-gray-500 mt-2">
        Supported formats: {acceptedFileTypes.join(', ')} (Max 10MB)
      </p>
    </div>
  );
};

export default FileUpload;
