"use client"

import { useState } from "react"
import { SettingsAuditLog } from "./types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, History, ChevronRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface AuditLogsTabProps {
  logs: SettingsAuditLog[]
}

export function AuditLogsTab({ logs }: AuditLogsTabProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLog, setSelectedLog] = useState<SettingsAuditLog | null>(null)

  const filteredLogs = logs.filter(l => 
    l.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.performedBy.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>System Audit Logs</CardTitle>
            <CardDescription>Immutable chronological timeline of critical system events.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search events or users..." 
                className="pl-9 h-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto relative">
        
        {/* Timeline View */}
        <div className="relative border-l-2 border-muted ml-4 space-y-6 pb-6">
          {filteredLogs.map((log) => (
            <div key={log.id} className="relative pl-6 group">
              <span className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full flex items-center justify-center ring-4 ring-background
                ${log.severity === "CRITICAL" ? "bg-destructive" : log.severity === "WARNING" ? "bg-warning" : "bg-primary"}`}>
              </span>
              
              <div 
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/20 p-4 rounded-lg border border-transparent group-hover:border-border transition-colors cursor-pointer"
                onClick={() => setSelectedLog(log)}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{log.type}</span>
                    <Badge variant="outline" className="text-[10px] h-5">{log.severity}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{log.details}</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 shrink-0 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{log.performedBy}</span>
                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                  <ChevronRight className="h-4 w-4 sm:hidden" />
                </div>
              </div>
            </div>
          ))}
          {filteredLogs.length === 0 && (
            <div className="pl-6 pt-4 text-muted-foreground text-sm">No audit logs found matching criteria.</div>
          )}
        </div>

      </CardContent>

      {/* Change History Drawer */}
      <Sheet open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <SheetContent className="w-full sm:max-w-md border-l shadow-2xl">
          <SheetHeader className="pb-6 border-b">
            <SheetTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Event Details
            </SheetTitle>
            <SheetDescription>
              Detailed forensic record of the system event.
            </SheetDescription>
          </SheetHeader>
          
          {selectedLog && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Event ID</span>
                  <p className="font-mono text-sm">{selectedLog.id}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Timestamp</span>
                  <p className="text-sm">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Performed By</span>
                  <p className="text-sm font-medium">{selectedLog.performedBy}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Severity</span>
                  <div>
                    <Badge variant="outline">{selectedLog.severity}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Event Type</span>
                <div className="p-2 bg-muted/30 rounded border font-mono text-sm text-primary">
                  {selectedLog.type}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Description</span>
                <p className="text-sm bg-muted/10 p-3 rounded border">
                  {selectedLog.details}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Raw JSON Payload</span>
                <pre className="p-3 bg-slate-950 text-slate-50 rounded border font-mono text-xs overflow-x-auto">
{JSON.stringify({
  eventId: selectedLog.id,
  type: selectedLog.type,
  timestamp: selectedLog.timestamp,
  actor: selectedLog.performedBy,
  actionPayload: selectedLog.details,
  metadata: { ip: "192.168.1.105", client: "Chemtrack Web/1.0" }
}, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

    </Card>
  )
}
