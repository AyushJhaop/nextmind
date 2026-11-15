"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  BookOpen,
} from "lucide-react";
import { registrationSchema, enquirySchema } from "@/lib/validations";
import { PROGRAMMES_DATA, EDUCATION_LEVEL_OPTIONS } from "@/data/programmes";

/**
 * Helper hook for native <dialog> modal management + light-dismiss fallback
 * (modern-web-guidance: dialog)
 */
function useNativeDialog(isOpen, onClose) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      if (isOpen) onClose();
    };

    // Light dismiss pointer bounds check fallback where closedby="any" is unsupported
    let pressedOutside = false;
    const isOutside = (e) => {
      const r = dialog.getBoundingClientRect();
      return (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      );
    };
    const onPointerDown = (e) => {
      pressedOutside = isOutside(e);
    };
    const onPointerUp = (e) => {
      if (pressedOutside && isOutside(e)) {
        dialog.close();
      }
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("pointerdown", onPointerDown);
    dialog.addEventListener("pointerup", onPointerUp);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("pointerdown", onPointerDown);
      dialog.removeEventListener("pointerup", onPointerUp);
    };
  }, [isOpen, onClose]);

  return dialogRef;
}

/**
 * Multi-Step Programme Registration Wizard (used in Modal & Dedicated /register Page)
 */
