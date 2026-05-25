"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

type Mode = "login" | "register";

export function AuthForm({ mode }: { mode: Mode }) {
  const isLogin = mode === "login";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      isLogin
        ? "Welcome back! (demo — auth not wired)"
        : "Account created (demo — auth not wired)",
    );
  };

  const field =
    "h-11 w-full px-3 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red bg-white font-poppins text-sm";

  return (
    <div className="max-w-md mx-auto bg-white border border-tk-gray-lt rounded-xl p-6 md:p-8">
      <h1 className="font-fredoka uppercase text-2xl text-tk-black text-center">
        {isLogin ? "Welcome Back" : "Create Account"}
      </h1>
      <p className="text-sm text-tk-gray font-poppins text-center mt-1">
        {isLogin
          ? "Login to view orders, addresses & wishlist."
          : "Sign up to track orders & save favourites."}
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        {!isLogin && (
          <div>
            <label className="block text-xs font-poppins text-tk-black mb-1 uppercase tracking-wide">
              Full Name
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={field}
              placeholder="Your name"
            />
          </div>
        )}
        <div>
          <label className="block text-xs font-poppins text-tk-black mb-1 uppercase tracking-wide">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="block text-xs font-poppins text-tk-black mb-1 uppercase tracking-wide">
            Password
          </label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
          {isLogin ? "Log In" : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-tk-gray mt-5">
        {isLogin ? (
          <>
            New here?{" "}
            <Link href="/auth/register" className="text-tk-red hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already registered?{" "}
            <Link href="/auth/login" className="text-tk-red hover:underline">
              Log in
            </Link>
          </>
        )}
      </p>
      <p className="text-center text-[11px] text-tk-gray mt-2">
        Demo only — no real authentication.
      </p>
    </div>
  );
}
