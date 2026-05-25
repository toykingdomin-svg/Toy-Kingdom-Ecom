import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = { title: "Create Account | Toy Kingdom Online" };

export default function RegisterPage() {
  return (
    <div className="tk-container py-12">
      <AuthForm mode="register" />
    </div>
  );
}
