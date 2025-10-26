
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BreachNotificationRequest {
  userEmail: string;
  userName?: string;
  breachDetails: {
    service: string;
    breachDate: string;
    dataTypes: string[];
    severity: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, userName, breachDetails }: BreachNotificationRequest = await req.json();

    const name = userName || "there";
    const { service, breachDate, dataTypes, severity } = breachDetails;
    
    // Format data types for email
    const formattedDataTypes = dataTypes.map(type => 
      `<li style="color:#e5e7eb;">${type.charAt(0).toUpperCase() + type.slice(1)}</li>`
    ).join("");

    // Color based on severity
    const severityColor = 
      severity === "high" ? "#ef4444" : 
      severity === "medium" ? "#f59e0b" : 
      "#10b981";

    const emailResponse = await resend.emails.send({
      from: "Cyber Shield <breach-alerts@resend.dev>",
      to: [userEmail],
      subject: `⚠️ ALERT: Data Breach Detected at ${service}`,
      html: `
        <div style="background-color:#1A1F2C; color:#f8fafc; padding:30px; font-family:Arial, sans-serif; border-radius:8px; max-width:600px; margin:0 auto;">
          <div style="text-align:center; margin-bottom:30px;">
            <h1 style="color:#9b87f5; margin-bottom:5px;">⚠️ Data Breach Alert</h1>
            <p style="color:#e5e7eb; font-size:16px;">Cyber Shield has detected your information in a new data breach</p>
          </div>
          
          <div style="background-color:rgba(0,0,0,0.3); border:1px solid rgba(155,135,245,0.2); padding:20px; border-radius:5px; margin-bottom:25px;">
            <h2 style="color:#ffffff; font-size:18px; margin-top:0;">Hi ${name},</h2>
            <p style="color:#e5e7eb; line-height:1.6;">
              Our continuous monitoring has detected that your personal information appears in a recent data breach.
              This breach was reported on <strong>${breachDate}</strong> and affects users of <strong>${service}</strong>.
            </p>
          </div>
          
          <div style="background-color:rgba(0,0,0,0.3); border:1px solid rgba(155,135,245,0.2); padding:20px; border-radius:5px; margin-bottom:25px;">
            <h3 style="color:#ffffff; font-size:16px; display:flex; align-items:center; margin-top:0;">
              <span style="display:inline-block; width:12px; height:12px; background-color:${severityColor}; border-radius:50%; margin-right:8px;"></span>
              ${severity.toUpperCase()} RISK LEVEL
            </h3>
            
            <p style="color:#e5e7eb; margin-bottom:15px;">The following types of data may have been exposed:</p>
            <ul style="padding-left:20px; margin-bottom:20px;">
              ${formattedDataTypes}
            </ul>
            
            <p style="color:#e5e7eb; background-color:rgba(155,135,245,0.1); padding:10px; border-radius:4px;">
              <strong>Recommended action:</strong> Please visit your Cyber Shield dashboard to review this breach and take recommended security steps as soon as possible.
            </p>
          </div>
          
          <div style="text-align:center; margin-top:30px;">
            <a href="https://yourapp.com/dark-web" style="background-color:#9b87f5; color:#ffffff; padding:12px 24px; text-decoration:none; border-radius:4px; font-weight:bold; display:inline-block;">
              View Breach Details
            </a>
          </div>
          
          <div style="margin-top:40px; padding-top:20px; border-top:1px solid rgba(255,255,255,0.1); color:#94a3b8; font-size:12px; text-align:center;">
            <p>This is an automated security alert from Cyber Shield.</p>
            <p>If you have questions, please contact our support team.</p>
          </div>
        </div>
      `,
    });

    console.log("Email notification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending breach notification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
