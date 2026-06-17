import { CheckCircle2, Clock, Truck, FileSignature, Edit } from "lucide-react"

interface POApprovalTimelineProps {
  status: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED"
  createdAt: Date
  expectedDelivery: Date
  createdBy: { name: string }
}

export function POApprovalTimeline({ status, createdAt, expectedDelivery, createdBy }: POApprovalTimelineProps) {
  
  // Simulated timeline logic based on current status for visual completeness
  const isDraft = status === "DRAFT"
  const isPending = status === "PENDING_APPROVAL"
  const isApproved = ["APPROVED", "ORDERED", "RECEIVED"].includes(status)
  const isOrdered = ["ORDERED", "RECEIVED"].includes(status)
  const isReceived = status === "RECEIVED"
  const isCancelled = status === "CANCELLED"

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Workflow Timeline</h3>
      
      <div className="relative border-l-2 border-muted ml-3 space-y-8">
        
        {/* Creation Node */}
        <div className="relative pl-6">
          <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center ring-4 ring-background">
            <Edit className="h-3 w-3 text-primary-foreground" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Draft Created</span>
            <span className="text-xs text-muted-foreground">{new Date(createdAt).toLocaleString()}</span>
            <span className="text-xs text-muted-foreground mt-1">By {createdBy.name}</span>
          </div>
        </div>

        {/* Approval Node */}
        {status !== "DRAFT" && (
          <div className="relative pl-6">
            <span className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-background
              ${isCancelled ? "bg-destructive" : isApproved ? "bg-success" : "bg-warning"}`}>
              {isCancelled ? <CheckCircle2 className="h-3 w-3 text-destructive-foreground" /> : 
               isApproved ? <CheckCircle2 className="h-3 w-3 text-success-foreground" /> : 
               <Clock className="h-3 w-3 text-warning-foreground" />}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {isCancelled ? "Approval Rejected" : isApproved ? "Management Approved" : "Pending Approval"}
              </span>
              {isApproved && (
                <span className="text-xs text-muted-foreground">Authorized by System Admin</span>
              )}
            </div>
          </div>
        )}

        {/* Ordered Node */}
        {isApproved && (
          <div className="relative pl-6">
            <span className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-background
              ${isOrdered ? "bg-primary" : "bg-muted"}`}>
              <FileSignature className={`h-3 w-3 ${isOrdered ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </span>
            <div className="flex flex-col">
              <span className={`text-sm font-semibold ${!isOrdered && "text-muted-foreground"}`}>
                Purchase Order Sent to Vendor
              </span>
              {isOrdered && (
                <span className="text-xs text-muted-foreground">Emailed automatically</span>
              )}
            </div>
          </div>
        )}

        {/* Expected Delivery / Received Node */}
        {(isOrdered || isReceived) && (
          <div className="relative pl-6">
            <span className={`absolute -left-[11px] top-1 h-5 w-5 rounded-full flex items-center justify-center ring-4 ring-background
              ${isReceived ? "bg-success" : "bg-muted"}`}>
              <Truck className={`h-3 w-3 ${isReceived ? "text-success-foreground" : "text-muted-foreground"}`} />
            </span>
            <div className="flex flex-col">
              <span className={`text-sm font-semibold ${!isReceived && "text-muted-foreground"}`}>
                {isReceived ? "Inventory Received" : "Expected Delivery"}
              </span>
              <span className={`text-xs ${isReceived ? "text-success" : "text-muted-foreground"}`}>
                {new Date(expectedDelivery).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
