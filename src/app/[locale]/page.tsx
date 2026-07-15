import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Rooms } from "@/components/sections/rooms";
import { Booking } from "@/components/sections/booking";
import { Environment } from "@/components/sections/environment";
import { Gallery } from "@/components/sections/gallery";
import { Contact } from "@/components/sections/contact";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <About />
      <Rooms />
      <Booking />
      <Environment />
      <Gallery />
      <Contact />
    </>
  );
}
