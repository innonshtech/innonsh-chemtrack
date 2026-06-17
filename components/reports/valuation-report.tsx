"use client"

import { ReportBatch } from "./types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { DollarSign, Layers } from "lucide-react"

interface ValuationReportProps {
  batches: ReportBatch[]
}

const COLORS = ['#0f172a', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function ValuationReport({ batches }: ValuationReportProps) {
  
  // 1. Calculate Total Value
  const totalValue = batches.reduce((sum, b) => sum + (b.quantityRemaining * b.costPerUnit), 0)

  // 2. Calculate Value by Category
  const categoryMap = new Map<string, number>()
  batches.forEach(b => {
    const val = b.quantityRemaining * b.costPerUnit
    if (val > 0) {
      categoryMap.set(b.category, (categoryMap.get(b.category) || 0) + val)
    }
  })

  const categoryData = Array.from(categoryMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider opacity-80 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Total Inventory Valuation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              ₹{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm opacity-80 mt-1">Based on current on-hand quantities and recorded unit costs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Active Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{categoryData.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Distinct chemical classifications currently in stock.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Valuation by Category</CardTitle>
          <CardDescription>Financial distribution of your inventory across chemical classifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => `₹${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
