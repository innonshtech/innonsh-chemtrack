"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface Transaction {
  id: string
  timestamp: Date
  type: string
  quantity: number
  batch: {
    batchNumber: string
    chemical: {
      name: string
      unitOfMeasure: string
    }
  }
  performedBy: {
    name: string
  }
}

interface RecentTransactionsProps {
  transactions: Transaction[]
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Chemical</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Action</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No recent transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">
                  {format(new Date(tx.timestamp), "MMM d, HH:mm")}
                </TableCell>
                <TableCell>{tx.batch.chemical.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {tx.batch.batchNumber}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={tx.type === "STOCK_IN" ? "default" : "secondary"}
                    className={
                      tx.type === "STOCK_IN"
                        ? "bg-success/10 text-success hover:bg-success/20"
                        : "bg-warning/10 text-warning-foreground hover:bg-warning/20"
                    }
                  >
                    {tx.type.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {tx.type === "STOCK_IN" ? "+" : "-"}
                  {tx.quantity} {tx.batch.chemical.unitOfMeasure}
                </TableCell>
                <TableCell className="text-muted-foreground">{tx.performedBy.name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
