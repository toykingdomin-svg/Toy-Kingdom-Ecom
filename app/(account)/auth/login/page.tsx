import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = { title: "Log In | Toy Kingdom Online" };

export default function LoginPage() {
  return (
    <div className="tk-container py-12">
      <AuthForm mode="login" />
    </div>
  );
}
