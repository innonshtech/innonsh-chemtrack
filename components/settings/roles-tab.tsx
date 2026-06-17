"use client"
import React from "react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X } from "lucide-react"

const ACTIONS = [
  { group: "System", name: "Manage Users & Roles" },
  { group: "System", name: "Configure Hazard Classes" },
  { group: "Procurement", name: "Create Purchase Orders" },
  { group: "Procurement", name: "Approve Purchase Orders" },
  { group: "Procurement", name: "Receive Inventory" },
  { group: "Inventory", name: "Edit Chemical Catalog" },
  { group: "Inventory", name: "Issue Stock (Stock Out)" },
  { group: "Inventory", name: "Inventory Adjustments" },
  { group: "Reports", name: "View Executive Dashboards" },
  { group: "Reports", name: "Export Financial Data" },
]

// Mock logic for demonstrating the permission matrix visually
const hasPermission = (role: string, action: string) => {
  if (role === "SUPER_ADMIN") return true;
  
  if (role === "ADMIN") {
    if (action === "Manage Users & Roles") return false;
    return true;
  }
  
  if (role === "MANAGER") {
    if (action.includes("System") || action === "Approve Purchase Orders" || action === "Export Financial Data") return false;
    return true;
  }

  // USER role
  if (action === "Create Purchase Orders" || action === "Issue Stock (Stock Out)" || action === "Receive Inventory") return true;
  return false;
}

const ROLES = ["SUPER_ADMIN", "ADMIN", "MANAGER", "USER"]

export function RolesTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Permission Matrix</CardTitle>
        <CardDescription>Configure Role-Based Access Controls (RBAC) across system modules.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[300px]">System Action</TableHead>
                {ROLES.map(r => (
                  <TableHead key={r} className="text-center font-semibold text-primary">
                    {r.replace("_", " ")}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ACTIONS.map((action, idx) => {
                const showGroupHeader = idx === 0 || ACTIONS[idx-1].group !== action.group;
                
                return (
                  <React.Fragment key={action.name}>
                    {showGroupHeader && (
                      <TableRow className="bg-muted/20">
                        <TableCell colSpan={5} className="font-bold text-xs uppercase tracking-wider text-muted-foreground pt-4 pb-2">
                          {action.group} Module
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="font-medium pl-6">{action.name}</TableCell>
                      {ROLES.map(r => {
                        const granted = hasPermission(r, action.name)
                        return (
                          <TableCell key={r} className="text-center">
                            {granted ? (
                              <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
                                <Check className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 text-destructive/40">
                                <X className="h-4 w-4" />
                              </div>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
