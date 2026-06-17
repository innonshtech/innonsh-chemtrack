export interface SettingsUser {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
}

export interface SettingsAuditLog {
  id: string
  type: string
  timestamp: Date
  performedBy: string
  details: string
  severity: "INFO" | "WARNING" | "CRITICAL"
}
