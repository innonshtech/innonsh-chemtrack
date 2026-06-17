import { db } from "@/lib/db"
import { SettingsClient } from "@/components/settings/settings-client"
import { SettingsUser, SettingsAuditLog } from "@/components/settings/types"
import { Settings } from "lucide-react"

export default async function SettingsPage() {
  
  // 1. Fetch Users
  const rawUsers = await db.user.findMany({
    orderBy: {
      role: "asc"
    }
  })

  const users: SettingsUser[] = rawUsers.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt
  }))

  // 2. Mock Audit Logs (Using Transactions + some synthetic events for UI demonstration)
  const rawTransactions = await db.transaction.findMany({
    include: {
      performedBy: true,
      batch: { include: { chemical: true } }
    },
    orderBy: {
      timestamp: "desc"
    },
    take: 50 // Limit for audit log UI
  })

  const auditLogs: SettingsAuditLog[] = rawTransactions.map(t => {
    let severity: "INFO" | "WARNING" | "CRITICAL" = "INFO"
    if (t.type === "ADJUSTMENT") severity = "WARNING"
    
    return {
      id: t.id,
      type: `INVENTORY_${t.type}`,
      timestamp: t.timestamp,
      performedBy: t.performedBy.name,
      details: `${t.type.replace("_", " ")} of ${t.quantity} ${t.batch.chemical.unitOfMeasure} for ${t.batch.chemical.name} (Batch ${t.batch.batchNumber}). Reason: ${t.reason || 'None'}`,
      severity
    }
  })

  // Add a few synthetic "System" audit logs to demonstrate the enterprise interface
  auditLogs.unshift({
    id: "sys-001",
    type: "USER_LOGIN_FAILED",
    timestamp: new Date(),
    performedBy: "Unknown (IP: 192.168.1.105)",
    details: "Failed authentication attempt for admin@innonsh.com. 3 consecutive failures.",
    severity: "CRITICAL"
  })

  auditLogs.unshift({
    id: "sys-002",
    type: "SYSTEM_BACKUP",
    timestamp: new Date(new Date().getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
    performedBy: "SYSTEM_AUTOMATION",
    details: "Automated incremental database backup completed successfully (Size: 142MB).",
    severity: "INFO"
  })

  return (
    <div className="flex-1 w-full pb-10 space-y-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          System Settings
        </h2>
        <p className="text-muted-foreground">Enterprise administration interface for access controls and configurations.</p>
      </div>

      <SettingsClient users={users} auditLogs={auditLogs} />
    </div>
  )
}
