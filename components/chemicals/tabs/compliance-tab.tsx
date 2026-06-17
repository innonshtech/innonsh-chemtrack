import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HazardBadge } from "@/components/ui/hazard-badge"
import { ShieldAlert, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ComplianceTabProps {
  chemical: any
}

export function ComplianceTab({ chemical }: ComplianceTabProps) {
  // Generate some generic compliance rules based on hazard class for demo purposes
  const getComplianceRules = (hazard: string) => {
    switch (hazard) {
      case "FLAMMABLE":
        return [
          "Store in approved flammable storage cabinets.",
          "Keep away from sources of ignition, heat, and open flames.",
          "Ensure adequate ventilation in storage area to prevent vapor accumulation.",
          "Must not be stored alongside strong oxidizers."
        ]
      case "CORROSIVE":
        return [
          "Store below eye level to prevent face/eye exposure in case of spills.",
          "Use secondary containment for all liquid corrosives.",
          "Segregate acids from bases.",
          "Segregate inorganic acids from organic acids."
        ]
      case "TOXIC":
        return [
          "Keep container tightly closed and locked up.",
          "Store in a well-ventilated place.",
          "Only handle under a certified fume hood.",
          "Wear appropriate PPE (nitrile gloves, splash goggles) at all times."
        ]
      case "OXIDIZER":
        return [
          "Keep away from combustible materials.",
          "Store away from reducing agents and organics.",
          "Do not store on wooden shelves."
        ]
      default:
        return [
          "Follow standard laboratory safety procedures.",
          "Refer to the specific Safety Data Sheet (SDS) for detailed handling instructions."
        ]
    }
  }

  const rules = getComplianceRules(chemical.hazardClass)

  return (
    <div className="space-y-6">
      {chemical.hazardClass !== "NON_HAZARDOUS" && (
        <Alert variant="destructive" className="bg-destructive/5">
          <ShieldAlert className="h-4 w-4" />
          <AlertTitle>Strict Compliance Required</AlertTitle>
          <AlertDescription>
            This chemical is classified as <span className="font-bold">{chemical.hazardClass.replace("_", " ")}</span>. 
            Failure to adhere to the handling and storage requirements may result in severe safety incidents.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hazard Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-muted-foreground">Primary Hazard Class</span>
              <HazardBadge hazard={chemical.hazardClass} />
            </div>
            <div className="py-2">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                Required PPE
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-muted px-2 py-1 rounded">Safety Goggles</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">Lab Coat</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">Nitrile Gloves</span>
                {chemical.hazardClass === "TOXIC" && (
                  <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">Fume Hood</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 list-disc pl-4">
              {rules.map((rule, idx) => (
                <li key={idx} className="text-sm">{rule}</li>
              ))}
              <li className="text-sm font-medium mt-4 pt-4 border-t text-muted-foreground">
                Base condition: {chemical.storageCondition}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
