"use client"

import { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { BasicInfoStep } from "./steps/basic-info-step"
import { HazardInfoStep } from "./steps/hazard-info-step"
import { InventorySettingsStep } from "./steps/inventory-settings-step"
import { DocumentsStep } from "./steps/documents-step"
import { SidebarSummary } from "./sidebar-summary"
import { ChevronRight, ChevronLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  casNumber: z.string().min(5, "Valid CAS number is required"),
  category: z.string().min(2, "Category is required"),
  description: z.string().optional(),
  hazardClass: z.string().min(1, "Hazard class is required"),
  storageCondition: z.string().min(5, "Storage conditions are required"),
  safetyNotes: z.string().optional(),
  unitOfMeasure: z.string().min(1, "Unit of measure is required"),
  reorderLevel: z.number().min(0, "Must be positive"),
  minimumStock: z.number().min(0),
})

const steps = [
  { id: "basic", title: "Basic Info", fields: ["name", "casNumber", "category"] },
  { id: "hazard", title: "Hazards", fields: ["hazardClass", "storageCondition"] },
  { id: "inventory", title: "Inventory", fields: ["unitOfMeasure", "reorderLevel"] },
  { id: "docs", title: "Documents", fields: [] }
]

export function AddChemicalForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      casNumber: "",
      category: "",
      description: "",
      hazardClass: "",
      storageCondition: "",
      safetyNotes: "",
      unitOfMeasure: "L",
      reorderLevel: 10,
      minimumStock: 0,
    },
    mode: "onChange"
  })

  const formData = useWatch({ control: form.control })

  const nextStep = async () => {
    const fieldsToValidate = steps[currentStep].fields as Array<keyof z.infer<typeof formSchema>>
    const isStepValid = await form.trigger(fieldsToValidate)
    
    if (isStepValid) {
      setCurrentStep(s => Math.min(s + 1, steps.length - 1))
    }
  }

  const prevStep = () => setCurrentStep(s => Math.max(s - 1, 0))

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // In a real app, this would POST to /api/chemicals
    console.log("Submitting:", values)
    toast.success("Chemical created successfully!")
    router.push("/chemicals")
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Main Form Area */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Progress Indicator */}
        <div className="flex justify-between border-b pb-4">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className={`h-2 w-full rounded-full ${idx <= currentStep ? 'bg-primary' : 'bg-muted'}`} />
              <span className={`text-xs mt-2 font-medium ${idx === currentStep ? 'text-primary' : 'text-muted-foreground'}`}>
                Step {idx + 1}: {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Form Body */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="min-h-[350px]">
              {currentStep === 0 && <BasicInfoStep form={form} />}
              {currentStep === 1 && <HazardInfoStep form={form} />}
              {currentStep === 2 && <InventorySettingsStep form={form} />}
              {currentStep === 3 && <DocumentsStep />}
            </div>

            {/* Form Actions Footer */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => router.push("/chemicals")}>
                Cancel
              </Button>
              
              <div className="flex items-center gap-2">
                <Button type="button" variant="secondary" className="hidden sm:flex" onClick={() => toast.info("Draft saved locally.")}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>

                {currentStep > 0 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                )}

                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit">
                    Create Chemical
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>

      {/* Sidebar Area */}
      <div className="lg:col-span-1">
        <SidebarSummary formData={formData} />
      </div>
    </div>
  )
}
