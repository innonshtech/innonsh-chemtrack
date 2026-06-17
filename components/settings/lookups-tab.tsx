"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Settings2 } from "lucide-react"

export function LookupsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Hazard Classes</CardTitle>
            <CardDescription>Global safety classifications for inventory items.</CardDescription>
          </div>
          <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2"/> Add Class</Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 pt-4">
            {["FLAMMABLE", "CORROSIVE", "TOXIC", "OXIDIZER", "EXPLOSIVE", "COMPRESSED_GAS", "NON_HAZARDOUS"].map(h => (
              <Badge key={h} variant="secondary" className="px-3 py-1 text-sm font-medium border cursor-pointer hover:bg-muted">
                {h.replace("_", " ")}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Chemical Categories</CardTitle>
            <CardDescription>Internal taxonomy for sorting laboratory materials.</CardDescription>
          </div>
          <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2"/> Add Category</Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 pt-4">
            {["Solvent", "Acid", "Salt", "Oxidizer", "Explosive", "Gas", "Base"].map(c => (
              <Badge key={c} variant="outline" className="px-3 py-1 text-sm font-medium cursor-pointer hover:bg-muted">
                {c}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg">Units of Measure</CardTitle>
            <CardDescription>Standardized quantitative units for inventory tracking.</CardDescription>
          </div>
          <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2"/> Add Unit</Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 pt-4">
            {["KG", "G", "MG", "L", "ML", "UNIT"].map(u => (
              <Badge key={u} variant="secondary" className="px-3 py-1 text-sm font-medium border cursor-pointer hover:bg-muted">
                {u}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
