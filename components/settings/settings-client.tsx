"use client"

import { useState } from "react"
import { SettingsUser, SettingsAuditLog } from "./types"
import { UsersTab } from "./users-tab"
import { RolesTab } from "./roles-tab"
import { LookupsTab } from "./lookups-tab"
import { GeneralTab } from "./general-tab"
import { AuditLogsTab } from "./audit-logs-tab"
import { Users, Shield, ListTree, Settings2, ScrollText } from "lucide-react"

interface SettingsClientProps {
  users: SettingsUser[]
  auditLogs: SettingsAuditLog[]
}

const TABS = [
  { id: "users", label: "User Management", icon: Users },
  { id: "roles", label: "Permission Matrix", icon: Shield },
  { id: "lookups", label: "Lookup Tables", icon: ListTree },
  { id: "general", label: "General Settings", icon: Settings2 },
  { id: "audit", label: "System Audit Logs", icon: ScrollText },
]

export function SettingsClient({ users, auditLogs }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start h-[calc(100vh-140px)]">
      
      {/* Vertical Navigation Sidebar */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-1 bg-card border rounded-lg p-2 shadow-sm">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Configuration</h3>
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors text-left
                ${isActive ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              <tab.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full h-full overflow-y-auto pr-2">
        {activeTab === "users" && <UsersTab users={users} />}
        {activeTab === "roles" && <RolesTab />}
        {activeTab === "lookups" && <LookupsTab />}
        {activeTab === "general" && <GeneralTab />}
        {activeTab === "audit" && <AuditLogsTab logs={auditLogs} />}
      </div>

    </div>
  )
}
