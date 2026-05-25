"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { whatsappOrderLink } from "@/lib/utils";
import categories from "@/data/categories.json";

const schema = z.object({
  businessName: z.string().min(2, "Business name required"),
  contactName: z.string().min(2, "Contact name required"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile"),
  city: z.string().min(2, "City required"),
  category: z.string().min(1, "Pick a category"),
  monthlyQty: z.string().min(1, "Approximate quantity required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function WholesaleForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    const msg = [
      "Wholesale Enquiry â€” Toy Kingdom Online",
      "",
      `Business: ${data.businessName}`,
      `Contact: ${data.contactName}`,
      `Phone: +91 ${data.phone}`,
      `City: ${data.city}`,
      `Category: ${data.category}`,
      `Monthly Qty: ${data.monthlyQty}`,
      data.notes ? `Notes: ${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    toast.success("Opening WhatsApp...");
    window.open(whatsappOrderLink(msg), "_blank");
    reset();
  };

  const fieldCls =
    "h-11 w-full px-3 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red bg-white font-poppins text-sm";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-sm border border-tk-gray-lt p-6 md:p-8 space-y-4"
    >
      <h3 className="font-fredoka uppercase text-xl text-tk-black">
        Wholesale Enquiry
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Business Name" error={errors.businessName?.message}>
          <input
            {...register("businessName")}
            className={fieldCls}
            placeholder="ABC Toys & Gifts"
          />
        </Field>
        <Field label="Contact Person" error={errors.contactName?.message}>
          <input
            {...register("contactName")}
            className={fieldCls}
            placeholder="Your name"
          />
        </Field>
        <Field label="Phone (10 digits)" error={errors.phone?.message}>
          <div className="flex items-center gap-2">
            <span className="text-tk-gray font-poppins text-sm">+91</span>
            <input
              {...register("phone")}
              inputMode="numeric"
              maxLength={10}
              className={fieldCls}
              placeholder="98765 43210"
            />
          </div>
        </Field>
        <Field label="City" error={errors.city?.message}>
          <input
            {...register("city")}
            className={fieldCls}
            placeholder="Mumbai"
          />
        </Field>
        <Field label="Category of Interest" error={errors.category?.message}>
          <select {...register("category")} className={fieldCls}>
            <option value="">Select categoryâ€¦</option>
            {categories.map((c) => (
              <option key={c.id} value={c.label}>
                {c.label}
              </option>
            ))}
            <option value="Mixed / All">Mixed / All</option>
          </select>
        </Field>
        <Field label="Approx Monthly Qty" error={errors.monthlyQty?.message}>
          <select {...register("monthlyQty")} className={fieldCls}>
            <option value="">Select rangeâ€¦</option>
            <option value="50â€“100 pcs">50â€“100 pcs</option>
            <option value="100â€“500 pcs">100â€“500 pcs</option>
            <option value="500â€“1000 pcs">500â€“1000 pcs</option>
            <option value="1000+ pcs">1000+ pcs</option>
          </select>
        </Field>
      </div>

      <Field label="Additional Notes (optional)">
        <textarea
          {...register("notes")}
          rows={3}
          className="w-full px-3 py-2 rounded-md border border-tk-gray-lt focus:outline-none focus:border-tk-red bg-white font-poppins text-sm"
          placeholder="Specific brands, delivery timeline, etc."
        />
      </Field>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        Send Enquiry on WhatsApp
      </Button>
      <p className="text-xs text-tk-gray text-center">
        We typically reply within 30 minutes during business hours.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-poppins text-tk-black mb-1 uppercase tracking-wide">
        {label}
      </span>
      {children}
      {error && (
        <span className="block text-xs text-tk-red mt-1">{error}</span>
      )}
    </label>
  );
}

