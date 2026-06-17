import { db } from "@/lib/db"
import { AlertDataPayload } from "@/components/alerts/types"
import { AlertsClient } from "@/components/alerts/alerts-client"
import { ShieldAlert } from "lucide-react"

export default async function AlertsPage() {
  const rawAlerts = await db.alert.findMany({
    include: {
      chemical: true,
      batch: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const payload: AlertDataPayload[] = rawAlerts.map(alert => {
    // Derive Severity
    const isCritical = alert.type === "EXPIRED" || alert.type === "HAZARD_VIOLATION"
    const severity = isCritical ? "CRITICAL" : "WARNING"

    return {
      id: alert.id,
      type: alert.type,
      status: alert.status,
      severity,
      message: alert.message,
      createdAt: alert.createdAt,
      chemicalName: alert.chemical?.name,
      chemicalId: alert.chemicalId || undefined,
      batchNumber: alert.batch?.batchNumber,
      batchId: alert.batchId || undefined
    }
  })

  // Sort payload so CRITICAL alerts bubble to the top if they are active, then by date
  payload.sort((a, b) => {
    // Resolved/Dismissed go to bottom
    const aIsActive = a.status === "ACTIVE"
    const bIsActive = b.status === "ACTIVE"
    if (aIsActive && !bIsActive) return -1
    if (!aIsActive && bIsActive) return 1

    // Within active, CRITICAL goes first
    if (aIsActive && bIsActive) {
      if (a.severity === "CRITICAL" && b.severity !== "CRITICAL") return -1
      if (a.severity !== "CRITICAL" && b.severity === "CRITICAL") return 1
    }

    // Then sort by date descending
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full pb-10 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2 text-destructive">
            <ShieldAlert className="h-8 w-8" />
            Alert Management Center
          </h2>
          <p className="text-muted-foreground">Monitor and triage inventory violations, expirations, and safety hazards.</p>
        </div>
      </div>

      <AlertsClient alerts={payload} />
    </div>
  )
}
