import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "gold" | "success" | "warning" | "danger";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-brown/10 text-brown",
  gold: "bg-gold/15 text-gold-dark",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", variantStyles[variant], className)}>
      {children}
    </span>
  );
}
