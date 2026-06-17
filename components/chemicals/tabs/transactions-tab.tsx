import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TransactionsTabProps {
  transactions: any[]
  unitOfMeasure: string
}

export function TransactionsTab({ transactions, unitOfMeasure }: TransactionsTabProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No transactions found for this chemical.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">
                  {new Date(tx.timestamp).toLocaleString(undefined, {
                    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                  })}
                </TableCell>
                <TableCell className="font-mono text-sm">{tx.batch?.batchNumber}</TableCell>
                <TableCell>
                  <Badge
                    variant={tx.type === "STOCK_IN" ? "default" : tx.type === "STOCK_OUT" ? "secondary" : "outline"}
                    className={
                      tx.type === "STOCK_IN"
                        ? "bg-success/10 text-success hover:bg-success/20"
                        : tx.type === "STOCK_OUT"
                        ? "bg-warning/10 text-warning-foreground hover:bg-warning/20"
                        : ""
                    }
                  >
                    {tx.type.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{tx.performedBy?.name}</TableCell>
                <TableCell className="text-right font-medium">
                  {tx.type === "STOCK_IN" ? "+" : "-"}
                  {tx.quantity} {unitOfMeasure}
                </TableCell>
                <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                  {tx.reason || "-"}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
