"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function WhatsappFab() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className={cn(
        "fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-bosque text-crema shadow-lg transition-all duration-300 hover:scale-105 hover:bg-bosque-dark",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bosque/40" />
      <MessageCircle className="relative h-7 w-7" />
    </a>
  );
}
