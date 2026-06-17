import { Check } from "lucide-react"

interface POWorkflowStepperProps {
  currentStatus: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "ORDERED" | "RECEIVED" | "CANCELLED"
}

const STEPS = [
  { key: "DRAFT", label: "Draft" },
  { key: "PENDING_APPROVAL", label: "Pending Approval" },
  { key: "APPROVED", label: "Approved" },
  { key: "ORDERED", label: "Ordered" },
  { key: "RECEIVED", label: "Received" }
]

export function POWorkflowStepper({ currentStatus }: POWorkflowStepperProps) {
  if (currentStatus === "CANCELLED") {
    return (
      <div className="w-full py-4 border-y border-destructive/20 bg-destructive/5 text-destructive font-semibold flex items-center justify-center">
        This Purchase Order has been Cancelled.
      </div>
    )
  }

  const currentIndex = STEPS.findIndex(s => s.key === currentStatus)

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between relative max-w-4xl mx-auto">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full z-0" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500 ease-in-out" 
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          
          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center gap-2 bg-background px-2">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors duration-300
                  ${isCompleted ? "bg-primary border-primary text-primary-foreground" : 
                    isCurrent ? "bg-background border-primary text-primary ring-4 ring-primary/20" : 
                    "bg-background border-muted text-muted-foreground"}`}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span className={`text-sm font-medium ${isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
