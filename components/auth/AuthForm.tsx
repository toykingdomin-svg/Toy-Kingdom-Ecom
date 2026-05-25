"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import { Package, Sparkles, Truck } from "lucide-react";

type Mode = "login" | "register";

const PERKS = [
  { icon: Package,  text: "Track your orders live" },
  { icon: Sparkles, text: "Exclusive member deals" },
  { icon: Truck,    text: "Free delivery above ₹999" },
];

export function AuthForm({ mode }: { mode: Mode }) {
  const isLogin = mode === "login";
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(isLogin ? "Welcome back!" : "Account created!", {
      description: isLogin
        ? "You're now logged in."
        : "Welcome to Toy Kingdom Online!",
    });
  };

  const field =
    "h-11 w-full px-3 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red bg-white font-poppins text-sm transition-colors";

  return (
    <div className="min-h-[calc(100vh-120px)] grid lg:grid-cols-2">

      {/* ── LEFT PANEL — Brand visual ── */}
      <div className="hidden lg:flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-tk-red via-[#c41a12] to-[#8B0000] p-12">

        {/* Decorative glow blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-tk-gold/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

        {/* Toy photo collage — faint grid behind content */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-0.5 opacity-[0.08] pointer-events-none">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={`https://picsum.photos/seed/toy${i + 10}/300/300`}
                alt=""
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          ))}
        </div>

        {/* Top text */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-poppins px-3 py-1.5 rounded-full mb-8">
            <span className="h-1.5 w-1.5 bg-tk-gold rounded-full animate-pulse" />
            Mumbai&apos;s #1 Toy Store
          </div>
          <h2 className="font-fredoka text-4xl xl:text-5xl text-white leading-tight">
            The Amazing<br />
            <span className="text-tk-gold">Toy Kingdom</span>
          </h2>
          <p className="text-white/70 font-poppins mt-3 text-sm leading-relaxed max-w-xs">
            Join thousands of happy families shopping RC cars, LEGO, Hot Wheels, Barbie & more.
          </p>
        </div>

        {/* Bottom perks */}
        <div className="relative z-10 space-y-3">
          {PERKS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-white/90 font-poppins text-sm">
              <div className="h-8 w-8 rounded-full bg-white/10 grid place-items-center shrink-0">
                <Icon className="h-4 w-4 text-tk-gold" />
              </div>
              {text}
            </div>
          ))}
          <div className="pt-4 border-t border-white/10">
            <p className="text-white/50 text-xs font-poppins">
              📦 61+ products · 🚚 PAN India · ⭐ 4.8 rated
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ── */}
      <div className="flex items-center justify-center p-6 bg-tk-offwhite">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-tk-gray-lt p-7 md:p-9">

          {/* Mobile brand badge */}
          <div className="flex lg:hidden items-center gap-2 mb-5">
            <div className="h-8 w-8 rounded-full bg-tk-red grid place-items-center">
              <span className="text-white font-fredoka text-sm">TK</span>
            </div>
            <span className="font-fredoka text-tk-red uppercase tracking-wide">Toy Kingdom Online</span>
          </div>

          <h1 className="font-fredoka uppercase text-2xl text-tk-black">
            {isLogin ? "Welcome Back 👋" : "Join the Fun 🎉"}
          </h1>
          <p className="text-sm text-tk-gray font-poppins mt-1">
            {isLogin
              ? "Login to view orders, addresses & wishlist."
              : "Sign up to track orders & save favourites."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-poppins text-tk-black uppercase tracking-wide">
                  Password
                </label>
                {isLogin && (
                  <Link href="#" className="text-xs text-tk-red hover:underline font-poppins">
                    Forgot password?
                  </Link>
                )}
              </div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full mt-1">
              {isLogin ? "Log In" : "Create Account"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-tk-gray font-poppins">or</span>
            <Separator className="flex-1" />
          </div>

          {/* Google SSO stub */}
          <button
            type="button"
            className="w-full h-11 border border-tk-gray-lt rounded-md font-poppins text-sm text-tk-black hover:border-tk-red hover:text-tk-red transition-colors flex items-center justify-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-sm text-tk-gray mt-5 font-poppins">
            {isLogin ? (
              <>
                New here?{" "}
                <Link href="/auth/register" className="text-tk-red hover:underline font-medium">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already registered?{" "}
                <Link href="/auth/login" className="text-tk-red hover:underline font-medium">
                  Log in
                </Link>
              </>
            )}
          </p>
          <p className="text-center text-[11px] text-tk-gray mt-2 font-poppins">
            Demo only — no real authentication.
          </p>
        </div>
      </div>

    </div>
  );
}
