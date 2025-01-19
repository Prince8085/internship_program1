"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import {
  PersonalDetailsForm,
  InternshipDetailsForm,
  EducationalBackgroundForm,
  DeclarationForm,
  ResumeUploadForm,
  PaymentForm,
} from "@/components/form-sections"
import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { SuccessPopup } from "@/components/success-popup"
import { useEffect as useEffect2, useState as useState2 } from "react"
import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"

const partyStyles = `
.particle {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
}

@keyframes popIn {
  0% { transform: scale(0) rotate(0deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
  100% { transform: scale(1) rotate(360deg); opacity: 1; }
}
`;

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  university: z.string().min(2, "University name is required"),
  studentId: z.string().min(1, "Student ID is required"),
  course: z.string().min(2, "Course name is required"),
  semester: z.string().min(1, "Semester is required"),
  startDate: z.string().min(1, "Start date is required"),
  areasOfInterest: z.array(z.string()).min(1, "Select at least one area of interest"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  projectIdea: z.string().min(10, "Please provide a brief project idea"),
  resume: z.any().refine((files) => files?.length == 1, "Resume is required"),
  declaration: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
  referredBy: z.string().optional(),
  paymentProof: z.any().refine((files) => files?.length == 1, "Payment proof is required"),
})

type FormData = z.infer<typeof formSchema>

const formSections = [
  { id: "personal", title: "Personal Details" },
  { id: "internship", title: "Internship Preferences" },
  { id: "education", title: "Educational Background" },
  { id: "resume", title: "Resume Upload" },
  { id: "declaration", title: "Declaration" },
  { id: "payment", title: "Payment" },
]

