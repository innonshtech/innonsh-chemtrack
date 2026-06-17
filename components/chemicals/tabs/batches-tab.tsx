import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface BatchesTabProps {
  batches: any[]
  unitOfMeasure: string
}

export function BatchesTab({ batches, unitOfMeasure }: BatchesTabProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Batch Number</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {batches.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No batches found.
              </TableCell>
            </TableRow>
          ) : (
            batches.map((batch) => {
              const isExpired = new Date(batch.expiryDate) < new Date()
              const isDepleted = batch.quantityRemaining <= 0

              return (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium font-mono">{batch.batchNumber}</TableCell>
                  <TableCell>{batch.supplier?.name || "N/A"}</TableCell>
                  <TableCell>{batch.warehouseLocation?.code || "Unassigned"}</TableCell>
                  <TableCell>
                    <span className={isExpired ? "text-destructive font-medium" : ""}>
                      {new Date(batch.expiryDate).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {batch.quantityRemaining} {unitOfMeasure}
                  </TableCell>
                  <TableCell>
                    {isDepleted ? (
                      <Badge variant="secondary">Depleted</Badge>
                    ) : isExpired ? (
                      <Badge variant="destructive">Expired</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
                    )}
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
