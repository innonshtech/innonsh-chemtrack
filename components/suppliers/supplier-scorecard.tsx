import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, FlaskConical, Layers } from "lucide-react"

interface SupplierScorecardProps {
  totalSpend: number
  activeOrdersCount: number
  totalBatchesCount: number
  uniqueChemicalsCount: number
}

export function SupplierScorecard({
  totalSpend,
  activeOrdersCount,
  totalBatchesCount,
  uniqueChemicalsCount
}: SupplierScorecardProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Lifetime Spend</CardTitle>
          <DollarSign className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <p className="text-xs text-muted-foreground mt-1">Total value of all received POs</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeOrdersCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Pending and incoming deliveries</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Batches Supplied</CardTitle>
          <Layers className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBatchesCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Total lifetime batches received</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Unique Chemicals</CardTitle>
          <FlaskConical className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueChemicalsCount}</div>
          <p className="text-xs text-muted-foreground mt-1">Different chemicals cataloged</p>
        </CardContent>
      </Card>
    </div>
  )
}
