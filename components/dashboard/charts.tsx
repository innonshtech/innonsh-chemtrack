"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface CategoryData {
  category: string
  count: number
}

interface HazardData {
  hazardClass: string
  count: number
}

interface ChartsProps {
  categoryData: CategoryData[]
  hazardData: HazardData[]
}

// Dummy data for trends since we don't have historical snapshots in DB yet
const valueTrendData = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 14500 },
  { month: "Mar", value: 13200 },
  { month: "Apr", value: 16800 },
  { month: "May", value: 15400 },
  { month: "Jun", value: 18900 },
]

const movementTrendData = [
  { day: "Mon", stockIn: 400, stockOut: 240 },
  { day: "Tue", stockIn: 300, stockOut: 139 },
  { day: "Wed", stockIn: 200, stockOut: 980 },
  { day: "Thu", stockIn: 278, stockOut: 390 },
  { day: "Fri", stockIn: 189, stockOut: 480 },
  { day: "Sat", stockIn: 239, stockOut: 380 },
  { day: "Sun", stockIn: 349, stockOut: 430 },
]

const categoryColors = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"]

const chartConfig = {
  value: { label: "Value (₹)", color: "var(--color-primary)" },
  stockIn: { label: "Stock In", color: "var(--color-success)" },
  stockOut: { label: "Stock Out", color: "var(--color-warning)" },
  count: { label: "Count", color: "var(--color-primary)" }
} satisfies ChartConfig

export function DashboardCharts({ categoryData, hazardData }: ChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Inventory Value Trend</CardTitle>
          <CardDescription>6-month historical value</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <LineChart accessibilityLayer data={valueTrendData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} width={50} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="value" type="monotone" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stock Movements (7 Days)</CardTitle>
          <CardDescription>Inbound vs Outbound volume</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <BarChart accessibilityLayer data={movementTrendData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
              <Bar dataKey="stockIn" fill="var(--color-success)" radius={4} />
              <Bar dataKey="stockOut" fill="var(--color-warning)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Chemical Categories</CardTitle>
          <CardDescription>Distribution by category</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <PieChart margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={categoryData}
                dataKey="count"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hazard Class Distribution</CardTitle>
          <CardDescription>Active inventory hazards</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <BarChart layout="vertical" accessibilityLayer data={hazardData} margin={{ left: 12, right: 12, top: 12, bottom: 12 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="hazardClass" type="category" tickLine={false} axisLine={false} width={100} tickFormatter={(value) => value.replace("_", " ")} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-primary)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
