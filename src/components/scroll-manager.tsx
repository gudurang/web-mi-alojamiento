"use client";

import { useEffect } from "react";
import { scrollToId } from "@/lib/scroll";

// Gestiona el desplazamiento suave a las secciones respetando la barra fija,
// y recorrige tras posibles reajustes de layout (imágenes/fuentes).
export function ScrollManager() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const anchor = target.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.length < 2) return;
      const id = href.slice(1);
      if (!document.getElementById(id)) return;

      e.preventDefault();
      history.replaceState(null, "", href);
      scrollToId(id, true);
      // Recorrección tras cargar fuentes/imágenes (sin animación).
      window.setTimeout(() => scrollToId(id, false), 700);
      window.setTimeout(() => scrollToId(id, false), 1300);
    }

    document.addEventListener("click", handleClick);

    // Si se entra con un hash en la URL, colocar bien tras el render.
    if (window.location.hash.length > 1) {
      const id = window.location.hash.slice(1);
      window.setTimeout(() => scrollToId(id, false), 250);
      window.setTimeout(() => scrollToId(id, false), 800);
    }

    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
