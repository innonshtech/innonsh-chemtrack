"use client"

import { useSession, signOut } from "next-auth/react"
import { Bell, UserCircle } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6 lg:px-8 shrink-0 justify-between">
      <div className="flex items-center gap-4 flex-1">
        {/* Search bar could go here */}
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 rounded-full bg-warning text-warning-foreground">
            3
          </Badge>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger 
            className={buttonVariants({ variant: "ghost", className: "flex items-center gap-2 pr-0 hover:bg-transparent h-10 px-2" })}
          >
            <UserCircle className="h-7 w-7 text-muted-foreground" />
            <div className="flex flex-col items-start hidden sm:flex">
              <span className="text-sm font-medium leading-none">{session?.user?.name || 'Loading...'}</span>
              <span className="text-xs text-muted-foreground mt-1">{session?.user?.role || '...'}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/login' })} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
