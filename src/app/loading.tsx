import { Skeleton } from "@/components/ui/Skeleton/Skeleton";

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col space-y-6 p-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-12 w-full" />
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={`root-skel-${i}`} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
