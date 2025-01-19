"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye, Download, Search, Filter, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { toast } from "@/hooks/use-toast"

interface Application {
  id: string;
  personalDetails: {
    fullName: string;
    email: string;
    phone: string;
  };
  educationalBackground: {
    university: string;
    course: string;
    semester: string;
  };
  internshipDetails: {
    startDate: string;
    areasOfInterest: string[];
    skills: string[];
    projectIdea: string;
  };
  status: string;
  appliedDate: string;
  paymentDetails: {
    status: string;
    amount: number;
    referredBy: string | null;
  };
}

export function ApplicationsList() {
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [totalApplications, setTotalApplications] = useState(0)

  useEffect(() => {
    fetchApplications()
    // Set up polling every 30 seconds
    const interval = setInterval(fetchApplications, 30000)
    return () => clearInterval(interval)
  }, [currentPage, statusFilter])

  const fetchApplications = async () => {
    try {
      const response = await fetch(`/api/admin/applications/submit?page=${currentPage}&status=${statusFilter}`)
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      const data = await response.json()
      console.log('Fetched applications data:', data)
      setApplications(data.applications)
      setTotalPages(data.totalPages)
      setTotalApplications(data.totalApplications)
    } catch (error) {
      console.error('Error fetching applications:', error)
      toast({
        title: "Error",
        description: "Failed to fetch applications. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadResume = async (application: Application) => {
    // Implement resume download logic here
    console.log("Downloading resume for", application.personalDetails.fullName)
    // You might want to call an API endpoint to get the resume file
  }

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    // Implement status change logic here
    console.log("Changing status for application", applicationId, "to", newStatus)
    // You might want to call an API endpoint to update the status
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (applications.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No applications found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => {
            setStatusFilter(value)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {applications.length} of {totalApplications} applications
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">
                <div>
                  {application.personalDetails.fullName}
                  <div className="text-sm text-muted-foreground">{application.personalDetails.email}</div>
                </div>
              </TableCell>
              <TableCell>{application.educationalBackground.university}</TableCell>
              <TableCell>{application.educationalBackground.course}</TableCell>
              <TableCell>{new Date(application.appliedDate).toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={application.paymentDetails.status === "completed" ? "default" : "secondary"}>
                  ₹{application.paymentDetails.amount}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    application.status === "approved"
                      ? "default"
                      : application.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {application.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedApplication(application)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownloadResume(application)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || isLoading}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || isLoading}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p>Name: {selectedApplication.personalDetails.fullName}</p>
                  <p>Email: {selectedApplication.personalDetails.email}</p>
                  <p>Phone: {selectedApplication.personalDetails.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Educational Background</h3>
                  <p>University: {selectedApplication.educationalBackground.university}</p>
                  <p>Course: {selectedApplication.educationalBackground.course}</p>
                  <p>Semester: {selectedApplication.educationalBackground.semester}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Internship Details</h3>
                <p>Start Date: {selectedApplication.internshipDetails.startDate}</p>
                <p>Areas of Interest: {selectedApplication.internshipDetails.areasOfInterest.join(", ")}</p>
                <p>Skills: {selectedApplication.internshipDetails.skills.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Payment Information</h3>
                <p>Status: {selectedApplication.paymentDetails.status}</p>
                <p>Amount: ₹{selectedApplication.paymentDetails.amount}</p>
                {selectedApplication.paymentDetails.referredBy && (
                  <p>Referred By: {selectedApplication.paymentDetails.referredBy}</p>
                )}
              </div>
              <DialogFooter className="gap-2">
                <Select
                  defaultValue={selectedApplication.status}
                  onValueChange={(value) => handleStatusChange(selectedApplication.id, value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => handleDownloadResume(selectedApplication)}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Payment Proof",
                    description: "Viewing payment proof functionality to be implemented.",
                  })
                }}>
                  View Payment Proof
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

