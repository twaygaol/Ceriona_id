import { cn } from "@/lib/utils";

export function Spinner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <div className="size-6 animate-spin rounded-full border-2 border-brown/10 border-t-brown" />
    </div>
  );
}
