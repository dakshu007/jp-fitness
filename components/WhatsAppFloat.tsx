import { MessageCircle } from "lucide-react";
import { business } from "@/lib/data";

/** Floating WhatsApp button, visible on every page. */
export default function WhatsAppFloat() {
  return (
    <a
      href={business.whatsappHref}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-ink ring-2 ring-ink/60 transition-transform duration-200 hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}
