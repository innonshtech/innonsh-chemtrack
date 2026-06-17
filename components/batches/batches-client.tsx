"use client"

import { useState } from "react"
import { columns, BatchData } from "@/components/batches/columns"
import { BatchDataTable } from "@/components/batches/batch-data-table"
import { BatchDetailDrawer } from "@/components/batches/batch-detail-drawer"

interface BatchesClientProps {
  data: BatchData[]
}

export function BatchesClient({ data }: BatchesClientProps) {
  const [selectedBatch, setSelectedBatch] = useState<BatchData | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleRowClick = (batch: BatchData) => {
    setSelectedBatch(batch)
    setIsDrawerOpen(true)
  }

  return (
    <>
      <BatchDataTable columns={columns} data={data} onRowClick={handleRowClick} />
      <BatchDetailDrawer 
        batch={selectedBatch} 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </>
  )
}
