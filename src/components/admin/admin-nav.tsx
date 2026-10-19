"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, RefreshCw, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { revalidateSiteAction } from "@/actions/admin-actions";
import { cn } from "@/lib/utils";

export function AdminNav() {
  const pathname = usePathname();
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [revalidateMsg, setRevalidateMsg] = useState("");

  const navLinks = [
    { label: "Ringkasan", href: "/admin" },
    { label: "Proyek", href: "/admin/proyek" },
    { label: "Konsultasi (Enquiry)", href: "/admin/enquiry" },
    { label: "Pengaturan Situs", href: "/admin/pengaturan" },
  ];

  const handleRevalidate = async () => {
    setIsRevalidating(true);
    setRevalidateMsg("");
    try {
      const res = await revalidateSiteAction();
      if (res.success) {
        setRevalidateMsg("Cache Berhasil Diperbarui");
        setTimeout(() => setRevalidateMsg(""), 3000);
      }
    } catch {
      // Ignore
    } finally {
      setIsRevalidating(false);
    }
  };

  return (
    <header className="w-full bg-paper border-b border-ink-hairline select-none">
      <Container className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
        {/* Brand & Studio Tag */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="font-sans text-xl font-medium tracking-tight text-ink hover:underline"
          >
            Kala Atelier
          </Link>
          <span className="font-mono text-label uppercase tracking-widest text-clay bg-bone px-2 py-0.5 border border-ink-hairline">
            CMS Admin
          </span>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center gap-4">
          {revalidateMsg && (
            <span className="inline-flex items-center gap-1 font-mono text-xs text-emerald-800">
              <Check size={14} strokeWidth={2} />
              <span>{revalidateMsg}</span>
            </span>
          )}

          <button
            type="button"
            onClick={handleRevalidate}
            disabled={isRevalidating}
            className="inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-wider text-graphite hover:text-ink disabled:opacity-50 transition-colors"
          >
            <RefreshCw
              size={13}
              strokeWidth={1.5}
              className={cn(isRevalidating && "animate-spin")}
            />
            <span>{isRevalidating ? "Memperbarui..." : "Revalidasi Cache"}</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1 font-mono text-label uppercase tracking-wider text-ink border-b border-ink-hairline pb-0.5 hover:border-ink transition-colors"
          >
            <span>Lihat Situs</span>
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </Container>

      {/* Navigation Tabs */}
      <div className="border-t border-ink-hairline bg-bone/30">
        <Container>
          <nav className="flex items-center gap-8 overflow-x-auto no-scrollbar font-mono text-label uppercase tracking-wider">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "py-3 border-b-2 transition-colors whitespace-nowrap",
                    isActive
                      ? "border-ink text-ink font-semibold"
                      : "border-transparent text-stone hover:text-graphite"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </div>
    </header>
  );
}

