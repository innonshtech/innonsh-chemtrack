import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import QRCode from "react-qr-code"

interface OverviewTabProps {
  chemical: any
  currentStock: number
  suppliers: string[]
}

export function OverviewTab({ chemical, currentStock, suppliers }: OverviewTabProps) {
  const qrData = JSON.stringify({
    id: chemical.id,
    cas: chemical.casNumber,
    name: chemical.name,
  })

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Inventory Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inventory Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Current Stock</span>
                <span className="font-semibold">{currentStock} {chemical.unitOfMeasure}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Reorder Level</span>
                <span className="font-semibold">{chemical.reorderLevel} {chemical.unitOfMeasure}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Batches</span>
                <span className="font-semibold">{chemical.batches?.filter((b: any) => b.quantityRemaining > 0).length || 0}</span>
              </div>
            </CardContent>
          </Card>

          {/* Storage Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Storage Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Required Conditions</h4>
                <p className="text-sm font-medium">{chemical.storageCondition}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Locations</h4>
                <div className="flex flex-wrap gap-2">
                  {/* Derive unique locations from active batches */}
                  {Array.from(new Set(chemical.batches?.filter((b: any) => b.quantityRemaining > 0 && b.warehouseLocation?.code).map((b: any) => b.warehouseLocation.code))).map((loc: any) => (
                    <span key={loc} className="px-2 py-1 bg-muted rounded text-xs font-mono">{loc}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suppliers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Associated Suppliers</CardTitle>
          </CardHeader>
          <CardContent>
            {suppliers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No active suppliers for this chemical.</p>
            ) : (
              <ul className="space-y-3">
                {suppliers.map((s, i) => (
                  <li key={i} className="flex justify-between items-center p-3 border rounded-md">
                    <span className="font-medium">{s}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Approved Vendor</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1">
        {/* QR Code Card */}
        <Card className="sticky top-6">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg">QR Label Preview</CardTitle>
            <CardDescription>Scan to access chemical details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 pt-2">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-border mb-4">
              <QRCode
                value={qrData}
                size={160}
                level="M"
              />
            </div>
            <div className="w-full space-y-1 text-center">
              <p className="font-bold text-lg">{chemical.name}</p>
              <p className="font-mono text-sm text-muted-foreground">{chemical.casNumber}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
