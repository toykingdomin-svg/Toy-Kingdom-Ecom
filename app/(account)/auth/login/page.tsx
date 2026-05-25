import { AuthForm } from "@/components/auth/AuthForm";

export const metadata = { title: "Log In | Toy Kingdom Online" };

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