export function RegistrationWizard({
  initialProgrammeSlug = "ai-foundations",
  onSuccessComplete,
  onClose,
}) {
  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState("");
  const [confirmationData, setConfirmationData] = useState(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      programmeSlug: initialProgrammeSlug || "ai-foundations",
      educationLevel: "Undergraduate Student (3rd / Final Year)",
      occupation: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (initialProgrammeSlug) {
      setValue("programmeSlug", initialProgrammeSlug);
    }
  }, [initialProgrammeSlug, setValue]);

  const formValues = watch();
  const selectedProgramme =
    PROGRAMMES_DATA.find((p) => p.slug === formValues.programmeSlug) ||
    PROGRAMMES_DATA[0];

  const handleNextStep = async () => {
    setServerError("");
    if (step === 1) {
      const valid = await trigger(["fullName", "email", "phone"]);
      if (valid) setStep(2);
    } else if (step === 2) {
      const valid = await trigger([
        "programmeSlug",
        "educationLevel",
        "occupation",
      ]);
      if (valid) setStep(3);
    }
  };

  const onConfirmSubmit = async (data) => {
    setServerError("");
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409 && result.registration) {
          setConfirmationData({
            ...result.registration,
            wasDuplicate: true,
          });
          setStep(4);
          if (onSuccessComplete) onSuccessComplete(result.registration);
          return;
        }
        setServerError(
          result.error || "Unable to complete registration. Please check your details."
        );
        return;
      }

      setConfirmationData(result.registration);
      setStep(4);
      if (onSuccessComplete) onSuccessComplete(result.registration);
    } catch {
      setServerError(
        "Network error while submitting registration. Please try again."
      );
    }
  };

  const copyReference = () => {
    if (!confirmationData?.registrationReference) return;
    navigator.clipboard?.writeText(confirmationData.registrationReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-[#FFF7EB] border border-[#174B38]/20 shadow-[0_28px_70px_-15px_rgba(8,47,36,0.5)] overflow-hidden">
      {/* Header Bar */}
      <div className="bg-[#0B382A] text-[#FFF7EB] px-6 sm:px-8 py-5 flex items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C9D9B9]">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Journey A • Programme Registration</span>
          </span>
          <h2
            id="registration-dialog-title"
            className="text-xl sm:text-2xl font-extrabold text-[#FFF7EB] m-0 mt-0.5"
            style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
          >
            {step === 4
              ? "Registration Confirmed"
              : "Enrol in a NEXTMIND Programme"}
          </h2>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close registration modal"
            className="w-10 h-10 rounded-full bg-[#174B38] hover:bg-[#C9D9B9] text-[#FFF7EB] hover:text-[#082F24] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Stepper Indicator */}
      <div className="bg-[#F8F0E3] px-6 sm:px-8 py-3.5 border-b border-[#174B38]/12">
        <ol className="grid grid-cols-4 gap-2 list-none m-0 p-0 text-xs font-bold">
          {[
            { num: 1, label: "Personal Details" },
            { num: 2, label: "Programme" },
            { num: 3, label: "Review" },
            { num: 4, label: "Success" },
          ].map((item) => {
            const isCurrent = step === item.num;
            const isDone = step > item.num;
            return (
              <li
                key={item.num}
                className={`flex items-center gap-2 py-1 px-2.5 rounded-xl ${
                  isCurrent
                    ? "bg-[#0B382A] text-[#FFF7EB]"
                    : isDone
                    ? "bg-[#C9D9B9]/65 text-[#082F24]"
                    : "text-[#153D30]/60"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full bg-current/15 flex items-center justify-center text-[11px] shrink-0"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {isDone ? "✓" : item.num}
                </span>
                <span className="truncate">{item.label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit(onConfirmSubmit)} className="p-6 sm:p-8" noValidate>
        {serverError && (
          <div
            role="alert"
            className="mb-6 rounded-2xl bg-[#FFF7EB] border-2 border-red-700/40 p-4 flex items-start gap-3 text-sm text-red-900"
          >
            <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-bold m-0">Registration Notice</p>
              <p className="m-0 mt-0.5">{serverError}</p>
            </div>
          </div>
        )}

        {/* STEP 1: PERSONAL DETAILS */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="reg-fullName"
                className="block text-sm font-extrabold text-[#0B382A] mb-1.5"
              >
                Full Name <span className="text-red-700">*</span>
              </label>
              <input
                id="reg-fullName"
                type="text"
                autoComplete="name"
                placeholder="e.g., Priya Nair"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "reg-fullName-err" : undefined}
                {...register("fullName")}
                className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-3.5 text-sm text-[#153D30] font-medium focus:border-[#0B382A]"
              />
              {errors.fullName && (
                <p id="reg-fullName-err" className="mt-1.5 text-xs font-bold text-red-700 m-0">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-email"
                className="block text-sm font-extrabold text-[#0B382A] mb-1.5"
              >
                Email Address <span className="text-red-700">*</span>
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                placeholder="you@university.edu"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "reg-email-err" : undefined}
                {...register("email")}
                className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-3.5 text-sm text-[#153D30] font-medium focus:border-[#0B382A]"
              />
              {errors.email && (
                <p id="reg-email-err" className="mt-1.5 text-xs font-bold text-red-700 m-0">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-phone"
                className="block text-sm font-extrabold text-[#0B382A] mb-1.5"
              >
                Mobile Number <span className="text-red-700">*</span>
              </label>
              <input
                id="reg-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "reg-phone-err" : undefined}
                {...register("phone")}
                className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-3.5 text-sm text-[#153D30] font-medium focus:border-[#0B382A]"
              />
              {errors.phone && (
                <p id="reg-phone-err" className="mt-1.5 text-xs font-bold text-red-700 m-0">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Continue to Programme Selection</span>
                <ArrowRight className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROGRAMME SELECTION */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label
                htmlFor="reg-programmeSlug"
                className="block text-sm font-extrabold text-[#0B382A] mb-1.5"
              >
                Selected Programme <span className="text-red-700">*</span>
              </label>
              <select
                id="reg-programmeSlug"
                {...register("programmeSlug")}
                className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-3.5 text-sm text-[#153D30] font-bold focus:border-[#0B382A]"
              >
                {PROGRAMMES_DATA.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.title} ({p.level})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="reg-educationLevel"
                className="block text-sm font-extrabold text-[#0B382A] mb-1.5"
              >
                Current Education Level <span className="text-red-700">*</span>
              </label>
              <select
                id="reg-educationLevel"
                {...register("educationLevel")}
                className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-3.5 text-sm text-[#153D30] font-medium focus:border-[#0B382A]"
              >
                {EDUCATION_LEVEL_OPTIONS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
              {errors.educationLevel && (
                <p className="mt-1.5 text-xs font-bold text-red-700 m-0">
                  {errors.educationLevel.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="reg-occupation"
                className="block text-sm font-extrabold text-[#0B382A] mb-1.5"
              >
                Current Occupation / Degree Stream (Optional)
              </label>
              <input
                id="reg-occupation"
                type="text"
                placeholder="e.g., B.Tech Computer Science / Marketing Associate"
                {...register("occupation")}
                className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-4 py-3.5 text-sm text-[#153D30] font-medium focus:border-[#0B382A]"
              />
            </div>

            <div className="pt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#F8F0E3] hover:bg-[#C9D9B9]/45 text-[#0B382A] font-bold text-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Review Registration</span>
                <ArrowRight className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & CONFIRM */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="rounded-2xl bg-[#F8F0E3] p-5 border border-[#174B38]/15 space-y-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#174B38] m-0">
                  Selected NEXTMIND Programme
                </p>
                <p className="text-lg font-extrabold text-[#0B382A] m-0 mt-0.5">
                  {selectedProgramme.title}
                </p>
                <p className="text-xs text-[#153D30]/80 m-0 mt-0.5">
                  {selectedProgramme.level} • {selectedProgramme.duration}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#174B38]/12 text-sm">
                <div>
                  <span className="block text-xs text-[#174B38] font-bold">
                    Full Name
                  </span>
                  <span className="font-extrabold text-[#0B382A]">
                    {formValues.fullName}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#174B38] font-bold">
                    Email Address
                  </span>
                  <span className="font-extrabold text-[#0B382A]">
                    {formValues.email}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#174B38] font-bold">
                    Mobile Number
                  </span>
                  <span className="font-extrabold text-[#0B382A]">
                    {formValues.phone}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-[#174B38] font-bold">
                    Education Level
                  </span>
                  <span className="font-extrabold text-[#0B382A]">
                    {formValues.educationLevel}
                  </span>
                </div>
                {formValues.occupation && (
                  <div className="sm:col-span-2">
                    <span className="block text-xs text-[#174B38] font-bold">
                      Current Occupation / Stream
                    </span>
                    <span className="font-extrabold text-[#0B382A]">
                      {formValues.occupation}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#F8F0E3] hover:bg-[#C9D9B9]/45 text-[#0B382A] font-bold text-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Edit Details</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-extrabold text-sm shadow-lg transition-all cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Confirming Registration...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
                    <span>Confirm Registration</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS & REGISTRATION REFERENCE */}
        {step === 4 && confirmationData && (
          <div className="text-center py-2 space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#C9D9B9]/65 text-[#0B382A] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-[#0B382A]" aria-hidden="true" />
            </div>

            <div>
              <h3
                className="text-2xl font-extrabold text-[#0B382A] m-0"
                style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
              >
                {confirmationData.wasDuplicate
                  ? "You're Already Registered!"
                  : "You're Registered with NEXTMIND!"}
              </h3>
              <p className="mt-2 text-sm text-[#153D30]/90 max-w-md mx-auto m-0">
                {confirmationData.wasDuplicate
                  ? "We found your existing registration for this programme. Here is your registration reference:"
                  : "Your registration has been recorded in the NEXTMIND database. Save your registration reference below:"}
              </p>
            </div>

            {/* Registration Reference Box */}
            <div className="max-w-sm mx-auto rounded-2xl bg-[#0B382A] text-[#FFF7EB] p-4 flex items-center justify-between gap-3">
              <div className="text-left">
                <span className="block text-[10px] uppercase tracking-wider text-[#C9D9B9] font-bold">
                  Registration Reference
                </span>
                <span
                  className="text-xl font-extrabold tracking-tight text-[#FFF7EB]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {confirmationData.registrationReference}
                </span>
              </div>

              <button
                type="button"
                onClick={copyReference}
                className="px-3.5 py-2 rounded-xl bg-[#174B38] hover:bg-[#C9D9B9] text-[#FFF7EB] hover:text-[#082F24] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedRef ? (
                  <>
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Next-step instructions */}
            <div className="rounded-2xl bg-[#F8F0E3] p-5 text-left text-xs sm:text-sm text-[#153D30] space-y-2 border border-[#174B38]/12">
              <p className="font-extrabold text-[#0B382A] m-0">
                What happens next:
              </p>
              <ol className="list-decimal pl-5 space-y-1 m-0">
                <li>
                  Our admissions coordinator will review your registration for{" "}
                  <strong>
                    {confirmationData.programme?.title || selectedProgramme.title}
                  </strong>
                  .
                </li>
                <li>
                  You will receive your onboarding kit and project workspace
                  orientation details at{" "}
                  <strong>{confirmationData.user?.email || formValues.email}</strong>.
                </li>
                <li>
                  Keep your reference code (
                  <strong>{confirmationData.registrationReference}</strong>) handy
                  when speaking with an advisor.
                </li>
              </ol>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setConfirmationData(null);
                  reset();
                  setStep(1);
                }}
                className="px-5 py-3 rounded-full bg-[#F8F0E3] hover:bg-[#C9D9B9]/45 text-[#0B382A] font-bold text-sm cursor-pointer"
              >
                Register Another Programme
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-7 py-3 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

/**
 * Journey B: Enquiry Form Modal ("Talk to an Advisor")
 */
export function EnquiryModal({
  isOpen,
  onClose,
  defaultProgramme = "AI Foundations",
  onSuccessComplete,
}) {
  const dialogRef = useNativeDialog(isOpen, onClose);
  const [serverError, setServerError] = useState("");
  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      programmeInterest: defaultProgramme || "AI Foundations",
      educationLevel: "Undergraduate Student (3rd / Final Year)",
      preferredContactMethod: "Phone Call",
      message: "",
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (defaultProgramme) {
      setValue("programmeInterest", defaultProgramme);
    }
  }, [defaultProgramme, setValue]);

  const onSubmitEnquiry = async (data) => {
    setServerError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 409 && result.enquiry) {
          setSubmittedEnquiry(result.enquiry);
          if (onSuccessComplete) onSuccessComplete(result.enquiry);
          return;
        }
        setServerError(
          result.error || "Unable to submit your enquiry. Please try again."
        );
        return;
      }

      setSubmittedEnquiry(result.enquiry);
      if (onSuccessComplete) onSuccessComplete(result.enquiry);
    } catch {
      setServerError("Network error while submitting enquiry. Please try again.");
    }
  };

  const handleClose = () => {
    setServerError("");
    setSubmittedEnquiry(null);
    reset();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="enquiry-dialog-title"
      className="nm-dialog"
    >
      <div className="rounded-3xl bg-[#FFF7EB] border border-[#174B38]/20 shadow-[0_28px_70px_-15px_rgba(8,47,36,0.5)] overflow-hidden">
        <div className="bg-[#0B382A] text-[#FFF7EB] px-6 sm:px-8 py-5 flex items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#C9D9B9]">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Journey B • Academic Advisory</span>
            </span>
            <h2
              id="enquiry-dialog-title"
              className="text-xl sm:text-2xl font-extrabold text-[#FFF7EB] m-0 mt-0.5"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              Talk to a NEXTMIND Advisor
            </h2>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close advisor enquiry modal"
            className="w-10 h-10 rounded-full bg-[#174B38] hover:bg-[#C9D9B9] text-[#FFF7EB] hover:text-[#082F24] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {submittedEnquiry ? (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#C9D9B9]/65 text-[#0B382A] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
              </div>
              <div>
                <h3
                  className="text-2xl font-extrabold text-[#0B382A] m-0"
                  style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
                >
                  Enquiry Received!
                </h3>
                <p className="mt-2 text-sm text-[#153D30]/90 max-w-md mx-auto m-0">
                  Thank you, <strong>{submittedEnquiry.fullName}</strong>. Our
                  academic advisor team has logged your enquiry regarding{" "}
                  <strong>{submittedEnquiry.programmeInterest}</strong> and will
                  contact you via{" "}
                  <strong>{submittedEnquiry.preferredContactMethod}</strong>.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="px-7 py-3.5 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm cursor-pointer"
              >
                Back to NEXTMIND
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmitEnquiry)}
              className="space-y-4"
              noValidate
            >
              {serverError && (
                <div
                  role="alert"
                  className="rounded-2xl bg-[#FFF7EB] border-2 border-red-700/40 p-3.5 flex items-start gap-2.5 text-xs sm:text-sm text-red-900"
                >
                  <AlertCircle className="w-5 h-5 text-red-700 shrink-0" aria-hidden="true" />
                  <span>{serverError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="enq-fullName"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="enq-fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    {...register("fullName")}
                    className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-3.5 py-3 text-sm text-[#153D30]"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs font-bold text-red-700 m-0">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enq-email"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="enq-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-3.5 py-3 text-sm text-[#153D30]"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs font-bold text-red-700 m-0">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="enq-phone"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="enq-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                    className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-3.5 py-3 text-sm text-[#153D30]"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs font-bold text-red-700 m-0">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="enq-programmeInterest"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1"
                  >
                    Programme of Interest *
                  </label>
                  <select
                    id="enq-programmeInterest"
                    {...register("programmeInterest")}
                    className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-3.5 py-3 text-sm text-[#153D30] font-semibold"
                  >
                    <option value="AI Foundations">AI Foundations</option>
                    <option value="AI & Automation">AI &amp; Automation</option>
                    <option value="Digital Product & Technology">
                      Digital Product &amp; Technology
                    </option>
                    <option value="Unsure — Need Advisor Guidance">
                      Unsure — Need Advisor Guidance
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="enq-educationLevel"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1"
                  >
                    Current Education Level *
                  </label>
                  <select
                    id="enq-educationLevel"
                    {...register("educationLevel")}
                    className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-3.5 py-3 text-sm text-[#153D30]"
                  >
                    {EDUCATION_LEVEL_OPTIONS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="enq-preferredContactMethod"
                    className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1"
                  >
                    Preferred Contact Method *
                  </label>
                  <select
                    id="enq-preferredContactMethod"
                    {...register("preferredContactMethod")}
                    className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-3.5 py-3 text-sm text-[#153D30]"
                  >
                    <option value="Phone Call">Phone Call</option>
                    <option value="WhatsApp / SMS">WhatsApp / SMS</option>
                    <option value="Email">Email</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="enq-message"
                  className="block text-xs font-extrabold uppercase tracking-wider text-[#0B382A] mb-1"
                >
                  Message / Questions (Optional)
                </label>
                <textarea
                  id="enq-message"
                  rows={3}
                  placeholder="Share your goals or questions about projects, mentorship, or schedules..."
                  {...register("message")}
                  className="w-full rounded-xl bg-[#FFFFFF] border border-[#174B38]/25 px-3.5 py-2.5 text-sm text-[#153D30]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-3 rounded-full bg-[#F8F0E3] text-[#0B382A] font-bold text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}

/**
 * Registration Modal Wrapper around RegistrationWizard
 */
export function RegistrationModal({
  isOpen,
  onClose,
  initialProgrammeSlug,
  onSuccessComplete,
}) {
  const dialogRef = useNativeDialog(isOpen, onClose);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="registration-dialog-title"
      className="nm-dialog"
    >
      {isOpen && (
        <RegistrationWizard
          initialProgrammeSlug={initialProgrammeSlug}
          onSuccessComplete={onSuccessComplete}
          onClose={onClose}
        />
      )}
    </dialog>
  );
}

/**
 * Programme Detail & Syllabus Preview Modal ("View Programme")
 */
export function ProgrammeDetailModal({
  programme,
  isOpen,
  onClose,
  onEnrolProgramme,
}) {
  const dialogRef = useNativeDialog(isOpen, onClose);
  if (!programme) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="programme-detail-title"
      className="nm-dialog"
    >
      <div className="rounded-3xl bg-[#FFF7EB] border border-[#174B38]/20 shadow-[0_28px_70px_-15px_rgba(8,47,36,0.5)] overflow-hidden">
        <div className="relative h-48 bg-[#0B382A] overflow-hidden">
          <img
            src={programme.image}
            alt={programme.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082F24] via-[#082F24]/50 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close programme overview"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#082F24]/80 hover:bg-[#C9D9B9] text-[#FFF7EB] hover:text-[#082F24] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-[#FFF7EB]">
            <span className="px-3 py-1 rounded-full bg-[#C9D9B9] text-[#082F24] text-xs font-extrabold">
              {programme.level}
            </span>
            <h2
              id="programme-detail-title"
              className="mt-2 text-2xl sm:text-3xl font-extrabold m-0"
              style={{ fontFamily: "'Manrope', 'DM Sans', sans-serif" }}
            >
              {programme.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          <p className="text-sm sm:text-base text-[#153D30] leading-relaxed m-0">
            {programme.description}
          </p>

          <div className="rounded-2xl bg-[#F8F0E3] p-5 border border-[#174B38]/12">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#174B38] mb-3 m-0 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0B382A]" aria-hidden="true" />
              <span>Curriculum Modules & Practical Topics</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 list-none m-0 p-0">
              {programme.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-center gap-2 text-sm font-bold text-[#0B382A]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#174B38] shrink-0" aria-hidden="true" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-[#0B382A] text-[#FFF7EB] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9D9B9]">
              Primary Capstone Outcome
            </span>
            <p className="text-sm font-semibold m-0 mt-1">
              {programme.deliverable}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-full bg-[#F8F0E3] text-[#0B382A] font-bold text-sm cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnrolProgramme(programme.slug);
              }}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0B382A] hover:bg-[#174B38] text-[#FFF7EB] font-bold text-sm shadow-md cursor-pointer"
            >
              <span>Enrol in {programme.title}</span>
              <ArrowRight className="w-4 h-4 text-[#C9D9B9]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

/**
 * Legal / Policy Modal (Privacy Policy & Terms and Conditions)
 */
export function LegalModal({ type, isOpen, onClose }) {
  const dialogRef = useNativeDialog(isOpen, onClose);
  const isPrivacy = type === "privacy";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="legal-modal-title"
      className="nm-dialog"
    >
      <div className="rounded-3xl bg-[#FFF7EB] border border-[#174B38]/20 shadow-2xl overflow-hidden">
        <div className="bg-[#0B382A] text-[#FFF7EB] px-6 py-5 flex items-center justify-between">
          <h2 id="legal-modal-title" className="text-xl font-extrabold m-0">
            {isPrivacy
              ? "NEXTMIND Privacy Policy"
              : "NEXTMIND Terms and Conditions"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal policy modal"
            className="w-9 h-9 rounded-full bg-[#174B38] text-[#FFF7EB] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <div className="p-6 sm:p-8 space-y-4 text-sm text-[#153D30] leading-relaxed">
          {isPrivacy ? (
            <>
              <p className="m-0">
                NEXTMIND respects your privacy. Personal details submitted
                through our Programme Registration and Academic Advisor Enquiry
                forms (name, email address, phone number, and education
                background) are stored securely in our database solely for
                programme admissions and learner support.
              </p>
              <p className="m-0">
                We do not sell or rent learner contact information to third
                parties. You may request an update or deletion of your lead
                record at any time by contacting our admissions desk.
              </p>
            </>
          ) : (
            <>
              <p className="m-0">
                NEXTMIND programmes focus on practical AI, automation, and
                digital product skill development through hands-on projects.
              </p>
              <p className="m-0">
                Programme schedules, durations, and sample project briefs shown
                on this website serve as curriculum guides and may be tailored
                for each cohort intake.
              </p>
            </>
          )}
          <div className="pt-3 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#0B382A] text-[#FFF7EB] font-bold text-sm cursor-pointer"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

