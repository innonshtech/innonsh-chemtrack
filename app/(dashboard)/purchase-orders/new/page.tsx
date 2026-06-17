"use client"

import { CreatePOForm } from "@/components/purchase-orders/forms/create-po-form"
import { Button } from "@/components/ui/button"
import { ChevronRight, Save, X, Send } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreatePOPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col h-full space-y-6 max-w-[1600px] mx-auto w-full pb-10">
      
      {/* Page Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-6">
        <div className="space-y-1">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
            <Link href="/purchase-orders" className="hover:text-foreground transition-colors">Purchase Orders</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">Create Purchase Order</span>
          </nav>
          
          <h1 className="text-2xl font-bold tracking-tight text-primary">Create Purchase Order</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Generate a purchase order for chemical procurement and inventory replenishment.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0 mt-2 sm:mt-0">
          <Button variant="outline" onClick={() => router.push('/purchase-orders')} className="h-11 px-6 bg-background text-foreground hover:bg-muted font-semibold transition-all">
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          
          <Button variant="secondary" className="h-11 px-6 font-semibold shadow-sm hover:shadow-md transition-all hidden sm:flex">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          
          <Button 
            type="submit" 
            form="create-po-form" 
            className="h-11 px-8 bg-primary hover:bg-[#174B5D] text-white shadow-sm hover:shadow-md hover:-translate-y-px transition-all font-semibold rounded-lg"
          >
            <Send className="mr-2 h-4 w-4" />
            Submit For Approval
          </Button>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1">
        <CreatePOForm />
      </div>
    </div>
  )
}
