"use client";

import { useState } from "react";

type FormFields = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFields: FormFields = {
  name: "",
  email: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState<string>("");

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormFields, string>> = {};

    if (!fields.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!fields.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailRegex.test(fields.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!fields.message.trim()) {
      nextErrors.message = "Please share a quick summary of your project or question.";
    } else if (fields.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }

    return nextErrors;
  };

  const handleChange = (field: keyof FormFields) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setFields((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setFeedback("Please correct the highlighted fields.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          message: fields.message,
          company: fields.company,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFields(initialFields);
        setErrors({});
        setFeedback("Thanks for reaching out! I’ll get back to you shortly.");
      } else {
        const data = await response.json().catch(() => undefined);
        setStatus("error");
        setErrors((data?.errors as typeof errors) ?? {});
        setFeedback(data?.message ?? "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("error");
      setFeedback("Unable to send message right now. Please try again later or email me directly.");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-muted">
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={handleChange("name")}
            className={`rounded-2xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-[var(--shadow-soft)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              errors.name ? "border-destructive" : ""
            }`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            required
          />
          {errors.name ? (
            <span id="contact-name-error" className="text-sm text-destructive">
              {errors.name}
            </span>
          ) : null}
        </label>

        <label className="flex flex-col gap-2 text-sm font-medium text-muted">
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleChange("email")}
            className={`rounded-2xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-[var(--shadow-soft)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
              errors.email ? "border-destructive" : ""
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            required
          />
          {errors.email ? (
            <span id="contact-email-error" className="text-sm text-destructive">
              {errors.email}
            </span>
          ) : null}
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-muted">
        <span>How can I help?</span>
        <textarea
          name="message"
          value={fields.message}
          onChange={handleChange("message")}
          rows={5}
          className={`rounded-2xl border border-border bg-surface px-4 py-3 text-base text-foreground shadow-[var(--shadow-soft)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
            errors.message ? "border-destructive" : ""
          }`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          required
        />
        {errors.message ? (
          <span id="contact-message-error" className="text-sm text-destructive">
            {errors.message}
          </span>
        ) : null}
      </label>

      <label
        className="sr-only"
        aria-hidden="true"
      >
        Company
        <input
          type="text"
          name="company"
          value={fields.company}
          onChange={handleChange("company")}
          tabIndex={-1}
          autoComplete="organization"
          className="hidden"
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:ring-2 focus-visible:ring-ring active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 disabled:hover:translate-y-0"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <span>Send message</span>
        )}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`text-sm ${
          status === "success"
            ? "text-success"
            : status === "error"
            ? "text-destructive"
            : "text-muted"
        }`}
      >
        {feedback}
      </p>
    </form>
  );
}
