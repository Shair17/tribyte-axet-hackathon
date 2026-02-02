import { Fragment } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <Fragment>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
        <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
        <Skeleton className="bg-muted/50 aspect-video rounded-xl" />
      </div>

      <Skeleton className="bg-muted/50 min-h-dvh flex-1 rounded-xl md:min-h-min" />

      <Skeleton className="bg-muted/50 min-h-dvh flex-1 rounded-xl md:min-h-min" />

      <Skeleton className="bg-muted/50 min-h-dvh flex-1 rounded-xl md:min-h-min" />
    </Fragment>
  );
}
