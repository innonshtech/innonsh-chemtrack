export interface WarehouseLocationPayload {
  id: string
  code: string
  zone: string
  rack: string
  shelf: string
  maxCapacity: number
  compatibleHazardClasses: string[]
  currentUtilization: number
  occupancyPercentage: number
  storedChemicalsCount: number
  chemicals: {
    id: string
    name: string
    hazardClass: string
    quantity: number
    unit: string
    batchCount: number
  }[]
  hasConflict: boolean
}