export function ApplicationForm() {
  const [activeSection, setActiveSection] = React.useState(0)
  const tabsListRef = React.useRef<HTMLDivElement>(null)
  const activeTabRef = React.useRef<HTMLButtonElement>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isExploding, setIsExploding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 })
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [isEnvironmentReady, setIsEnvironmentReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const createFireworkParticle = (x: number, y: number) => {
    const particle = document.createElement('div')
    const size = Math.random() * 6 + 3
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`

    particle.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
    `

    document.body.appendChild(particle)

    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 100 + 50
    const lifetime = Math.random() * 1000 + 500
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / lifetime

      if (progress < 1) {
        const moveX = x + Math.cos(angle) * velocity * progress
        const moveY = y + Math.sin(angle) * velocity * progress + (0.5 * 9.8 * progress * progress * 100)
        const scale = 1 - progress
        const alpha = 1 - progress

        particle.style.transform = `translate(${moveX - x}px, ${moveY - y}px) scale(${scale})`
        particle.style.opacity = alpha.toString()

        requestAnimationFrame(animate)
      } else {
        particle.remove()
      }
    }

    requestAnimationFrame(animate)
  }

  const createFireworks = (x: number, y: number, particleCount: number) => {
    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => createFireworkParticle(x, y), i * 5)
    }
  }

  const createAdditionalFireworks = () => {
    const x = Math.random() * window.innerWidth
    const y = Math.random() * window.innerHeight
    createFireworks(x, y, 30)
  }

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      university: "",
      studentId: "",
      course: "",
      semester: "",
      startDate: "",
      areasOfInterest: [],
      skills: [],
      projectIdea: "",
      resume: undefined,
      declaration: false,
      referredBy: "",
      paymentProof: undefined,
    },
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateWindowDimensions = () => {
        setWindowDimensions({ width: window.innerWidth, height: window.innerHeight })
      }
      updateWindowDimensions()
      window.addEventListener('resize', updateWindowDimensions)
      return () => window.removeEventListener('resize', updateWindowDimensions)
    }
  }, [])

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = partyStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = confettiStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (isExploding) {
      const interval = setInterval(createAdditionalFireworks, 500)
      return () => clearInterval(interval)
    }
  }, [isExploding])

  useEffect(() => {
    return () => {
      document.querySelectorAll('.particle').forEach(el => el.remove())
    }
  }, [])

  useEffect(() => {
    if (showSuccessModal && typeof window !== 'undefined') {
      const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3')
      audio.play().catch(e => console.log("Audio playback failed:", e))
    }
  }, [showSuccessModal])

  useEffect(() => {
    // Always set isEnvironmentReady to true
    setIsEnvironmentReady(true)
    setIsLoading(false)
  }, [])

  const progress = ((activeSection + 1) / formSections.length) * 100

  const scrollTabIntoView = useCallback(() => {
    if (activeTabRef.current && tabsListRef.current) {
      const tabsList = tabsListRef.current
      const activeTab = activeTabRef.current
      const scrollLeft = activeTab.offsetLeft - (tabsList.offsetWidth - activeTab.offsetWidth) / 2
      
      tabsList.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }, [])

  useEffect(() => {
    scrollTabIntoView()
  }, [activeSection, scrollTabIntoView])

  const onSubmit = async (data: FormData) => {
    if (data.resume && data.resume[0] && data.paymentProof && data.paymentProof[0]) {
      try {
        setIsSubmitting(true);
        console.log('Submitting application:', data);

        // Prepare the application data
        const applicationData = {
          personalDetails: {
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
          },
          educationalBackground: {
            university: data.university,
            studentId: data.studentId,
            course: data.course,
            semester: data.semester,
          },
          internshipDetails: {
            startDate: data.startDate,
            areasOfInterest: data.areasOfInterest,
            skills: data.skills,
            projectIdea: data.projectIdea,
          },
          status: 'pending',
          appliedDate: new Date().toISOString(),
          paymentDetails: {
            status: 'completed',
            amount: data.referredBy ? 2200 : 2500,
            referredBy: data.referredBy || null,
          }
        };

        // Add the application to Firestore
        const docRef = await addDoc(collection(db, 'applications'), applicationData);

        console.log('Application submitted successfully:', docRef.id);

        setShowSuccessPopup(true);
        setIsExploding(true);
        
        toast({
          title: "Application Submitted",
          description: "Thank you for applying. We've received your application and will review it shortly.",
        });

        setTimeout(() => {
          setIsExploding(false);
          setShowConfetti(false);
        }, 3000);

      } catch (error) {
        console.error('Error:', error);
        toast({
          title: "Submission Error",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: "Application Incomplete",
        description: "Please ensure you've uploaded both your resume and payment proof.",
        variant: "destructive",
      })
    }
  }

  const handleSectionChange = (index: number) => {
    setActiveSection(index)
  }

  const explode = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isExploding) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    setIsExploding(true)
    setShowSuccessPopup(true);

    // Center explosion
    createFireworks(x, y, 100)

    // Corner fireworks
    const corners = [
      [0, 0],
      [window.innerWidth, 0],
      [0, window.innerHeight],
      [window.innerWidth, window.innerHeight]
    ]

    corners.forEach(([cornerX, cornerY]) => {
      setTimeout(() => createFireworks(cornerX, cornerY, 50), 300)
    })

    setTimeout(() => setIsExploding(false), 2000)
  }


  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = partyStyles;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (isExploding) {
      const interval = setInterval(createAdditionalFireworks, 500)
      return () => clearInterval(interval)
    }
  }, [isExploding])

  useEffect(() => {
    return () => {
      document.querySelectorAll('.particle').forEach(el => el.remove())
    }
  }, [])

  useEffect(() => {
    if (showSuccessModal && typeof window !== 'undefined') {
      const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3')
      audio.play().catch(e => console.log("Audio playback failed:", e))
    }
  }, [showSuccessModal])

  if (isLoading) {
    return null // or a loading spinner
  }

  return (
    <div className="space-y-6">
      <Progress 
        value={progress} 
        className="h-2 w-full rounded-full bg-secondary/20"
      />
      
      <Tabs value={formSections[activeSection].id} className="w-full">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/30" />
          </div>
          <TabsList 
            ref={tabsListRef}
            className="relative flex w-full h-auto p-0 bg-transparent space-x-2 overflow-x-auto scrollbar-hide"
          >
            {formSections.map((section, index) => (
              <TabsTrigger
                key={section.id}
                value={section.id}
                disabled={index !== activeSection}
                onClick={() => handleSectionChange(index)}
                ref={index === activeSection ? activeTabRef : null}
                className="flex-none px-3 py-1.5 text-xs sm:text-sm rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-background border border-input"
              >
                {section.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="personal" className="mt-0 space-y-4">
              <PersonalDetailsForm form={form} />
            </TabsContent>
            <TabsContent value="internship" className="mt-0 space-y-4">
              <InternshipDetailsForm form={form} />
            </TabsContent>
            <TabsContent value="education" className="mt-0 space-y-4">
              <EducationalBackgroundForm form={form} />
            </TabsContent>
            <TabsContent value="resume" className="mt-0 space-y-4">
              <ResumeUploadForm form={form} />
            </TabsContent>
            <TabsContent value="declaration" className="mt-0 space-y-4">
              <DeclarationForm form={form} />
            </TabsContent>
            <TabsContent value="payment" className="mt-0 space-y-4">
              <PaymentForm form={form} />
            </TabsContent>

            <div className="flex justify-between pt-4 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSectionChange(Math.max(0, activeSection - 1))}
                disabled={activeSection === 0}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
              {activeSection === formSections.length - 1 ? (
                <motion.div
                  className="relative"
                  initial={{ scale: 1 }}
                  animate={{ scale: isSubmitting ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    type="submit" 
                    className="gradient-bg w-full sm:w-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      // Create initial firework burst
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = rect.left + rect.width / 2;
                      const y = rect.top + rect.height / 2;
                      
                      // Create fireworks at button position
                      createFireworks(x, y, 50);
                      
                      // Create fireworks at corners
                      const corners = [
                        [0, 0],
                        [window.innerWidth, 0],
                        [0, window.innerHeight],
                        [window.innerWidth, window.innerHeight]
                      ];
                      
                      corners.forEach(([cornerX, cornerY]) => {
                        setTimeout(() => createFireworks(cornerX, cornerY, 30), Math.random() * 500);
                      });
                      
                      // Start continuous fireworks
                      setIsExploding(true);
                      setShowSuccessPopup(true);
                      
                      form.handleSubmit(onSubmit)();
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitted! 🎉' : 'Submit Application'}
                  </Button>
                  {showConfetti && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {[...Array(50)].map((_, index) => (
                        <motion.div
                          key={index}
                          className="absolute w-2 h-2 bg-primary rounded-full"
                          initial={{
                            x: "50%",
                            y: "50%",
                          }}
                          animate={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                            scale: 0,
                          }}
                          transition={{
                            duration: 1 + Math.random(),
                            ease: "easeOut",
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <Button
                  type="button"
                  onClick={() => handleSectionChange(Math.min(formSections.length - 1, activeSection + 1))}
                  className="gradient-bg w-full sm:w-auto"
                >
                  Next
                </Button>
              )}
            </div>
          </form>
        </Form>
      </Tabs>
      <SuccessPopup 
        isOpen={showSuccessPopup} 
        onClose={() => setShowSuccessPopup(false)} 
      />
      {isExploding && (
        <div className="fixed inset-0 pointer-events-none">
        <div 
          className="firework" 
          style={{ ['--x' as any]: '30vmin' }}
        ></div>
        <div 
          className="firework" 
          style={{ ['--x' as any]: '-30vmin' }}
        ></div>
        <div 
          className="firework" 
          style={{ ['--x' as any]: '0vmin' }}
        ></div>
        </div>
      )}
      {showConfetti && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(50)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{
                x: "50%",
                y: "50%",
              }}
              animate={{
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: 0,
              }}
              transition={{
                duration: 1 + Math.random(),
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

const confettiStyles = `
  @keyframes confettiDrop {
    0% { transform: translateY(-100vh) rotate(0deg); }
    100% { transform: translateY(100vh) rotate(720deg); }
  }

  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    background-color: #f0f0f0;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    animation: confettiDrop 5s linear infinite;
  }
`;

