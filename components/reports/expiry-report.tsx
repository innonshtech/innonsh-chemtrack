"use client"

import { ReportBatch } from "./types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from "recharts"
import { AlertOctagon, Clock } from "lucide-react"

interface ExpiryReportProps {
  batches: ReportBatch[]
}

export function ExpiryReport({ batches }: ExpiryReportProps) {
  
  const today = new Date()
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(today.getDate() + 30)

  // 1. KPI Calculations
  let expiredValue = 0
  let atRiskValue = 0

  // 2. Bar Chart Data (Group by Month for the next 12 months)
  const monthMap = new Map<string, number>()
  
  // Initialize next 12 months with 0
  for (let i = 0; i < 12; i++) {
    const d = new Date()
    d.setMonth(today.getMonth() + i)
    const label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
    monthMap.set(label, 0)
  }

  batches.forEach(b => {
    const val = b.quantityRemaining * b.costPerUnit
    if (val === 0) return

    const expiry = new Date(b.expiryDate)
    
    if (expiry < today) {
      expiredValue += val
    } else if (expiry <= thirtyDaysFromNow) {
      atRiskValue += val
    }

    // Add to chart if within next 12 months
    const label = expiry.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
    if (monthMap.has(label)) {
      monthMap.set(label, monthMap.get(label)! + val)
    }
  })

  const chartData = Array.from(monthMap.entries()).map(([month, value]) => ({ month, value }))

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-destructive text-destructive-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider opacity-90 flex items-center gap-2">
              <AlertOctagon className="h-4 w-4" />
              Sunk Cost (Expired Inventory)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              ₹{expiredValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm opacity-90 mt-1">Financial value lost to expired, unsable materials.</p>
          </CardContent>
        </Card>

        <Card className="bg-warning text-warning-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider opacity-90 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Value At Risk (&lt; 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              ₹{atRiskValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm opacity-90 mt-1">Value of active inventory expiring within the next 30 days.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expiration Projection (Next 12 Months)</CardTitle>
          <CardDescription>Forecasted financial value of inventory scheduled to expire by month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(val) => `₹${val}`}
                />
                <RechartsTooltip 
                  cursor={{ fill: 'transparent' }}
                  formatter={(value: number) => [`₹${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 'Expiring Value']}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 || index === 1 ? "#f59e0b" : "#3b82f6"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
