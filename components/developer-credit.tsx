import Image from "next/image";

import { assets } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type DeveloperCreditProps = {
  className?: string;
  compact?: boolean;
};

export function DeveloperCredit({ className, compact = false }: DeveloperCreditProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 text-neutral-500",
        compact ? "gap-2" : "gap-2.5",
        className,
      )}
    >
      <span className="text-[9px] font-black uppercase tracking-[0.16em]">Desenvolvido por</span>
      <span className="inline-flex rounded-md border border-white/10 bg-black px-2 py-1 shadow-sm">
        <Image
          src={assets.signature}
          alt="Gean Maikon"
          width={112}
          height={19}
          className={cn("w-auto object-contain opacity-90", compact ? "h-4 max-w-[92px]" : "h-5 max-w-[112px]")}
        />
      </span>
    </div>
  );
}
