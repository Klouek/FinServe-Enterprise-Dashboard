import * as React from "react"
import { cn } from "@/lib/utils"

export function Progress({ value, max = 100, className, indicatorClassName }: any) {
  const percentage = Math.min(100, Math.max(0, ((value || 0) / max) * 100))
  return (
    <div className={cn("relative h-2 w-full overflow-hidden rounded-full bg-slate-200", className)}>
      <div
        className={cn("h-full w-full flex-1 bg-indigo-600 transition-all duration-500 ease-out", indicatorClassName)}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
}
