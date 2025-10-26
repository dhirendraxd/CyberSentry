
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEO/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEOHead
        title="Page Not Found (404) - CyberSentry"
        description="The page you're looking for doesn't exist. Return to CyberSentry's security dashboard to continue protecting your digital assets."
        noindex={true}
        canonical={location.pathname}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark-purple via-cyber-dark-purple/95 to-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-cyber-purple/20 border border-cyber-purple/30 flex items-center justify-center">
              <span className="text-4xl font-bold text-cyber-purple">404</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
            <p className="text-gray-300 mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-cyber-purple hover:bg-cyber-purple/90 text-white">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Return Home
              </Link>
            </Button>
            
            <Button variant="outline" onClick={() => window.history.back()} className="border-cyber-purple/30 text-cyber-purple hover:bg-cyber-purple/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-cyber-purple/20">
            <p className="text-sm text-gray-400">
              Need help? <Link to="/settings" className="text-cyber-purple hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
