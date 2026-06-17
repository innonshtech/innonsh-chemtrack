import { AlertTriangle, Clock, ShieldAlert } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface AlertBannerProps {
  lowStockCount: number
  expiringCount: number
  hazardViolationsCount: number
}

export function AlertBanner({ lowStockCount, expiringCount, hazardViolationsCount }: AlertBannerProps) {
  const hasAlerts = lowStockCount > 0 || expiringCount > 0 || hazardViolationsCount > 0

  if (!hasAlerts) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
      {hazardViolationsCount > 0 && (
        <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Hazard Violations</AlertTitle>
          <AlertDescription>
            {hazardViolationsCount} batches are stored in incompatible hazard zones. Action required immediately.
          </AlertDescription>
        </Alert>
      )}

      {expiringCount > 0 && (
        <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
          <Clock className="h-4 w-4" />
          <AlertTitle>Expiry Alerts</AlertTitle>
          <AlertDescription>
            {expiringCount} batches are expired or expiring within 30 days.
          </AlertDescription>
        </Alert>
      )}

      {lowStockCount > 0 && (
        <Alert className="bg-warning/10 border-warning/20 text-warning-foreground">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <AlertTitle className="text-warning">Low Stock</AlertTitle>
          <AlertDescription className="text-warning-foreground/90">
            {lowStockCount} chemicals have fallen below their minimum reorder level.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
