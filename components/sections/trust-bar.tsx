import { trustItems } from "@/lib/site-data";

export function TrustBar() {
  return (
    <div className="border-y border-border bg-neutral-50 py-4">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-black uppercase tracking-[0.16em] text-neutral-600">
        {trustItems.map((item, index) => (
          <span key={item} className="flex items-center gap-3">
            {index > 0 && <span className="hidden h-1.5 w-1.5 rounded-full bg-accent sm:block" />}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
