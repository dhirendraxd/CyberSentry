
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    toast({
      title: `Theme Updated`,
      description: `Switched to ${newTheme} mode`,
    });
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="bg-black/30 backdrop-blur-xl border border-white/10 hover:bg-black/50 hover:border-white/20 hover:text-cyber-purple transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-cyber-purple drop-shadow-lg" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all text-cyber-purple drop-shadow-lg" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
