import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items, light = false }: { items: BreadcrumbItem[]; light?: boolean }) {
  return (
    <nav aria-label="Navegação estrutural">
      <ol className={`flex flex-wrap items-center gap-1.5 text-sm font-semibold ${light ? "text-white/65" : "text-neutral-500"}`}>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className={`rounded-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${light ? "hover:text-white" : "hover:text-ink"}`}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={light ? "text-white" : "text-ink"}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
