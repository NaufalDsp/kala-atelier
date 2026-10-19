"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check, Send, ArrowUpRight } from "lucide-react";
import { IndexLabel } from "@/components/ui/index-label";
import { Pill } from "@/components/ui/pill";
import {
  EnquiryInput,
  ENQUIRY_BUDGETS,
  BUILDER_STATUSES,
  ENQUIRY_SOURCES,
  budgetLabels,
  builderStatusLabels,
  sourceLabels,
} from "@/domain/enquiry";
import {
  PROJECT_TYPES,
  projectTypeLabels,
  ProjectType,
} from "@/domain/project";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "kala_enquiry_draft";

const INITIAL_FORM: EnquiryInput = {
  name: "",
  email: "",
  phone: "",
  projectTypes: [],
  location: "",
  timeline: "",
  budget: undefined,
  hasBuilder: undefined,
  builderNote: "",
  brief: "",
  source: undefined,
  refProject: "",
  website: "",
};

interface EnquiryWizardProps {
  initialRef?: string;
}

export function EnquiryWizard({ initialRef }: EnquiryWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<EnquiryInput>(() => ({
    ...INITIAL_FORM,
    refProject: initialRef || "",
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [submittedId, setSubmittedId] = useState<string>("");
  const [serverError, setServerError] = useState<string>("");

  // Restore draft from sessionStorage on mount asynchronously
  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setFormData((prev) => ({
            ...prev,
            ...parsed,
            refProject: initialRef || parsed.refProject || "",
          }));
        }
      } catch {
        // Ignore storage read errors
      }
    });

    return () => cancelAnimationFrame(handle);
  }, [initialRef]);

  // Persist draft to sessionStorage
  const updateField = <K extends keyof EnquiryInput>(
    field: K,
    value: EnquiryInput[K]
  ) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignore storage write errors
      }
      return updated;
    });

    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleProjectType = (type: string) => {
    const current = formData.projectTypes;
    const exists = current.includes(type);
    const updated = exists
      ? current.filter((t) => t !== type)
      : [...current, type];

    updateField("projectTypes", updated);
  };

  // Step validation before proceeding
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 2) {
        newErrors.name = "Nama lengkap wajib diisi (minimal 2 karakter).";
      }
      if (
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Alamat email tidak valid.";
      }
      if (formData.phone && formData.phone.length > 0 && formData.phone.length < 8) {
        newErrors.phone = "Nomor WhatsApp minimal 8 digit.";
      }
    } else if (currentStep === 2) {
      if (formData.projectTypes.length === 0) {
        newErrors.projectTypes = "Pilih minimal satu kategori proyek.";
      }
    } else if (currentStep === 3) {
      if (!formData.location.trim() || formData.location.trim().length < 2) {
        newErrors.location = "Lokasi lahan / kota wajib diisi.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.error || "Gagal mengirimkan formulir.");
        }
        setIsSubmitting(false);
        return;
      }

      // Success
      setSubmittedId(data.enquiryId || "ENQ-SUCCESS");
      setIsSuccess(true);
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
    } catch (err) {
      console.error("[SUBMIT ERROR]", err);
      setServerError("Terjadi kendala jaringan. Mohon periksa koneksi Anda.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS STATE VIEW
  if (isSuccess) {
    const waText = encodeURIComponent(
      `Halo Kala Atelier, saya sudah mengirim formulir konsultasi dengan ID ${submittedId} atas nama ${formData.name}.`
    );
    const waLink = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\+/g, "")}?text=${waText}`;

    return (
      <div className="w-full max-w-3xl mx-auto py-12 flex flex-col gap-10">
        <div className="p-8 sm:p-12 bg-bone/40 border border-ink-hairline flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center">
              <Check size={16} strokeWidth={2} />
            </span>
            <span className="font-mono text-label uppercase tracking-widest text-clay font-semibold">
              Formulir Berhasil Terkirim
            </span>
          </div>

          <h2 className="font-sans text-3xl sm:text-4xl font-medium tracking-tight text-ink leading-tight">
            Terima kasih, {formData.name}. Permohonan konsultasi Anda telah kami terima.
          </h2>

          <div className="flex flex-col gap-2 font-mono text-mono text-graphite border-y border-ink-hairline py-4">
            <div className="flex justify-between">
              <span className="text-stone">Nomor Referensi :</span>
              <span className="text-ink font-semibold">{submittedId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">Lokasi Tapak :</span>
              <span className="text-ink">{formData.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone">Tipologi :</span>
              <span className="text-ink">{formData.projectTypes.join(", ")}</span>
            </div>
          </div>

          <p className="font-sans text-body text-graphite leading-relaxed">
            Prinsipal arsitek kami akan menelaah data tapak dan keselarasan jadwal studio dalam 1&ndash;2 hari kerja. Konfirmasi awal akan dikirimkan ke email <strong>{formData.email}</strong>.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 bg-ink text-paper font-mono text-label uppercase tracking-wider hover:bg-graphite transition-colors"
            >
              <span>Konfirmasi Cepat via WhatsApp</span>
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>

            <Pill href="/karya" variant="outline">
              Kembali ke Portofolio
            </Pill>
          </div>
        </div>
      </div>
    );
  }

  // WIZARD MULTI-STEP VIEW
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-10">
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between border-b border-ink-hairline pb-4 font-mono text-mono">
        <div className="flex items-center gap-3">
          <IndexLabel index={step} total={6} />
          <span className="text-stone uppercase text-xs tracking-wider">
            {step === 1 && "Data Diri"}
            {step === 2 && "Jenis Proyek"}
            {step === 3 && "Lokasi & Jadwal"}
            {step === 4 && "Perkiraan Anggaran"}
            {step === 5 && "Kontraktor & Brief"}
            {step === 6 && "Sumber & Konfirmasi"}
          </span>
        </div>

        {formData.refProject && (
          <span className="text-clay text-xs tracking-wider uppercase">
            Ref: {formData.refProject}
          </span>
        )}
      </div>

      {/* Honeypot Field (Invisible to human, traps bots) */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={formData.website}
        onChange={(e) => updateField("website", e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      {/* Server Error Alert */}
      {serverError && (
        <div className="p-4 bg-clay/10 border border-clay text-clay font-mono text-xs">
          {serverError}
        </div>
      )}

      {/* STEP 1: DATA DIRI */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-ink">
              Bagaimana kami dapat menyapa dan menghubungi Anda?
            </h2>
            <p className="font-sans text-sm text-graphite">
              Data Anda dirahasiakan dan hanya digunakan untuk korespondensi desain.
            </p>
          </div>

          <div className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-label uppercase text-graphite">
                Nama Lengkap <span className="text-clay">*</span>
              </label>
              <input
                type="text"
                placeholder="mis. Budi Santoso"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full p-3.5 bg-paper border border-ink-hairline focus:border-ink focus:outline-none font-sans text-ink transition-colors"
              />
              {errors.name && (
                <span className="font-mono text-xs text-clay">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-label uppercase text-graphite">
                Alamat Email <span className="text-clay">*</span>
              </label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full p-3.5 bg-paper border border-ink-hairline focus:border-ink focus:outline-none font-sans text-ink transition-colors"
              />
              {errors.email && (
                <span className="font-mono text-xs text-clay">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-label uppercase text-graphite">
                Nomor WhatsApp <span className="text-stone text-[11px]">(Opsional)</span>
              </label>
              <input
                type="tel"
                placeholder="+62 812 3456 7890"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="w-full p-3.5 bg-paper border border-ink-hairline focus:border-ink focus:outline-none font-sans text-ink transition-colors"
              />
              {errors.phone && (
                <span className="font-mono text-xs text-clay">{errors.phone}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: JENIS PROYEK */}
      {step === 2 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-ink">
              Apa tipologi ruang yang ingin Anda rancang?
            </h2>
            <p className="font-sans text-sm text-graphite">
              Pilih satu atau lebih kategori yang relevan dengan rencana Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {PROJECT_TYPES.map((type: ProjectType) => {
              const isSelected = formData.projectTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleProjectType(type)}
                  className={cn(
                    "p-4 text-left border transition-all flex items-center justify-between",
                    isSelected
                      ? "border-ink bg-ink text-paper"
                      : "border-ink-hairline bg-paper text-ink hover:border-ink hover:bg-bone/30"
                  )}
                >
                  <span className="font-sans text-lg font-medium">
                    {projectTypeLabels[type].id}
                  </span>
                  {isSelected && <Check size={16} strokeWidth={2} />}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => toggleProjectType("belum_yakin")}
              className={cn(
                "p-4 text-left border transition-all flex items-center justify-between sm:col-span-2",
                formData.projectTypes.includes("belum_yakin")
                  ? "border-ink bg-ink text-paper"
                  : "border-ink-hairline bg-paper text-ink hover:border-ink hover:bg-bone/30"
              )}
            >
              <span className="font-sans text-lg font-medium">
                Belum yakin / Ingin berdiskusi konsep terlebih dahulu
              </span>
              {formData.projectTypes.includes("belum_yakin") && (
                <Check size={16} strokeWidth={2} />
              )}
            </button>
          </div>

          {errors.projectTypes && (
            <span className="font-mono text-xs text-clay">
              {errors.projectTypes}
            </span>
          )}
        </div>
      )}

      {/* STEP 3: LOKASI & WAKTU */}
      {step === 3 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-ink">
              Di mana lokasi tapak dan kapan rencana konstruksi dimulai?
            </h2>
            <p className="font-sans text-sm text-graphite">
              Lokasi menentukan orientasi angin pasif dan regulasi sempadan tata kota setempat.
            </p>
          </div>

          <div className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-label uppercase text-graphite">
                Kota & Lokasi Tapak <span className="text-clay">*</span>
              </label>
              <input
                type="text"
                placeholder="mis. Cilandak, Jakarta Selatan atau Dago, Bandung"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="w-full p-3.5 bg-paper border border-ink-hairline focus:border-ink focus:outline-none font-sans text-ink transition-colors"
              />
              {errors.location && (
                <span className="font-mono text-xs text-clay">
                  {errors.location}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-label uppercase text-graphite">
                Target Mulai Konstruksi <span className="text-stone text-[11px]">(Opsional)</span>
              </label>
              <input
                type="text"
                placeholder="mis. Pertengahan 2026 atau Segera setelah Izin PBG selesai"
                value={formData.timeline}
                onChange={(e) => updateField("timeline", e.target.value)}
                className="w-full p-3.5 bg-paper border border-ink-hairline focus:border-ink focus:outline-none font-sans text-ink transition-colors"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: PERKIRAAN ANGGARAN */}
      {step === 4 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-ink">
              Berapa kisaran alokasi anggaran konstruksi yang direncanakan?
            </h2>
            <p className="font-sans text-sm text-graphite">
              Informasi ini membantu kami menyelaraskan pemilihan spesifikasi material (mis. kayu ulin vs jati, luas bukaan kaca).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {ENQUIRY_BUDGETS.map((budg) => {
              const isSelected = formData.budget === budg;
              return (
                <button
                  key={budg}
                  type="button"
                  onClick={() => updateField("budget", budg)}
                  className={cn(
                    "p-4 text-left border transition-all flex items-center justify-between",
                    isSelected
                      ? "border-ink bg-ink text-paper"
                      : "border-ink-hairline bg-paper text-ink hover:border-ink hover:bg-bone/30"
                  )}
                >
                  <span className="font-mono text-sm">{budgetLabels[budg]}</span>
                  {isSelected && <Check size={15} strokeWidth={2} />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 5: KONTRAKTOR & BRIEF BEBAS */}
      {step === 5 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-ink">
              Apakah Anda sudah memiliki kontraktor pelaksana?
            </h2>
            <p className="font-sans text-sm text-graphite">
              Kala Atelier dapat merekomendasikan kontraktor rekanan yang teruji presisi dalam pekerjaan tektonika.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            {BUILDER_STATUSES.map((b) => {
              const isSelected = formData.hasBuilder === b;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => updateField("hasBuilder", b)}
                  className={cn(
                    "p-3.5 text-left border transition-all flex items-center justify-between",
                    isSelected
                      ? "border-ink bg-ink text-paper"
                      : "border-ink-hairline bg-paper text-ink hover:border-ink hover:bg-bone/30"
                  )}
                >
                  <span className="font-sans text-base">{builderStatusLabels[b]}</span>
                  {isSelected && <Check size={15} strokeWidth={2} />}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-1.5 pt-3">
            <label className="font-mono text-label uppercase text-graphite">
              Gagasan atau Catatan Kebutuhan Ruang Khusus{" "}
              <span className="text-stone text-[11px]">(Maks. 2.000 karakter)</span>
            </label>
            <textarea
              rows={4}
              maxLength={2000}
              placeholder="Ceritakan gambaran singkat: jumlah kamar tidur, kebutuhan ruang kerja tenang, kecintaan terhadap tanaman dalam ruangan, dsb."
              value={formData.brief}
              onChange={(e) => updateField("brief", e.target.value)}
              className="w-full p-3.5 bg-paper border border-ink-hairline focus:border-ink focus:outline-none font-sans text-ink transition-colors resize-y text-sm leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* STEP 6: SUMBER INFORMASI & PENINJAUAN AKHIR */}
      {step === 6 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-ink">
              Dari mana Anda pertama kali mengetahui tentang Kala Atelier?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {ENQUIRY_SOURCES.map((src) => {
              const isSelected = formData.source === src;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => updateField("source", src)}
                  className={cn(
                    "p-3.5 text-left border transition-all flex items-center justify-between",
                    isSelected
                      ? "border-ink bg-ink text-paper"
                      : "border-ink-hairline bg-paper text-ink hover:border-ink hover:bg-bone/30"
                  )}
                >
                  <span className="font-mono text-sm">{sourceLabels[src]}</span>
                  {isSelected && <Check size={15} strokeWidth={2} />}
                </button>
              );
            })}
          </div>

          {/* Review Summary Card */}
          <div className="mt-4 p-5 bg-bone/30 border border-ink-hairline flex flex-col gap-2 font-mono text-xs text-graphite">
            <span className="uppercase text-ink font-semibold border-b border-ink-hairline pb-1">
              Ringkasan Kiriman
            </span>
            <div>Pengirim: {formData.name} &bull; {formData.email}</div>
            <div>Tipologi: {formData.projectTypes.join(", ") || "-"}</div>
            <div>Lokasi: {formData.location || "-"}</div>
            <div>Anggaran: {formData.budget ? budgetLabels[formData.budget] : "Belum ditentukan"}</div>
          </div>
        </div>
      )}

      {/* Navigation Buttons: Kembali & Lanjut/Kirim */}
      <div className="flex items-center justify-between border-t border-ink-hairline pt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 font-mono text-label uppercase tracking-wider text-graphite hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            <span>Kembali</span>
          </button>
        ) : (
          <div />
        )}

        {step < 6 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink text-paper font-mono text-label uppercase tracking-wider hover:bg-graphite transition-colors"
          >
            <span>Lanjut ({step + 1}/6)</span>
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={cn(
              "inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink text-paper font-mono text-label uppercase tracking-wider transition-colors",
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-graphite active:bg-black"
            )}
          >
            <span>{isSubmitting ? "Mengirim..." : "Kirim Formulir"}</span>
            <Send size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}

