"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConical, Layers, IndianRupee, AlertTriangle, Clock, ShoppingCart } from "lucide-react"

interface KPICardsProps {
  totalChemicals: number
  activeBatches: number
  inventoryValue: number
  lowStockItems: number
  expiringIn30Days: number
  openPurchaseOrders: number
}

export function KPICards({
  totalChemicals,
  activeBatches,
  inventoryValue,
  lowStockItems,
  expiringIn30Days,
  openPurchaseOrders,
}: KPICardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Chemicals</CardTitle>
          <FlaskConical className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalChemicals}</div>
          <p className="text-xs text-muted-foreground">Unique catalog items</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Batches</CardTitle>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeBatches}</div>
          <p className="text-xs text-muted-foreground">With quantity {">"} 0</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(inventoryValue)}</div>
          <p className="text-xs text-muted-foreground">Total cost of active stock</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          <AlertTriangle className={`h-4 w-4 ${lowStockItems > 0 ? "text-warning" : "text-muted-foreground"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${lowStockItems > 0 ? "text-warning" : ""}`}>{lowStockItems}</div>
          <p className="text-xs text-muted-foreground">Items below reorder level</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          <Clock className={`h-4 w-4 ${expiringIn30Days > 0 ? "text-destructive" : "text-muted-foreground"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${expiringIn30Days > 0 ? "text-destructive" : ""}`}>{expiringIn30Days}</div>
          <p className="text-xs text-muted-foreground">Batches expiring in {'<'} 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Purchase Orders</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{openPurchaseOrders}</div>
          <p className="text-xs text-muted-foreground">Awaiting delivery</p>
        </CardContent>
      </Card>
    </div>
  )
}
