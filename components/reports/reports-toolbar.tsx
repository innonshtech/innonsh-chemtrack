"use client"

import { Button } from "@/components/ui/button"
import { Download, FileText, FileSpreadsheet } from "lucide-react"
import { ReportBatch, ReportTransaction } from "./types"
import { toast } from "sonner"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface ReportsToolbarProps {
  batches: ReportBatch[]
  transactions: ReportTransaction[]
  activeTab: string
}

export function ReportsToolbar({ batches, transactions, activeTab }: ReportsToolbarProps) {

  const handleExportExcel = () => {
    try {
      const wb = XLSX.utils.book_new()

      if (activeTab === "valuation" || activeTab === "expiry") {
        const ws = XLSX.utils.json_to_sheet(batches.map(b => ({
          "Chemical": b.chemicalName,
          "Batch Number": b.batchNumber,
          "Category": b.category,
          "Hazard Class": b.hazardClass,
          "Quantity Remaining": b.quantityRemaining,
          "Cost Per Unit": b.costPerUnit,
          "Total Value": b.quantityRemaining * b.costPerUnit,
          "Expiry Date": new Date(b.expiryDate).toLocaleDateString(),
          "Supplier": b.supplierName,
          "Location": b.warehouseLocation
        })))
        XLSX.utils.book_append_sheet(wb, ws, "Inventory")
      } else {
        const ws = XLSX.utils.json_to_sheet(transactions.map(t => ({
          "Timestamp": new Date(t.timestamp).toLocaleString(),
          "Type": t.type,
          "Chemical": t.chemicalName,
          "Batch": t.batchNumber,
          "Quantity": t.quantity,
          "Performed By": t.performedBy,
          "Reason": t.reason
        })))
        XLSX.utils.book_append_sheet(wb, ws, "Transactions")
      }

      XLSX.writeFile(wb, `Chemtrack_Report_${activeTab}_${new Date().getTime()}.xlsx`)
      toast.success("Excel report downloaded successfully.")
    } catch (e) {
      toast.error("Failed to generate Excel report.")
      console.error(e)
    }
  }

  const handleExportPDF = () => {
    try {
      const doc = new jsPDF()
      
      // Header
      doc.setFontSize(20)
      doc.text(`Chemtrack Executive Report`, 14, 22)
      doc.setFontSize(11)
      doc.text(`Report Type: ${activeTab.toUpperCase()}`, 14, 30)
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36)

      if (activeTab === "valuation" || activeTab === "expiry") {
        const totalValue = batches.reduce((sum, b) => sum + (b.quantityRemaining * b.costPerUnit), 0)
        doc.text(`Total Inventory Value: ₹${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 14, 46)

        autoTable(doc, {
          startY: 54,
          head: [['Chemical', 'Batch', 'Qty', 'Unit Cost', 'Total Value']],
          body: batches.map(b => [
            b.chemicalName,
            b.batchNumber,
            b.quantityRemaining.toString(),
            `₹${b.costPerUnit.toFixed(2)}`,
            `₹${(b.quantityRemaining * b.costPerUnit).toFixed(2)}`
          ]),
        })
      } else {
        autoTable(doc, {
          startY: 46,
          head: [['Date', 'Type', 'Chemical', 'Batch', 'Qty', 'User']],
          body: transactions.map(t => [
            new Date(t.timestamp).toLocaleDateString(),
            t.type,
            t.chemicalName,
            t.batchNumber,
            t.quantity.toString(),
            t.performedBy
          ]),
        })
      }

      doc.save(`Chemtrack_Report_${activeTab}_${new Date().getTime()}.pdf`)
      toast.success("PDF report downloaded successfully.")
    } catch (e) {
      toast.error("Failed to generate PDF report.")
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-card p-4 rounded-lg border shadow-sm mb-6">
      
      <div className="text-sm font-medium text-muted-foreground mb-4 sm:mb-0">
        Showing all active data scopes across the laboratory.
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={handleExportPDF}>
          <FileText className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
        <Button variant="default" size="sm" onClick={handleExportExcel}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export Excel
        </Button>
      </div>

    </div>
  )
}
