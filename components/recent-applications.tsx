"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentApplications({ applications = [] }) {
  return (
    <div className="space-y-8">
      {applications.map((application) => (
        <div key={application.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {application.personalDetails.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{application.personalDetails.fullName}</p>
            <p className="text-sm text-muted-foreground">{application.personalDetails.email}</p>
          </div>
          <div className="ml-auto font-medium">
            <Badge
              variant={application.status === "approved" ? "default" : "secondary"}
            >
              {application.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

