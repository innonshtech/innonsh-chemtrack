"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { HazardBadge } from "@/components/ui/hazard-badge"
import Link from "next/link"

interface SupplierRelationsTabsProps {
  purchaseOrders: any[]
  chemicals: any[]
}

export function SupplierRelationsTabs({ purchaseOrders, chemicals }: SupplierRelationsTabsProps) {
  return (
    <Tabs defaultValue="po" className="w-full mt-8">
      <div className="border-b border-border mb-6">
        <TabsList className="bg-transparent p-0 justify-start w-full overflow-x-auto h-auto rounded-none pb-px">
          <TabsTrigger 
            value="po" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
          >
            Purchase History
          </TabsTrigger>
          <TabsTrigger 
            value="chemicals" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3"
          >
            Chemical Catalog
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="po" className="mt-0 outline-none">
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Expected Delivery</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">No purchase orders found.</TableCell>
                </TableRow>
              ) : (
                purchaseOrders.map((po) => (
                  <TableRow key={po.id}>
                    <TableCell className="font-medium font-mono text-sm">{po.id.slice(0,8).toUpperCase()}</TableCell>
                    <TableCell>{new Date(po.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(po.expectedDelivery).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{po.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        po.status === "RECEIVED" ? "bg-success/10 text-success border-success/20" :
                        po.status === "CANCELLED" ? "bg-destructive/10 text-destructive border-destructive/20" :
                        "bg-warning/10 text-warning-foreground border-warning/20"
                      }>
                        {po.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      <TabsContent value="chemicals" className="mt-0 outline-none">
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chemical Name</TableHead>
                <TableHead>CAS Number</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Hazard Class</TableHead>
                <TableHead className="text-right">Total Batches Supplied</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chemicals.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">No chemical relationships found.</TableCell>
                </TableRow>
              ) : (
                chemicals.map((chem) => (
                  <TableRow key={chem.id}>
                    <TableCell className="font-semibold text-primary">
                      <Link href={`/chemicals/${chem.id}`} className="hover:underline">
                        {chem.name}
                      </Link>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{chem.casNumber}</TableCell>
                    <TableCell>{chem.category}</TableCell>
                    <TableCell>
                      <HazardBadge hazard={chem.hazardClass} />
                    </TableCell>
                    <TableCell className="text-right font-medium">{chem.batchCount}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  )
}
