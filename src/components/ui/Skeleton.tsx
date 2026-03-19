import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

function Skeleton({
  className,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  return (
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatType: "reverse" }}
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

function PremiumSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}

export { Skeleton, PremiumSkeleton }
