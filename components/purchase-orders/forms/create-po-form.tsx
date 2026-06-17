"use client"

import { useState, useEffect } from "react"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UploadCloud, CheckCircle2, ShieldAlert, FileText, Loader2, Plus, Trash2, Copy, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Mock Data
const MOCK_SUPPLIERS = [
  { id: "s1", name: "ChemSupply Inc", contact: "John Doe", type: "Distributor" },
  { id: "s2", name: "Global Labs", contact: "Jane Smith", type: "Manufacturer" },
]

const MOCK_CHEMICALS = [
  { id: "c1", name: "Acetone", casNumber: "67-64-1", hazardClass: "Flammable", unit: "L", price: 15.00, stock: 50, reorder: 100 },
  { id: "c2", name: "Sulfuric Acid", casNumber: "7664-93-9", hazardClass: "Corrosive", unit: "L", price: 25.00, stock: 200, reorder: 50 },
  { id: "c3", name: "Sodium Cyanide", casNumber: "143-33-9", hazardClass: "Toxic", unit: "kg", price: 120.00, stock: 5, reorder: 20 },
]

// Zod Schema
const poItemSchema = z.object({
  chemicalId: z.string().min(1, "Chemical is required"),
  quantity: z.number().min(1, "Quantity must be > 0"),
  unitPrice: z.number().min(0, "Price cannot be negative"),
  taxPercent: z.number().min(0).max(100),
})

const poFormSchema = z.object({
  poNumber: z.string(),
  poDate: z.string().min(1, "Date is required"),
  expectedDeliveryDate: z.string().min(1, "Delivery Date is required"),
  supplierId: z.string().min(1, "Supplier is required"),
  supplierContact: z.string(),
  paymentTerms: z.string().min(1, "Payment terms required"),
  deliveryTerms: z.string().min(1, "Delivery terms required"),
  warehouseDestination: z.string().min(1, "Warehouse required"),
  items: z.array(poItemSchema).min(1, "At least one item is required"),
  internalNotes: z.string().optional(),
  supplierNotes: z.string().optional(),
  termsAndConditions: z.string().optional(),
})

