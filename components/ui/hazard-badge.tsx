import { Badge } from "@/components/ui/badge"
import { HazardClass } from "@prisma/client"
import { cn } from "@/lib/utils"

interface HazardBadgeProps {
  hazard: HazardClass | string
  className?: string
  hideLabel?: boolean
}

export function HazardBadge({ hazard, className, hideLabel }: HazardBadgeProps) {
  const formatName = (name: string) => name.replace("_", " ")

  const getHazardStyles = (hazard: HazardClass | string) => {
    switch (hazard) {
      case "FLAMMABLE":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-900/50"
      case "CORROSIVE":
        return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-900/50"
      case "TOXIC":
        return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-900/50"
      case "OXIDIZER":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-900/50"
      case "EXPLOSIVE":
        return "bg-red-200 text-red-900 border-red-300 dark:bg-red-950/50 dark:text-red-300 dark:border-red-900/70"
      case "COMPRESSED_GAS":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-900/50"
      case "NON_HAZARDOUS":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700"
    }
  }

  return (
    <Badge variant="outline" className={cn("font-medium whitespace-nowrap", getHazardStyles(hazard), className)}>
      {!hideLabel && formatName(hazard)}
    </Badge>
  )
}
