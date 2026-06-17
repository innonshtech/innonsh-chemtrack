"use client"

import { useState } from "react"
import { ReportBatch, ReportTransaction } from "./types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ValuationReport } from "./valuation-report"
import { ExpiryReport } from "./expiry-report"
import { ConsumptionReport } from "./consumption-report"
import { AuditReport } from "./audit-report"
import { ReportsToolbar } from "./reports-toolbar"
import { DollarSign, Clock, Activity, FileText } from "lucide-react"

interface ReportsClientProps {
  batches: ReportBatch[]
  transactions: ReportTransaction[]
}

export function ReportsClient({ batches, transactions }: ReportsClientProps) {
  const [activeTab, setActiveTab] = useState("valuation")

  return (
    <div className="space-y-2">
      <ReportsToolbar 
        batches={batches} 
        transactions={transactions} 
        activeTab={activeTab} 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 h-auto p-1 bg-muted/50 border">
          <TabsTrigger value="valuation" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Valuation</span>
          </TabsTrigger>
          <TabsTrigger value="expiry" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Expiry Risk</span>
          </TabsTrigger>
          <TabsTrigger value="consumption" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Consumption</span>
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:shadow-sm">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Audit Log</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="valuation" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <ValuationReport batches={batches} />
        </TabsContent>

        <TabsContent value="expiry" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <ExpiryReport batches={batches} />
        </TabsContent>

        <TabsContent value="consumption" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <ConsumptionReport transactions={transactions} />
        </TabsContent>

        <TabsContent value="audit" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
          <AuditReport transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
