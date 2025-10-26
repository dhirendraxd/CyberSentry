
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BETTERSTACK_ENDPOINT = "https://s1309632.eu-nbg-2.betterstackdata.com";
const BETTERSTACK_TOKEN = Deno.env.get("BETTERSTACK_TOKEN") || "RvPhnrMAbfAqPzABqjt5qq4S";

interface LogEntry {
  timestamp: string;
  message: string;
  level: string;
  userId?: string;
}

// Parse different log file formats
function parseLogFile(content: string, fileType: string): LogEntry[] {
  const logs: LogEntry[] = [];
  
  switch (fileType) {
    case 'json':
      try {
        const jsonLogs = JSON.parse(content);
        // Handle array of logs or object with logs array
        const logsArray = Array.isArray(jsonLogs) ? jsonLogs : (jsonLogs.logs || []);
        
        return logsArray.map((log: any) => ({
          timestamp: log.timestamp || log.time || new Date().toISOString(),
          message: log.message || log.msg || log.text || JSON.stringify(log),
          level: log.level || log.severity || 'info',
          userId: log.userId || log.user_id || log.user || undefined
        }));
      } catch (e) {
        console.error("JSON parsing error:", e);
        return [];
      }
      
    case 'csv':
      const lines = content.split('\n');
      // Assume first line is header
      const header = lines[0].split(',');
      
      const timestampIdx = header.findIndex(h => 
        h.toLowerCase().includes('time') || h.toLowerCase().includes('date'));
      const messageIdx = header.findIndex(h => 
        h.toLowerCase().includes('message') || h.toLowerCase().includes('msg'));
      const levelIdx = header.findIndex(h => 
        h.toLowerCase().includes('level') || h.toLowerCase().includes('severity'));
      const userIdx = header.findIndex(h => 
        h.toLowerCase().includes('user') || h.toLowerCase().includes('userid'));
      
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const values = lines[i].split(',');
        logs.push({
          timestamp: timestampIdx >= 0 ? values[timestampIdx] : new Date().toISOString(),
          message: messageIdx >= 0 ? values[messageIdx] : values[0],
          level: levelIdx >= 0 ? values[levelIdx].toLowerCase() : 'info',
          userId: userIdx >= 0 ? values[userIdx] : undefined
        });
      }
      return logs;
      
    case 'log':
    case 'txt':
    default:
      // Basic log pattern matching
      // Look for common patterns like:
      // [2023-05-14 12:34:56] [INFO] User message...
      // 2023-05-14T12:34:56Z ERROR: message...
      const logLines = content.split('\n');
      
      for (const line of logLines) {
        if (!line.trim()) continue;
        
        // Try to extract timestamp
        let timestamp = new Date().toISOString();
        let level = 'info';
        let message = line;
        let userId = undefined;
        
        // Extract timestamp - look for ISO format or common date patterns
        const timeRegex = /(\d{4}-\d{2}-\d{2}[T ]?\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)/;
        const timeMatch = line.match(timeRegex);
        if (timeMatch) {
          timestamp = timeMatch[1];
          message = message.replace(timeMatch[0], '').trim();
        }
        
        // Extract log level
        const levelRegex = /\b(ERROR|WARN(?:ING)?|INFO|DEBUG|TRACE|CRITICAL|FATAL)\b/i;
        const levelMatch = line.match(levelRegex);
        if (levelMatch) {
          level = levelMatch[1].toLowerCase();
          // Normalize some level variations
          if (level === 'warning') level = 'warn';
          if (level === 'critical' || level === 'fatal') level = 'error';
          message = message.replace(levelMatch[0], '').trim();
        }
        
        // Extract user ID if present
        const userRegex = /\buser(?:[ _-]?id)?[=:]\s*["']?([^"'\s]+)["']?/i;
        const userMatch = line.match(userRegex);
        if (userMatch) {
          userId = userMatch[1];
        }
        
        // Clean up message - remove brackets, timestamps, etc.
        message = message.replace(/^\s*\[.*?\]\s*/, '').trim();
        
        logs.push({ timestamp, level, message, userId });
      }
      return logs;
  }
}

