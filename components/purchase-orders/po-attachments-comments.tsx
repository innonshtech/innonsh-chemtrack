import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UploadCloud, FileText, Paperclip, Send, User } from "lucide-react"

export function POAttachmentsComments() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
      {/* Attachments Section (Mock) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Paperclip className="h-5 w-5" />
            Attachments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer">
            <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-sm font-medium mb-1">Click or drag files to upload</p>
            <p className="text-xs text-muted-foreground">Support for PDF, JPG, PNG (Max 10MB)</p>
          </div>
          
          <div className="space-y-2 pt-2">
            <h4 className="text-sm font-semibold text-muted-foreground">Uploaded Files</h4>
            
            <div className="flex items-center justify-between p-3 rounded-md border bg-background">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Vendor_Quote_Q3.pdf</span>
                  <span className="text-xs text-muted-foreground">1.2 MB • Uploaded 2 days ago</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">View</Button>
            </div>
            
          </div>
        </CardContent>
      </Card>

      {/* Comments & Activity Section (Mock) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User className="h-5 w-5" />
            Comments & Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full space-y-4">
          
          <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {/* Mock Comment 1 */}
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-primary">JD</span>
              </div>
              <div className="flex flex-col bg-muted/30 p-3 rounded-lg rounded-tl-none w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold">Jane Doe</span>
                  <span className="text-[10px] text-muted-foreground">2 days ago</span>
                </div>
                <p className="text-sm text-foreground">I've attached the preliminary quote. Please review the bulk discount on Acetone before approving.</p>
              </div>
            </div>

            {/* Mock Comment 2 */}
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-secondary-foreground">SA</span>
              </div>
              <div className="flex flex-col bg-muted/30 p-3 rounded-lg rounded-tl-none w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold">System Admin</span>
                  <span className="text-[10px] text-muted-foreground">1 day ago</span>
                </div>
                <p className="text-sm text-foreground">Discount looks good. Advancing status to Pending Approval for final manager sign-off.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t mt-auto">
            <Input placeholder="Type a comment..." className="flex-1" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
