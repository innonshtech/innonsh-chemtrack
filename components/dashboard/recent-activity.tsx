"use client"

import { formatDistanceToNow } from "date-fns"
import { ArrowDownRight, ArrowUpRight, FileEdit, CheckCircle2 } from "lucide-react"

interface Activity {
  id: string
  action: string
  details: string
  timestamp: Date
  user: string
}

interface RecentActivityProps {
  activities: Activity[]
}

const getActivityIcon = (action: string) => {
  switch (action) {
    case "STOCK_IN":
      return <ArrowDownRight className="h-4 w-4 text-success" />
    case "STOCK_OUT":
      return <ArrowUpRight className="h-4 w-4 text-warning" />
    case "ADJUSTMENT":
      return <FileEdit className="h-4 w-4 text-primary" />
    case "APPROVAL":
      return <CheckCircle2 className="h-4 w-4 text-info" />
    default:
      return <div className="h-2 w-2 rounded-full bg-muted-foreground" />
  }
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="space-y-6">
      {activities.length === 0 ? (
        <div className="text-center text-sm text-muted-foreground py-4">No recent activity.</div>
      ) : (
        activities.map((activity, index) => (
          <div key={activity.id} className="relative flex gap-4">
            {index !== activities.length - 1 && (
              <div className="absolute left-4 top-8 -bottom-6 w-px bg-border" />
            )}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm">
              {getActivityIcon(activity.action)}
            </div>
            <div className="flex flex-col gap-1 pb-1">
              <p className="text-sm font-medium leading-none">
                {activity.action.replace("_", " ")}
              </p>
              <p className="text-sm text-muted-foreground">{activity.details}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground/70">{activity.user}</span>
                <span>•</span>
                <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
