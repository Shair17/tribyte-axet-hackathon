import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./providers/AuthProvider";
import { Router } from "./Router";
import { ThemeProvider } from "./providers/ThemeProvider";

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
