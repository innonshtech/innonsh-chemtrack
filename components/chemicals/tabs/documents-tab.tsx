import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, UploadCloud } from "lucide-react"

interface DocumentsTabProps {
  chemicalName: string
  sdsFileUrl: string | null
}

export function DocumentsTab({ chemicalName, sdsFileUrl }: DocumentsTabProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Safety Data Sheets (SDS)</CardTitle>
            <CardDescription>Primary safety documentation for {chemicalName}</CardDescription>
          </CardHeader>
          <CardContent>
            {sdsFileUrl ? (
              <div className="border rounded-md p-8 flex flex-col items-center justify-center bg-muted/30 min-h-[300px]">
                {/* Visual placeholder for PDF viewer */}
                <FileText className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
                <p className="text-muted-foreground mb-4">Interactive Document Viewer UI</p>
                <div className="flex gap-4">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Open in New Tab
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border rounded-md border-dashed p-8 flex flex-col items-center justify-center bg-muted/10 min-h-[300px]">
                <FileText className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium text-lg">No SDS Available</h3>
                <p className="text-sm text-muted-foreground mb-4">An SDS has not been uploaded for this chemical.</p>
                <Button>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload SDS
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Add secondary documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or JPG (max. 10MB)</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Other Documents</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-sm text-muted-foreground">No additional documents found.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
