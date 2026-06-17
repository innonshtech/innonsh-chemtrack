"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface RoleGuardProps {
  allowedRoles: string[]
  children: React.ReactNode
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return;

    if (!session || !allowedRoles.includes(session.user.role)) {
      router.push('/dashboard')
    }
  }, [session, status, router, allowedRoles])

  if (status === "loading") {
    return <div className="p-8 flex justify-center items-center h-full text-muted-foreground">Loading...</div>
  }

  if (!session || !allowedRoles.includes(session.user.role)) {
    return null;
  }

  return <>{children}</>
}
