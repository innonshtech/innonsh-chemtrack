import { AddChemicalForm } from "@/components/chemicals/forms/add-chemical-form"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewChemicalPage() {
  return (
    <div className="flex-1 max-w-6xl mx-auto w-full pb-10 space-y-6">
      <div className="space-y-4 border-b pb-6">
        <Link href="/chemicals" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Inventory
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Add New Chemical</h2>
          <p className="text-muted-foreground">Follow the wizard to register a new chemical in the catalog and set compliance tracking rules.</p>
        </div>
      </div>

      <AddChemicalForm />
    </div>
  )
}
