export interface ReportBatch {
  id: string
  batchNumber: string
  chemicalName: string
  category: string
  hazardClass: string
  supplierName: string
  supplierId: string
  warehouseLocation: string
  expiryDate: Date
  quantityRemaining: number
  costPerUnit: number
  unitOfMeasure: string
}

export interface ReportTransaction {
  id: string
  type: string
  quantity: number
  timestamp: Date
  reason: string
  chemicalName: string
  batchNumber: string
  performedBy: string
}
