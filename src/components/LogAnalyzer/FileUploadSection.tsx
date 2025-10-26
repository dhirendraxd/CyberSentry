
import React from 'react';
import FileUpload from '@/components/LogAnalyzer/FileUpload';
import LogAnalyzing from '@/components/LogAnalyzer/LogAnalyzing';

interface FileUploadSectionProps {
  isAnalyzing: boolean;
  analysisResult: any;
  onFileUpload: (file: File) => Promise<void>;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  isAnalyzing,
  analysisResult,
  onFileUpload,
}) => {
  if (analysisResult || isAnalyzing) {
    return null;
  }
  
  return (
    <FileUpload 
      onFileUpload={onFileUpload}
      isLoading={isAnalyzing}
    />
  );
};

export default FileUploadSection;
