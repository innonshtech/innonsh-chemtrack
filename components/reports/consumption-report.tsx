"use client"

import { ReportTransaction } from "./types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { Activity, FlaskConical } from "lucide-react"

interface ConsumptionReportProps {
  transactions: ReportTransaction[]
}

export function ConsumptionReport({ transactions }: ConsumptionReportProps) {
  
  // Filter for only STOCK_OUT
  const stockOuts = transactions.filter(t => t.type === "STOCK_OUT")

  // 1. KPIs
  const totalConsumed = stockOuts.reduce((sum, t) => sum + t.quantity, 0)
  const uniqueChemicalsConsumed = new Set(stockOuts.map(t => t.chemicalName)).size

  // 2. Line Chart Data (Group by Day for the last 30 days)
  const today = new Date()
  const dayMap = new Map<string, number>()
  
  // Initialize last 30 days with 0
  for (let i = 29; i >= 0; i--) {
    const d = new Date()
    d.setDate(today.getDate() - i)
    const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    dayMap.set(label, 0)
  }

  stockOuts.forEach(t => {
    const d = new Date(t.timestamp)
    const diffTime = Math.abs(today.getTime() - d.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays <= 30) {
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      if (dayMap.has(label)) {
        dayMap.set(label, dayMap.get(label)! + t.quantity)
      }
    }
  })

  const chartData = Array.from(dayMap.entries()).map(([date, quantity]) => ({ date, quantity }))

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider opacity-90 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Total Volume Consumed (30D)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {totalConsumed.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm opacity-90 mt-1">Aggregate units pulled from inventory over the last 30 days.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FlaskConical className="h-4 w-4" />
              Distinct Chemicals Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{uniqueChemicalsConsumed}</div>
            <p className="text-sm text-muted-foreground mt-1">Unique chemical profiles active in recent lab operations.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Consumption Velocity (Last 30 Days)</CardTitle>
          <CardDescription>Daily volume of chemical units dispensed for laboratory usage.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }}
                  minTickGap={20}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`${Number(value).toLocaleString()} units`, 'Consumed']}
                />
                <Line 
                  type="monotone" 
                  dataKey="quantity" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: "#3b82f6" }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
