import { WhatsAppIcon } from "@/components/icons";
import { company } from "@/lib/site-data";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={`https://wa.me/${company.phoneHref}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Lubri Express pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-16 w-16 place-items-center rounded-full bg-accent text-ink shadow-glow transition hover:-translate-y-1 hover:bg-[#ffd94a]"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