// Detect anomalies in logs using pattern matching
function detectAnomalies(logs: LogEntry[]): { 
  insights: any[], 
  highlightedLines: { lineNumber: number, content: string, reason: string }[] 
} {
  const insights = [];
  const highlightedLines = [];
  
  // Patterns to look for
  const patterns = [
    {
      name: "Failed Login Attempts",
      regex: /failed (login|authentication|password)/i,
      threatLevel: "medium",
      reason: "Possible brute force attack"
    },
    {
      name: "Access Denied",
      regex: /(access denied|permission denied|unauthorized|forbidden)/i,
      threatLevel: "low",
      reason: "Unauthorized access attempt"
    },
    {
      name: "Server Errors",
      regex: /(5\d\d error|internal server error|NullPointerException|fatal|exception)/i,
      threatLevel: "high",
      reason: "Critical server error detected"
    },
    {
      name: "Suspicious IPs",
      regex: /(suspicious|unknown|blocked) (ip|host|origin)/i,
      threatLevel: "medium",
      reason: "Potentially malicious source"
    },
    {
      name: "SQL Injection",
      regex: /(sql injection|select.*from|delete.*from|insert.*into)/i,
      threatLevel: "high",
      reason: "Possible SQL injection attempt"
    }
  ];
  
  // Count occurrences of each pattern
  const patternCounts = {};
  
  logs.forEach((log, index) => {
    for (const pattern of patterns) {
      if (pattern.regex.test(log.message)) {
        patternCounts[pattern.name] = (patternCounts[pattern.name] || 0) + 1;
        
        highlightedLines.push({
          lineNumber: index + 1,
          content: log.message,
          reason: pattern.reason
        });
      }
    }
  });
  
  // Generate insights
  Object.keys(patternCounts).forEach((patternName, i) => {
    const count = patternCounts[patternName];
    const pattern = patterns.find(p => p.name === patternName);
    
    insights.push({
      id: `insight-${i + 1}`,
      summary: `${count} ${patternName} detected`,
      highlightedLines: highlightedLines.filter(h => h.reason === pattern?.reason),
      suggestedFix: `Investigate ${patternName.toLowerCase()} in your system`,
      threatLevel: pattern?.threatLevel || "low"
    });
  });
  
  // If no patterns found, add a "clean" insight
  if (insights.length === 0) {
    insights.push({
      id: 'insight-clean',
      summary: 'No security issues detected',
      highlightedLines: [],
      suggestedFix: 'Continue monitoring your logs regularly',
      threatLevel: "low"
    });
  }
  
  return { insights, highlightedLines };
}

// Send logs to BetterStack
async function sendToBetterStack(logs: LogEntry[]): Promise<boolean> {
  try {
    const batchSize = 100; // Send in batches to avoid hitting limits
    
    for (let i = 0; i < logs.length; i += batchSize) {
      const batch = logs.slice(i, i + batchSize);
      
      const response = await fetch(BETTERSTACK_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${BETTERSTACK_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(batch)
      });
      
      if (!response.ok) {
        console.error(`BetterStack API error: ${response.status} ${response.statusText}`);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error sending logs to BetterStack:", error);
    return false;
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Parse request
    const { fileName, fileContent } = await req.json();
    
    if (!fileContent) {
      return new Response(JSON.stringify({ error: 'No file content provided' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Determine file type
    const fileType = fileName.split('.').pop()?.toLowerCase() || 'txt';
    
    // Parse logs based on file type
    const logs = parseLogFile(fileContent, fileType);
    
    if (logs.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'No valid log entries found in the file' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // Send logs to BetterStack
    const betterStackSuccess = await sendToBetterStack(logs);
    
    // Detect anomalies
    const { insights, highlightedLines } = detectAnomalies(logs);
    
    // Prepare response
    const result = {
      timestamp: new Date().toISOString(),
      fileName,
      fileType,
      fileSize: fileContent.length,
      rawLogContent: fileContent,
      logs,
      insights,
      highlightedLines,
      betterStackIntegration: {
        success: betterStackSuccess,
        message: betterStackSuccess 
          ? `Successfully sent ${logs.length} logs to BetterStack` 
          : 'Failed to send logs to BetterStack'
      },
      resolved: false
    };
    
    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error("Error analyzing logs:", error);
    
    return new Response(JSON.stringify({
      error: `Failed to analyze logs: ${error.message}`
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
