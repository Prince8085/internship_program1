import { ApplicationsList } from "@/components/applications-list"

export default function ApplicationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Applications</h1>
      <div className="bg-background/95 p-4 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Application Details Summary</h2>
        <p className="text-sm text-muted-foreground">
          This page displays all student applications, including personal information, educational background, internship preferences, skills, project ideas, and payment details. Use the list below to review and manage applications.
        </p>
      </div>
      <ApplicationsList />
    </div>
  )
}

