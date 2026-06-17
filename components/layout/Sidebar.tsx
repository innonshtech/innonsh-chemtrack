"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FlaskConical,
  Package,
  Layers,
  Users,
  ShoppingCart,
  Bell,
  BarChart3,
  Settings,
} from "lucide-react"

const NAV_ITEMS = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Products", href: "/chemicals", icon: FlaskConical, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Batches", href: "/batches", icon: Layers, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Warehouse", href: "/warehouse", icon: Package, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Suppliers", href: "/suppliers", icon: Users, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Purchase Orders", href: "/purchase-orders", icon: ShoppingCart, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Alerts", href: "/alerts", icon: Bell, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Reports", href: "/reports", icon: BarChart3, roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  { title: "Settings", href: "/settings", icon: Settings, roles: ["SUPER_ADMIN", "ADMIN"] },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const userRole = session?.user?.role || "MANAGER"

  const filteredItems = NAV_ITEMS.filter((item) => item.roles.includes(userRole))

  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <FlaskConical className="mr-2 h-6 w-6 text-sidebar-primary" />
        <span className="font-semibold text-lg text-sidebar-foreground">Chemtrack</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="grid gap-1 px-2">
          {filteredItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
