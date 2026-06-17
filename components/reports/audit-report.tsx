"use client"

import { ReportTransaction } from "./types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AuditReportProps {
  transactions: ReportTransaction[]
}

export function AuditReport({ transactions }: AuditReportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Master Audit Trail</CardTitle>
        <CardDescription>Chronological log of all inventory movements and adjustments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Chemical</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No transactions recorded.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(t.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          t.type === "STOCK_IN" ? "bg-success/10 text-success border-success/20" :
                          t.type === "STOCK_OUT" ? "bg-primary/10 text-primary border-primary/20" :
                          "bg-warning/10 text-warning border-warning/20"
                        }
                      >
                        {t.type.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">{t.chemicalName}</TableCell>
                    <TableCell className="font-mono text-sm">{t.batchNumber}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {t.type === "STOCK_OUT" ? "-" : "+"}{t.quantity}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{t.performedBy}</TableCell>
                    <TableCell className="text-sm truncate max-w-[200px]" title={t.reason || ""}>
                      {t.reason || "-"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
