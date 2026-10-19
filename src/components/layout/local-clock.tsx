"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};

export function LocalClock({ className }: { className?: string }) {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [timeString, setTimeString] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const timeFormatter = new Intl.DateTimeFormat("id-ID", options);
      setTimeString(timeFormatter.format(now));

      const jakartaDate = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      );
      const day = jakartaDate.getDay();
      const hour = jakartaDate.getHours();
      const minute = jakartaDate.getMinutes();
      const timeInMinutes = hour * 60 + minute;

      let open = false;
      if (day >= 1 && day <= 5) {
        open = timeInMinutes >= 510 && timeInMinutes < 1020;
      } else if (day === 6) {
        open = timeInMinutes >= 540 && timeInMinutes < 840;
      }

      setIsOpen(open);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isMounted || !timeString) {
    return (
      <span className={cn("font-mono text-mono text-stone select-none", className)}>
        --:--:-- WIB
      </span>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-mono text-graphite", className)}>
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full inline-block shrink-0 transition-colors",
          isOpen ? "bg-emerald-600" : "bg-stone"
        )}
        aria-hidden="true"
      />
      <span>{timeString} WIB</span>
      <span className="text-stone select-none">&bull;</span>
      <span className="text-stone">
        {isOpen ? "Studio Buka" : "Studio Tutup"}
      </span>
    </div>
  );
}
