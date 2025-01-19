"use client"

import { useState, useCallback } from "react"
import { UseFormReturn } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"

const INTERNSHIP_FEE = 2500;
const DISCOUNTED_FEE = 2200;
const REFERRAL_DISCOUNT = 300;

import { toast } from "@/hooks/use-toast"

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT || '/api';

interface FormSectionProps {
  form: UseFormReturn<any>
}

export function PersonalDetailsForm({ form }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="yourname@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+91 1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export function InternshipDetailsForm({ form }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Start Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="areasOfInterest"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Areas of Interest (Select all that apply)</FormLabel>
            <FormControl>
              <div className="space-y-4">
                {[
                  {
                    role: "Frontend Development",
                    areas: ["React", "Vue.js", "Angular", "Next.js", "UI/UX Design"]
                  },
                  {
                    role: "Backend Development",
                    areas: ["Node.js", "Python", "Java", "Ruby on Rails", "PHP"]
                  },
                  {
                    role: "Full Stack Development",
                    areas: ["MERN Stack", "MEAN Stack", "Ruby on Rails", "Django"]
                  },
                  {
                    role: "Mobile Development",
                    areas: ["iOS (Swift)", "Android (Kotlin)", "React Native", "Flutter"]
                  },
                  {
                    role: "Data Science & AI",
                    areas: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"]
                  },
                  {
                    role: "DevOps & Cloud",
                    areas: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"]
                  }
                ].map((roleGroup) => (
                  <div key={roleGroup.role} className="space-y-2">
                    <h4 className="font-medium">{roleGroup.role}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {roleGroup.areas.map((area) => (
                        <FormItem key={area} className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={(field.value || []).includes(area)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), area]
                                  : (field.value || []).filter((value: string) => value !== area);
                                field.onChange(updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{area}</FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Skills (Select all that apply)</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  "HTML", "CSS", "JavaScript", "TypeScript", "Python", "Java", "C++",
                  "SQL", "NoSQL", "Git", "RESTful APIs", "GraphQL", "Agile/Scrum",
                  "Test-Driven Development", "CI/CD", "Cloud Services", "Responsive Design",
                  "Web Accessibility", "Performance Optimization", "Security Best Practices"
                ].map((skill) => (
                  <FormItem key={skill} className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={(field.value || []).includes(skill)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), skill]
                            : (field.value || []).filter((value: string) => value !== skill);
                          field.onChange(updatedValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{skill}</FormLabel>
                  </FormItem>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="projectIdea"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brief Project Idea</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe a project you'd like to work on during your internship"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export function EducationalBackgroundForm({ form }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="university"
        render={({ field }) => (
          <FormItem>
            <FormLabel>College/University Name</FormLabel>
            <FormControl>
              <Input placeholder="Your University" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="studentId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Roll Number/Student ID</FormLabel>
            <FormControl>
              <Input placeholder="Your Student ID" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="course"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., B.Tech Computer Science" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="semester"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Semester</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 6th Semester" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export function ResumeUploadForm({ form }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="resume"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Upload Your Resume</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  onChange(file ? [file] : [])
                }}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="text-sm text-muted-foreground">
        Please upload your resume in PDF, DOC, or DOCX format. Maximum file size: 5MB.
      </p>
    </div>
  )
}

export function DeclarationForm({ form }: FormSectionProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="declaration"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Declaration
              </FormLabel>
              <p className="text-sm text-muted-foreground">
                I confirm that the information provided is accurate. I understand that this internship program is designed to provide me with valuable learning experiences and industry exposure. I commit to actively participating in all aspects of the program, including projects, mentorship sessions, and progress evaluations.
              </p>
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export function PaymentForm({ form }: FormSectionProps) {
  const [referralApplied, setReferralApplied] = useState(false)
  const [referralChecking, setReferralChecking] = useState(false)
  const finalFee = referralApplied ? DISCOUNTED_FEE - REFERRAL_DISCOUNT : INTERNSHIP_FEE

  const handleReferralCheck = useCallback(async (referrerName: string) => {
    setReferralChecking(true)
    try {
      const response = await fetch(`${API_ENDPOINT}/check-referral`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ referrerName }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
    
      if (data.isValid) {
        setReferralApplied(true)
        toast({
          title: "Referral Applied",
          description: "The referral discount has been applied to your fee.",
        })
      } else {
        setReferralApplied(false)
        toast({
          title: "Invalid Referral",
          description: "The referrer name is not valid or hasn't been approved by admin.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error checking referral:', error)
      setReferralApplied(false)
      toast({
        title: "Error",
        description: "An error occurred while checking the referral. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setReferralChecking(false)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Regular internship fee: ₹{INTERNSHIP_FEE}
        </p>
        {referralApplied && (
          <p className="text-sm text-green-600 font-semibold mb-4">
            Referral discount applied: -₹{REFERRAL_DISCOUNT}
          </p>
        )}
        <p className="text-lg font-bold mb-4">
          Total to pay: ₹{finalFee}
        </p>
      </div>
      <FormField
        control={form.control}
        name="referredBy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referred by (Optional)</FormLabel>
            <div className="flex gap-2">
              <FormControl>
                <Input
                  placeholder="Enter referrer's name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    if (!e.target.value) {
                      setReferralApplied(false)
                    }
                  }}
                />
              </FormControl>
              <Button
                type="button"
                variant="secondary"
                disabled={!field.value || referralChecking}
                onClick={() => handleReferralCheck(field.value)}
              >
                {referralChecking ? "Checking..." : "Verify Referral"}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col items-center justify-center space-y-4 mb-6">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GfIUvhiyLiKHdmo3vnd0kYfuxlamNi.png"
          alt="PhonePe Payment QR Code"
          className="w-auto max-w-[300px] border rounded-lg shadow-lg"
        />
        <p className="text-sm font-medium">Scan & Pay with any UPI App</p>
      </div>
      <div className="text-sm text-center space-y-1 mb-6">
        <p><strong>UPI ID:</strong> Q388390930@ybl</p>
        <p><strong>Account Name:</strong> Innovix Solutions</p>
        <p className="text-xs text-muted-foreground mt-2">Scan the QR code using any UPI app to make the payment</p>
      </div>
      <FormField
        control={form.control}
        name="paymentProof"
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Upload Payment Proof</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  onChange(file ? [file] : [])
                }}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <p className="text-sm text-muted-foreground">
        Please upload a screenshot or photo of your payment confirmation. Accepted formats: JPG, PNG, PDF. Maximum file size: 5MB.
      </p>
    </div>
  )
}


