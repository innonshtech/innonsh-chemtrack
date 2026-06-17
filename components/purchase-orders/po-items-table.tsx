import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"

interface POItemsTableProps {
  items: {
    id: string
    quantity: number
    unitPrice: number
    chemical: {
      id: string
      name: string
      casNumber: string
      unitOfMeasure: string
    }
  }[]
  totalAmount: number
}

export function POItemsTable({ items, totalAmount }: POItemsTableProps) {
  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Chemical</TableHead>
            <TableHead>CAS Number</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Line Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const lineTotal = item.quantity * item.unitPrice
            return (
              <TableRow key={item.id}>
                <TableCell className="font-semibold text-primary">
                  <Link href={`/chemicals/${item.chemical.id}`} className="hover:underline">
                    {item.chemical.name}
                  </Link>
                </TableCell>
                <TableCell className="font-mono text-sm">{item.chemical.casNumber}</TableCell>
                <TableCell className="text-right">
                  {item.quantity} <span className="text-muted-foreground text-xs">{item.chemical.unitOfMeasure}</span>
                </TableCell>
                <TableCell className="text-right">
                  ₹{item.unitPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right font-medium">
                  ₹{lineTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow className="bg-muted/30">
            <TableCell colSpan={4} className="text-right font-bold uppercase text-sm">Total Order Value</TableCell>
            <TableCell className="text-right font-bold text-lg text-primary">
              ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
