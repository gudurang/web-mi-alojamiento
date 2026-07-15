import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Coincide con todas las rutas excepto api, _next, _vercel y archivos con extensión
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
