import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Building2, Calendar, FileText, BadgeDollarSign } from "lucide-react"
import { POWorkflowStepper } from "@/components/purchase-orders/po-workflow-stepper"
import { POItemsTable } from "@/components/purchase-orders/po-items-table"
import { POApprovalTimeline } from "@/components/purchase-orders/po-approval-timeline"
import { POAttachmentsComments } from "@/components/purchase-orders/po-attachments-comments"
import { Badge } from "@/components/ui/badge"

interface PODetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PODetailPage({ params }: PODetailPageProps) {
  const { id } = await params

  const po = await db.purchaseOrder.findUnique({
    where: { id },
    include: {
      supplier: true,
      createdBy: true,
      items: {
        include: { chemical: true }
      }
    }
  })

  if (!po) {
    notFound()
  }

  const shortId = po.id.slice(0, 8).toUpperCase()
  const isCancelled = po.status === "CANCELLED"

  return (
    <div className="flex-1 max-w-6xl mx-auto w-full pb-10 space-y-8">
      
      {/* Header Profile */}
      <div className="space-y-6">
        <Link href="/purchase-orders" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Purchase Orders
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-card p-6 rounded-lg border shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight font-mono">PO-{shortId}</h2>
              {isCancelled ? (
                <Badge variant="destructive">CANCELLED</Badge>
              ) : (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {po.status.replace("_", " ")}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
              <Link href={`/suppliers/${po.supplier.id}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Building2 className="h-4 w-4" />
                <span className="font-medium text-foreground">{po.supplier.name}</span>
              </Link>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Created: {new Date(po.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Created By: {po.createdBy.name}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right bg-muted/30 p-4 rounded-md border border-dashed">
            <div className="flex items-center justify-end gap-2 text-muted-foreground mb-1">
              <BadgeDollarSign className="h-4 w-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Total Value</span>
            </div>
            <div className="text-3xl font-bold text-foreground">
              ₹{po.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Visual Stepper */}
      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Order Progress</h3>
        <POWorkflowStepper currentStatus={po.status} />
      </div>

      {/* Two-Column Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Items Table (Takes up 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-bold mb-4">Line Items</h3>
            <POItemsTable items={po.items} totalAmount={po.totalAmount} />
          </div>

          <POAttachmentsComments />
        </div>

        {/* Right Column: Timeline (Takes up 1/3) */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-lg border shadow-sm h-full">
            <POApprovalTimeline 
              status={po.status}
              createdAt={po.createdAt}
              expectedDelivery={po.expectedDelivery}
              createdBy={po.createdBy}
            />
          </div>
        </div>

      </div>

    </div>
  )
}
