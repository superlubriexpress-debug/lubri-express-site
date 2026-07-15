import { stats } from "@/lib/site-data";

export function StatsSection() {
  return (
    <section className="bg-accent py-12 text-ink">
      <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border border-black/10 bg-white/45 p-6 text-center backdrop-blur">
            <div className="h-display text-4xl">{item.value}</div>
            <div className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-black/60">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
