import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { MapPin, Truck, Calendar, ArrowDownRight, ArrowUpRight, Activity } from "lucide-react"
import { BatchData } from "./columns"

interface BatchDetailDrawerProps {
  batch: BatchData | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BatchDetailDrawer({ batch, open, onOpenChange }: BatchDetailDrawerProps) {
  if (!batch) return null

  const isExpired = new Date(batch.expiryDate) < new Date()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between mt-4">
            <SheetTitle className="text-2xl">{batch.chemicalName}</SheetTitle>
            {batch.isFEFO && (
              <Badge className="bg-primary hover:bg-primary">Next To Use</Badge>
            )}
          </div>
          <SheetDescription className="flex items-center gap-2 text-base font-mono mt-1">
            Batch: {batch.batchNumber}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-8">
          {/* Status Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Quantity Remaining</p>
              <p className="text-xl font-semibold">{batch.quantityRemaining} <span className="text-sm font-normal text-muted-foreground">{batch.unitOfMeasure}</span></p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
              {isExpired ? (
                <Badge variant="destructive">Expired</Badge>
              ) : batch.quantityRemaining <= 0 ? (
                <Badge variant="secondary">Depleted</Badge>
              ) : (
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
              )}
            </div>
          </div>

          {/* Logistics */}
          <div className="space-y-4 rounded-lg border p-4 bg-muted/10">
            <h4 className="font-semibold flex items-center gap-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              Logistics
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Supplier</span>
                <span className="font-medium">{batch.supplierName || "Internal"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {batch.warehouseLocation}
                </span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t">
                <span className="text-muted-foreground">Manufactured</span>
                <span>{new Date(batch.manufactureDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Expires</span>
                <span className={isExpired ? "text-destructive font-bold" : "font-medium"}>
                  {new Date(batch.expiryDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Transaction History Timeline */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              Recent Transactions
            </h4>
            <div className="relative border-l border-muted ml-3 space-y-6">
              {batch.transactions?.length === 0 ? (
                <p className="text-sm text-muted-foreground pl-4">No transactions recorded.</p>
              ) : (
                batch.transactions?.slice(0, 5).map((tx, idx) => (
                  <div key={idx} className="relative pl-6">
                    <span className={`absolute -left-1.5 top-1 h-3 w-3 rounded-full border-2 border-background ${
                      tx.type === "STOCK_IN" ? "bg-success" : 
                      tx.type === "STOCK_OUT" ? "bg-warning" : "bg-muted-foreground"
                    }`} />
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-1.5">
                        {tx.type === "STOCK_IN" ? (
                          <ArrowDownRight className="h-4 w-4 text-success" />
                        ) : tx.type === "STOCK_OUT" ? (
                          <ArrowUpRight className="h-4 w-4 text-warning" />
                        ) : null}
                        <span className="text-sm font-medium">{tx.type.replace("_", " ")}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(tx.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-bold">{tx.type === "STOCK_IN" ? "+" : "-"}{tx.quantity}</span> {batch.unitOfMeasure}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      by {tx.performedBy?.name || "System"} {tx.reason ? `• ${tx.reason}` : ""}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
        </div>
      </SheetContent>
    </Sheet>
  )
}
