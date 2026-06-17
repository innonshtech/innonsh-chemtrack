"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function GeneralTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Settings</CardTitle>
        <CardDescription>Configure global application parameters and default behaviors.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Localization</h3>
            <div className="space-y-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" defaultValue="Innonsh Laboratories" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Default Timezone</Label>
              <select id="timezone" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Primary Currency</Label>
              <select id="currency" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground border-b pb-2">Security & Notifications</h3>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Two-Factor Authentication (2FA)</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for all Admin and Manager accounts.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Send daily digest of critical system alerts.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between pt-4">
              <div className="space-y-0.5">
                <Label className="text-base">Auto-Archive Audit Logs</Label>
                <p className="text-sm text-muted-foreground">Move logs older than 90 days to cold storage.</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <Button>Save Configuration</Button>
        </div>
      </CardContent>
    </Card>
  )
}
