"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-tk-offwhite py-12">
      <div className="tk-container max-w-2xl text-center">
        <h2 className="font-fredoka uppercase text-2xl md:text-3xl text-tk-black">
          Stay Updated — Fresh Stock Every Week!
        </h2>
        <p className="mt-2 font-poppins text-tk-gray">
          Get drops, deals and DM-only offers from Toy Kingdom Online.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) {
              toast.error("Please enter a valid email");
              return;
            }
            toast.success("You're subscribed! 🎉");
            setEmail("");
          }}
          className="mt-5 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 h-11 px-4 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red font-poppins"
          />
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
