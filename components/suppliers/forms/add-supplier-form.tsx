"use client"

import { useState, useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { UploadCloud, CheckCircle2, ShieldAlert, FileText, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const supplierFormSchema = z.object({
  // Supplier Information
  name: z.string().min(2, "Supplier Name is required"),
  code: z.string().optional(),
  contactPerson: z.string().min(2, "Contact Person is required"),
  designation: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone Number is required"),
  alternatePhone: z.string().optional(),
  
  // Business Information
  gstNumber: z.string().optional(),
  panNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  category: z.string({ required_error: "Supplier Category is required" }),
  
  // Address Information
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
  
  // Banking Information
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  accountHolder: z.string().optional(),
})

export function AddSupplierForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const form = useForm<z.infer<typeof supplierFormSchema>>({
    resolver: zodResolver(supplierFormSchema),
    defaultValues: {
      name: "",
      code: "SUP-" + Math.floor(1000 + Math.random() * 9000), // Auto-generated
      contactPerson: "",
      designation: "",
      email: "",
      phone: "",
      alternatePhone: "",
      gstNumber: "",
      panNumber: "",
      registrationNumber: "",
      category: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolder: "",
    },
    mode: "onChange"
  })

  // Watch fields to update summary cards dynamically if needed
  const { name, category } = useWatch({ control: form.control })

  const onSubmit = async (values: z.infer<typeof supplierFormSchema>) => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log("Submitting:", values)
    toast.success("Supplier created successfully!")
    setIsSubmitting(false)
    router.push("/suppliers")
  }

  return (
    <Form {...form}>
      <form id="add-supplier-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 lg:grid-cols-12">
        
        {/* Left Section (70%) */}
        <div className="lg:col-span-8 space-y-6 relative">
          
          {isSubmitting && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm font-medium text-primary">Creating Supplier...</span>
              </div>
            </div>
          )}

          {/* Supplier Information Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg font-semibold text-primary">Supplier Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Name *</FormLabel>
                  <FormControl><Input placeholder="Enter company name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="code" render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Code</FormLabel>
                  <FormControl><Input disabled className="bg-muted" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="contactPerson" render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person *</FormLabel>
                  <FormControl><Input placeholder="Full name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="designation" render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl><Input placeholder="e.g. Sales Manager" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl><Input type="email" placeholder="contact@supplier.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl><Input placeholder="Primary phone" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="alternatePhone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alt Phone</FormLabel>
                    <FormControl><Input placeholder="Secondary phone" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </CardContent>
          </Card>

          {/* Business Information Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg font-semibold text-primary">Business Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="gstNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>GST Number</FormLabel>
                  <FormControl><Input placeholder="GSTIN" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="panNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>PAN Number</FormLabel>
                  <FormControl><Input placeholder="PAN" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="registrationNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Registration Number</FormLabel>
                  <FormControl><Input placeholder="CIN / Registration No" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier Category *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Manufacturer">Manufacturer</SelectItem>
                      <SelectItem value="Distributor">Distributor</SelectItem>
                      <SelectItem value="Importer">Importer</SelectItem>
                      <SelectItem value="Vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>

          {/* Address Information Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg font-semibold text-primary">Address Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <FormField control={form.control} name="addressLine1" render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl><Input placeholder="Street address, building, etc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="addressLine2" render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2</FormLabel>
                  <FormControl><Input placeholder="Apartment, suite, unit, etc. (optional)" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="state" render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="pincode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </CardContent>
          </Card>

          {/* Banking Information Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg font-semibold text-primary">Banking Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="bankName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl><Input placeholder="e.g. HDFC Bank" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="accountNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl><Input type="password" placeholder="Account Number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="ifscCode" render={({ field }) => (
                <FormItem>
                  <FormLabel>IFSC Code</FormLabel>
                  <FormControl><Input placeholder="IFSC Code" className="uppercase" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="accountHolder" render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Holder Name</FormLabel>
                  <FormControl><Input placeholder="Name on account" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar (30%) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Supplier Summary Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-md font-semibold text-primary flex items-center gap-2">
                <FileText className="h-4 w-4" /> Supplier Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Supplier Status</span>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">DRAFT</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Supplier Type</span>
                <span className="text-sm font-medium">{category || "Unassigned"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Created By</span>
                <span className="text-sm font-medium">Current User</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Created Date</span>
                <span className="text-sm font-medium">{mounted ? new Date().toLocaleDateString() : ""}</span>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-md font-semibold text-primary flex items-center gap-2">
                <ShieldAlert className="h-4 w-4" /> Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Compliance Status</span>
                <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">PENDING</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Document Verification</span>
                <Badge variant="outline" className="bg-muted text-muted-foreground">NOT STARTED</Badge>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk Score</span>
                  <span className="text-sm font-bold text-warning">Medium (50/100)</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-warning w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attachments Card */}
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-md font-semibold text-primary flex items-center gap-2">
                <UploadCloud className="h-4 w-4" /> Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload documents</p>
                <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">GST Certificate</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Required</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Company Registration</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Required</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md bg-muted/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Agreements</span>
                  </div>
                  <Badge variant="outline" className="text-[10px]">Optional</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </form>
    </Form>
  )
}
