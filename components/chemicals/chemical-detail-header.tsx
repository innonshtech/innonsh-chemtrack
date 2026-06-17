import { HazardBadge } from "@/components/ui/hazard-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QrCode, FileText, Edit, Archive, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ChemicalDetailHeaderProps {
  chemical: any // Using any for now to keep it flexible
  currentStock: number
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK"
}

export function ChemicalDetailHeader({ chemical, currentStock, status }: ChemicalDetailHeaderProps) {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-start md:justify-between mb-8">
      <div className="space-y-4">
        <Link href="/chemicals" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chemical List
        </Link>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{chemical.name}</h1>
            {status === "OUT_OF_STOCK" && <Badge variant="destructive">Out of Stock</Badge>}
            {status === "LOW_STOCK" && <Badge variant="outline" className="bg-warning/10 text-warning-foreground border-warning/20">Low Stock</Badge>}
            {status === "IN_STOCK" && <Badge variant="outline" className="bg-success/10 text-success border-success/20">In Stock</Badge>}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">CAS:</span>
              <span className="font-mono">{chemical.casNumber}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-foreground">Category:</span>
              <span>{chemical.category}</span>
            </div>
            <div className="flex items-center gap-1 border-l border-border pl-4">
              <span className="font-semibold text-foreground mr-1">Current Stock:</span>
              <span className="font-mono">{currentStock} {chemical.unitOfMeasure}</span>
            </div>
            <div className="flex items-center gap-1 border-l border-border pl-4">
              <HazardBadge hazard={chemical.hazardClass} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" className="h-9">
          <QrCode className="mr-2 h-4 w-4" />
          Generate QR
        </Button>
        <Button variant="outline" className="h-9">
          <FileText className="mr-2 h-4 w-4" />
          Download SDS
        </Button>
        <Button variant="outline" className="h-9">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="outline" className="h-9 text-destructive hover:bg-destructive/10 hover:text-destructive border-dashed">
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </Button>
      </div>
    </div>
  )
}
