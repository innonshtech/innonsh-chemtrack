import { UploadCloud } from "lucide-react"

export function DocumentsStep() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Documents & Compliance</h3>
        <p className="text-sm text-muted-foreground">
          Upload Safety Data Sheets (SDS) or MSDS to ensure handlers have immediate access to safety protocols.
        </p>
      </div>

      <div className="border-2 border-dashed border-border rounded-lg p-12 flex flex-col items-center justify-center text-center bg-muted/20 hover:bg-muted/50 transition-colors cursor-pointer">
        <UploadCloud className="h-12 w-12 text-muted-foreground mb-4" />
        <h4 className="text-base font-semibold mb-1">Drag & Drop SDS File Here</h4>
        <p className="text-sm text-muted-foreground mb-4">Or click to browse from your computer</p>
        <p className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border">
          Supports PDF, DOCX (Max 10MB)
        </p>
      </div>
    </div>
  )
}
