import { Skeleton } from "@/components/ui/Skeleton";

export function TitleSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-8 w-72" />
      <Skeleton className="h-4 w-96" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-gold/15 bg-white/80 p-5 backdrop-blur-xl">
      <Skeleton className="mb-4 h-5 w-40" />
      <Skeleton className="mb-2 h-3 w-56" />
      <div className="space-y-3 pt-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border border-gold/15 bg-white/80 p-6 backdrop-blur-xl">
      <Skeleton className="mb-3 h-3 w-20" />
      <Skeleton className="h-8 w-16" />
    </div>
  );
}

export function SelectSkeleton() {
  return (
    <div className="rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
      <Skeleton className="mb-3 h-5 w-32" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-start gap-4 rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
          <Skeleton className="mt-0.5 size-10 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-xl border border-gold/15 bg-white/80 p-4 backdrop-blur-xl">
          <Skeleton className="mb-2 aspect-square w-full rounded-lg" />
          <Skeleton className="mb-1 h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  );
}
