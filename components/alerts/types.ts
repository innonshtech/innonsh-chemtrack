import { AlertType, AlertStatus } from "@prisma/client"

export type AlertSeverity = "CRITICAL" | "WARNING"

export interface AlertDataPayload {
  id: string
  type: AlertType
  status: AlertStatus
  severity: AlertSeverity
  message: string
  createdAt: Date
  chemicalName?: string
  chemicalId?: string
  batchNumber?: string
  batchId?: string
}
