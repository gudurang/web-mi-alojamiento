// Desplazamiento a secciones teniendo en cuenta la altura de la barra fija.

export function headerOffset(): number {
  if (typeof window === "undefined") return 80;
  return window.matchMedia("(min-width: 768px)").matches ? 80 : 64;
}

export function scrollToId(id: string, smooth = true): void {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset();
  window.scrollTo({ top: Math.max(0, y), behavior: smooth ? "smooth" : "auto" });
}
