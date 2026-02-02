import { Logo } from "@/components/Logo/Logo";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <Logo className="absolute top-8 left-8 w-24" />

      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
