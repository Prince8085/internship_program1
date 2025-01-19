import { ApplicationForm } from "@/components/application-form"
import { FileText } from 'lucide-react'

export default function ApplyPage() {
  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center space-y-4 text-center mb-8 sm:mb-12">
        <div className="inline-block p-3 rounded-full bg-primary/10 mb-2">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-heading gradient-text transition-colors duration-300">Internship Application</h1>
        <p className="text-muted-foreground max-w-[600px] text-sm sm:text-base">
          Take the first step towards your tech career. Fill out the form below to apply for our internship program.
        </p>
      </div>
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-xl -z-10" />
        <div className="relative rounded-xl border bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-lg transition-all duration-300 hover:shadow-xl space-y-6 z-10">
          <div className="absolute inset-x-0 -top-1 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-xl" />
          <ApplicationForm />
        </div>
      </div>
    </div>
  )
}

