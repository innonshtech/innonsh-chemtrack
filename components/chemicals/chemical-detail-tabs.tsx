"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OverviewTab } from "./tabs/overview-tab"
import { BatchesTab } from "./tabs/batches-tab"
import { TransactionsTab } from "./tabs/transactions-tab"
import { DocumentsTab } from "./tabs/documents-tab"
import { ComplianceTab } from "./tabs/compliance-tab"

interface ChemicalDetailTabsProps {
  chemical: any
  currentStock: number
  suppliers: string[]
}

export function ChemicalDetailTabs({ chemical, currentStock, suppliers }: ChemicalDetailTabsProps) {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="border-b border-border mb-6">
        <TabsList className="bg-transparent p-0 justify-start w-full overflow-x-auto h-auto rounded-none pb-px">
          <TabsTrigger 
            value="overview" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="batches" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
          >
            Batches
          </TabsTrigger>
          <TabsTrigger 
            value="transactions" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
          >
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="compliance" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
          >
            Compliance
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview" className="mt-0 outline-none">
        <OverviewTab chemical={chemical} currentStock={currentStock} suppliers={suppliers} />
      </TabsContent>

      <TabsContent value="batches" className="mt-0 outline-none">
        <BatchesTab batches={chemical.batches || []} unitOfMeasure={chemical.unitOfMeasure} />
      </TabsContent>

      <TabsContent value="transactions" className="mt-0 outline-none">
        {/* We flatten transactions from batches for the chemical */}
        <TransactionsTab 
          transactions={chemical.batches?.flatMap((b: any) => b.transactions).sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()) || []} 
          unitOfMeasure={chemical.unitOfMeasure} 
        />
      </TabsContent>

      <TabsContent value="documents" className="mt-0 outline-none">
        <DocumentsTab chemicalName={chemical.name} sdsFileUrl={chemical.sdsFileUrl} />
      </TabsContent>

      <TabsContent value="compliance" className="mt-0 outline-none">
        <ComplianceTab chemical={chemical} />
      </TabsContent>
    </Tabs>
  )
}
