
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileText } from 'lucide-react';
import { LogEntry } from '@/types/logs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface LogTableProps {
  logs: LogEntry[];
  highlightedLines?: {
    lineNumber: number;
    content: string;
    reason: string;
  }[];
}

const LogTable: React.FC<LogTableProps> = ({ 
  logs = [],
  highlightedLines = [] 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  
  // Create a Set of highlighted line numbers for efficient lookup
  const highlightedLineNumbers = new Set(
    highlightedLines.map(hl => hl.lineNumber)
  );
  
  // Function to get reason for highlighted line
  const getReasonForLine = (lineNumber: number) => {
    const highlightedLine = highlightedLines.find(
      hl => hl.lineNumber === lineNumber
    );
    return highlightedLine?.reason || '';
  };
  
  // Filter logs based on search query and level filter
  const filteredLogs = logs.filter(log => {
    const matchesSearch = !searchQuery || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.userId && log.userId.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLevel = !levelFilter || log.level === levelFilter;
    
    return matchesSearch && matchesLevel;
  });
  
  // Get unique log levels for filter buttons
  const uniqueLevels = Array.from(new Set(logs.map(log => log.level)));
  
  // Helper to get badge color based on log level
  const getLevelBadgeClass = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
      case 'fatal':
      case 'critical':
        return 'bg-red-500 text-white hover:bg-red-600';
      case 'warn':
      case 'warning':
        return 'bg-orange-500 text-white hover:bg-orange-600';
      case 'info':
        return 'bg-blue-500 text-white hover:bg-blue-600';
      case 'debug':
        return 'bg-green-500 text-white hover:bg-green-600';
      case 'trace':
        return 'bg-gray-500 text-white hover:bg-gray-600';
      default:
        return 'bg-gray-500 text-white hover:bg-gray-600';
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (e) {
      return timestamp;
    }
  };
  
  return (
    <div className="space-y-4">
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge 
            onClick={() => setLevelFilter(null)}
            className={cn(
              "cursor-pointer bg-gray-700 hover:bg-gray-600",
              !levelFilter && "border-2 border-white"
            )}
          >
            All
          </Badge>
          
          {uniqueLevels.map(level => (
            <Badge
              key={level}
              onClick={() => setLevelFilter(level === levelFilter ? null : level)}
              className={cn(
                "cursor-pointer",
                getLevelBadgeClass(level),
                level === levelFilter && "border-2 border-white"
              )}
            >
              {level.toUpperCase()}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Log table */}
      <div className="border rounded-lg border-gray-700 bg-black/30 backdrop-blur-sm">
        {logs.length > 0 ? (
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader className="sticky top-0 bg-black/70 backdrop-blur-sm">
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead className="w-[100px]">Level</TableHead>
                  <TableHead className="w-[100px]">User ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log, index) => {
                  const lineNumber = index + 1;
                  const isHighlighted = highlightedLineNumbers.has(lineNumber);
                  const reason = isHighlighted ? getReasonForLine(lineNumber) : '';
                  
                  return (
                    <TableRow 
                      key={index}
                      className={cn(
                        isHighlighted && "bg-red-900/20"
                      )}
                    >
                      <TableCell className="font-mono text-xs">
                        {formatTimestamp(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className={cn(
                            "line-clamp-2",
                            isHighlighted && "font-medium text-white"
                          )}>
                            {log.message}
                          </span>
                          {isHighlighted && reason && (
                            <span className="text-xs italic text-yellow-400 mt-1">
                              {reason}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLevelBadgeClass(log.level)}>
                          {log.level.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {log.userId || "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-gray-400">
            <FileText className="h-12 w-12 mb-4" />
            <h3 className="text-lg font-medium">No Logs Available</h3>
            <p className="text-sm">Upload a log file to see detailed log entries.</p>
          </div>
        )}
      </div>
      
      {/* Count display */}
      <div className="text-sm text-gray-400">
        Showing {filteredLogs.length} of {logs.length} logs
        {searchQuery && ` (filtered by "${searchQuery}")`}
        {levelFilter && ` (level: ${levelFilter})`}
      </div>
    </div>
  );
};

export default LogTable;