export function CreatePOForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const form = useForm<z.infer<typeof poFormSchema>>({
    resolver: zodResolver(poFormSchema),
    defaultValues: {
      poNumber: "PO-" + Math.floor(100000 + Math.random() * 900000),
      poDate: new Date().toISOString().split('T')[0],
      expectedDeliveryDate: "",
      supplierId: "",
      supplierContact: "",
      paymentTerms: "Net 30",
      deliveryTerms: "FOB",
      warehouseDestination: "Main Warehouse (WH-01)",
      items: [{ chemicalId: "", quantity: 1, unitPrice: 0, taxPercent: 0 }],
      internalNotes: "",
      supplierNotes: "",
      termsAndConditions: "Standard corporate purchasing terms apply.",
    },
    mode: "onChange"
  })

  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: "items"
  })

  // Watchers for dynamic UI
  const watchedItems = useWatch({ control: form.control, name: "items" })
  const selectedSupplierId = useWatch({ control: form.control, name: "supplierId" })

  const selectedSupplier = MOCK_SUPPLIERS.find(s => s.id === selectedSupplierId)

  // Calculations
  const subtotal = watchedItems.reduce((acc, item) => acc + ((item.quantity || 0) * (item.unitPrice || 0)), 0)
  const taxTotal = watchedItems.reduce((acc, item) => {
    const itemTotal = (item.quantity || 0) * (item.unitPrice || 0)
    return acc + (itemTotal * ((item.taxPercent || 0) / 100))
  }, 0)
  const shipping = 50.00 // Mock shipping
  const discount = 0.00
  const totalAmount = subtotal + taxTotal + shipping - discount

  // Hazard Logic
  const selectedChemicalDetails = watchedItems.map(item => MOCK_CHEMICALS.find(c => c.id === item.chemicalId)).filter(Boolean)
  const hasLowStock = selectedChemicalDetails.some(c => c && c.stock < c.reorder)
  const hasToxic = selectedChemicalDetails.some(c => c && c.hazardClass === "Toxic")
  const hasFlammable = selectedChemicalDetails.some(c => c && c.hazardClass === "Flammable")

  const onSubmit = async (values: z.infer<typeof poFormSchema>) => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log("Submitting PO:", values)
    toast.success("Purchase Order submitted for approval!")
    setIsSubmitting(false)
    router.push("/purchase-orders")
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val)
  }

  const getHazardBadgeColor = (hazard: string) => {
    switch(hazard) {
      case 'Flammable': return 'bg-orange-500/10 text-orange-600 border-orange-500/20'
      case 'Corrosive': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
      case 'Toxic': return 'bg-red-500/10 text-red-600 border-red-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  if (!mounted) return null

  return (
    <Form {...form}>
      <form id="create-po-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-12">
        
        {/* Left Main Area (75%) */}
        <div className="lg:col-span-9 space-y-8 relative">
          
          {isSubmitting && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm font-medium text-primary">Processing Order...</span>
              </div>
            </div>
          )}

          {/* Warning Banners */}
          <div className="space-y-2">
            {hasLowStock && (
              <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 text-warning-foreground rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="text-sm font-medium">You have selected items that are currently below their reorder levels. Expedited shipping is recommended.</span>
              </div>
            )}
            {hasToxic && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg">
                <ShieldAlert className="h-5 w-5 text-destructive" />
                <span className="text-sm font-medium">Highly Toxic chemicals selected. Ensure compliance documentation is attached before approval.</span>
              </div>
            )}
          </div>

          {/* SECTION 1: PO DETAILS */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg font-semibold text-primary">1. Purchase Order Details</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <FormField control={form.control} name="supplierId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier *</FormLabel>
                  <Select onValueChange={(val) => {
                    field.onChange(val)
                    const sup = MOCK_SUPPLIERS.find(s => s.id === val)
                    if(sup) form.setValue('supplierContact', sup.contact)
                  }} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select Supplier" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_SUPPLIERS.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="poDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>PO Date *</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="expectedDeliveryDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Delivery Date *</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="warehouseDestination" render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination Warehouse</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select Warehouse" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="Main Warehouse (WH-01)">Main Warehouse (WH-01)</SelectItem>
                      <SelectItem value="Cold Storage (WH-02)">Cold Storage (WH-02)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="paymentTerms" render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Terms</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="deliveryTerms" render={({ field }) => (
                <FormItem>
                  <FormLabel>Delivery Terms</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>

          {/* SECTION 2: CHEMICAL ITEMS TABLE */}
          <Card className="border-border shadow-sm overflow-hidden">
            <CardHeader className="bg-muted/30 pb-4 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold text-primary">2. Chemical Items</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => append({ chemicalId: "", quantity: 1, unitPrice: 0, taxPercent: 0 })}>
                <Plus className="h-4 w-4 mr-2" /> Add Item
              </Button>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/50 sticky top-0">
                  <TableRow>
                    <TableHead className="w-[250px]">Chemical</TableHead>
                    <TableHead>Hazard</TableHead>
                    <TableHead className="w-[100px]">Qty</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="w-[120px]">Price (₹)</TableHead>
                    <TableHead className="w-[80px]">Tax %</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => {
                    const selectedChemId = watchedItems[index]?.chemicalId
                    const chemDetails = MOCK_CHEMICALS.find(c => c.id === selectedChemId)
                    const lineAmount = (watchedItems[index]?.quantity || 0) * (watchedItems[index]?.unitPrice || 0)
                    const lineTotalWithTax = lineAmount + (lineAmount * ((watchedItems[index]?.taxPercent || 0) / 100))

                    return (
                      <TableRow key={field.id}>
                        <TableCell>
                          <FormField control={form.control} name={`items.${index}.chemicalId`} render={({ field: selectField }) => (
                            <FormItem>
                              <Select onValueChange={(val) => {
                                selectField.onChange(val)
                                const chem = MOCK_CHEMICALS.find(c => c.id === val)
                                if(chem) {
                                  form.setValue(`items.${index}.unitPrice`, chem.price)
                                }
                              }} defaultValue={selectField.value}>
                                <FormControl><SelectTrigger className="h-8"><SelectValue placeholder="Select..." /></SelectTrigger></FormControl>
                                <SelectContent>
                                  {MOCK_CHEMICALS.map(c => <SelectItem key={c.id} value={c.id}>{c.name} ({c.casNumber})</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )} />
                        </TableCell>
                        <TableCell>
                          {chemDetails ? (
                            <Badge variant="outline" className={`text-[10px] ${getHazardBadgeColor(chemDetails.hazardClass)}`}>
                              {chemDetails.hazardClass}
                            </Badge>
                          ) : <span className="text-muted-foreground text-xs">-</span>}
                        </TableCell>
                        <TableCell>
                          <FormField control={form.control} name={`items.${index}.quantity`} render={({ field: qtyField }) => (
                            <FormItem><FormControl><Input type="number" min={1} className="h-8" {...qtyField} onChange={e => qtyField.onChange(parseFloat(e.target.value))} /></FormControl></FormItem>
                          )} />
                        </TableCell>
                        <TableCell className="text-xs font-mono">{chemDetails?.unit || '-'}</TableCell>
                        <TableCell>
                          <FormField control={form.control} name={`items.${index}.unitPrice`} render={({ field: priceField }) => (
                            <FormItem><FormControl><Input type="number" min={0} step="0.01" className="h-8" {...priceField} onChange={e => priceField.onChange(parseFloat(e.target.value))} /></FormControl></FormItem>
                          )} />
                        </TableCell>
                        <TableCell>
                          <FormField control={form.control} name={`items.${index}.taxPercent`} render={({ field: taxField }) => (
                            <FormItem><FormControl><Input type="number" min={0} max={100} className="h-8" {...taxField} onChange={e => taxField.onChange(parseFloat(e.target.value))} /></FormControl></FormItem>
                          )} />
                        </TableCell>
                        <TableCell className="text-right font-medium text-sm">
                          {formatCurrency(lineTotalWithTax)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insert(index + 1, watchedItems[index])}>
                              <Copy className="h-4 w-4 text-muted-foreground" />
                            </Button>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" onClick={() => fields.length > 1 && remove(index)} disabled={fields.length === 1}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            {form.formState.errors.items?.root && (
              <div className="p-4 text-sm text-destructive font-medium border-t">
                {form.formState.errors.items.root.message}
              </div>
            )}
          </Card>

          {/* SECTION 4: APPROVAL WORKFLOW */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg font-semibold text-primary">3. Approval Workflow</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 pb-8">
              <div className="relative flex justify-between">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full"></div>
                <div className="absolute top-1/2 left-0 w-0 h-1 bg-primary -translate-y-1/2 rounded-full transition-all"></div>
                
                {["Draft", "Pending Approval", "Approved", "Ordered", "Received"].map((step, idx) => (
                  <div key={step} className="relative flex flex-col items-center z-10 gap-2">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 bg-background ${idx === 0 ? "border-primary text-primary" : "border-muted text-muted-foreground"}`}>
                      {idx === 0 && <div className="h-2 w-2 bg-primary rounded-full"></div>}
                    </div>
                    <span className={`text-xs font-medium absolute top-8 text-center w-24 ${idx === 0 ? "text-primary" : "text-muted-foreground"}`}>{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SECTION 5: DOCUMENTS & SECTION 6: NOTES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 pb-4 border-b">
                <CardTitle className="text-lg font-semibold text-primary">4. Documents</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-sm font-semibold">Drag & drop files here</p>
                  <p className="text-xs text-muted-foreground mt-1">Quotation, Invoice, or Contracts</p>
                  <Button type="button" variant="outline" size="sm" className="mt-4">Browse Files</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 pb-4 border-b">
                <CardTitle className="text-lg font-semibold text-primary">5. Notes & Terms</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <FormField control={form.control} name="internalNotes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Internal Notes</FormLabel>
                    <FormControl><Textarea className="resize-none" rows={2} {...field} /></FormControl>
                  </FormItem>
                )} />
                <FormField control={form.control} name="termsAndConditions" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Terms & Conditions</FormLabel>
                    <FormControl><Textarea className="resize-none text-xs font-mono" rows={3} {...field} /></FormControl>
                  </FormItem>
                )} />
              </CardContent>
            </Card>
          </div>

        </div>

        {/* Right Sidebar (25%) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* ORDER SUMMARY */}
          <Card className="border-border shadow-sm bg-muted/10">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-md font-semibold text-primary">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">{formatCurrency(taxTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{formatCurrency(shipping)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between items-center text-sm text-success">
                  <span>Discount</span>
                  <span className="font-medium">-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-primary">{formatCurrency(totalAmount)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Info */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-md font-semibold text-primary">Supplier Info</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {selectedSupplier ? (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm font-semibold">{selectedSupplier.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contact</p>
                    <p className="text-sm font-medium">{selectedSupplier.contact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <Badge variant="outline" className="mt-1 text-[10px]">{selectedSupplier.type}</Badge>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground italic">Select a supplier to view details.</p>
              )}
            </CardContent>
          </Card>

          {/* Inventory Impact */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-md font-semibold text-primary">Inventory Impact</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {selectedChemicalDetails.length > 0 ? selectedChemicalDetails.map((chem, idx) => {
                if(!chem) return null
                const orderQty = watchedItems.find(i => i.chemicalId === chem.id)?.quantity || 0
                return (
                  <div key={idx} className="space-y-1 pb-3 border-b last:border-0 last:pb-0">
                    <p className="text-xs font-semibold">{chem.name}</p>
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>Current: {chem.stock}{chem.unit}</span>
                      <span className="text-primary font-medium">Projected: {chem.stock + orderQty}{chem.unit}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1 flex">
                      <div className="bg-foreground" style={{ width: `${Math.min(100, (chem.stock / chem.reorder) * 50)}%` }}></div>
                      <div className="bg-success" style={{ width: `${Math.min(100, (orderQty / chem.reorder) * 50)}%` }}></div>
                    </div>
                  </div>
                )
              }) : (
                <p className="text-sm text-muted-foreground italic">Add items to view impact.</p>
              )}
            </CardContent>
          </Card>

        </div>
      </form>
    </Form>
  )
}
