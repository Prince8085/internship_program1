import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BRAND } from "@/lib/constants"
import { Code, Users, Rocket } from 'lucide-react'
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(6).jpeg-CVCRZLAbg7pyhvW2M8VS2iMJkyTF0a.png"
            alt="Innovix Solutions Internship Program"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
        </div>
        
        <div className="container relative flex max-w-[64rem] flex-col items-center gap-4 text-center py-12 sm:py-20 px-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold gradient-text transition-colors duration-300">
            Empower Your Future in Tech
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl">
            {BRAND.description}
          </p>
          <div className="space-x-4 mt-6">
            <Button asChild size="lg" className="rounded-full glow-primary">
              <Link href="/apply">Start Your Journey</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full glow-secondary">
              <Link href="/about">Discover More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Program Overview Section */}
      <section className="container space-y-6 py-16 md:py-24 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
              Join Our Premier Internship Program
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Experience hands-on learning and professional growth in a dynamic environment designed to launch your tech career.
            </p>
            <Button asChild className="rounded-full glow-primary">
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden glow-card">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(5)-PgYLJoMChvAFToHcs0VX3mz4qRp1l3.jpeg"
              alt="Internship program session"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container space-y-6 py-16 md:py-24 lg:py-32 px-4">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
            Why Choose Innovix?
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground text-sm sm:text-base md:text-lg">
            Our program is designed to provide you with real-world experience and skills that matter
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden glow-card order-2 md:order-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(7)-0tCCEcRFkVk6CWednuP7C5Kms1jUNs.jpeg"
              alt="Interactive learning session"
              fill
              className="object-contain"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 order-1 md:order-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="relative overflow-hidden rounded-lg border bg-card p-2 card-hover glow-card"
              >
                <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                  <benefit.icon className="h-12 w-12 text-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Path Section */}
      <section className="container py-12 sm:py-16 md:py-24 px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="relative aspect-video rounded-xl overflow-hidden glow-card">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(4).jpeg-lFlPA7doYhQxLmdDN3TXtXmIJr395w.png"
                alt="Networking session"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6 order-1 md:order-2">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">
              Your Path to Success
            </h2>
            <ol className="space-y-2 sm:space-y-4 list-decimal list-inside text-sm sm:text-base">
              <li>Apply for our immersive 4-month internship program</li>
              <li>Receive your personalized internship offer letter</li>
              <li>Engage in hands-on projects and skill-building exercises</li>
              <li>Track your progress with monthly performance evaluations</li>
              <li>Graduate with a valuable internship completion certificate</li>
            </ol>
            <Button asChild size="lg" className="rounded-full glow-primary w-full sm:w-auto">
              <Link href="/apply">Embark on Your Tech Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* New Success Path Banner Section */}
      <section className="w-full bg-[#002B5B] py-16 md:py-24">
        <div className="container px-4">
          <div className="relative w-full aspect-[3/1]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(8)-oywcxrvYn10Jd75zNZzl050QvkKBa4.jpeg"
              alt="Your Path to Success"
              fill
              className="object-contain rounded-xl shadow-xl glow-card"
              priority
            />
          </div>
          {/* Mobile-friendly version of the steps */}
          <div className="mt-8 grid gap-6 md:hidden">
            <div className="bg-[#002B5B]/80 p-6 rounded-lg backdrop-blur-sm border border-yellow-500/20 glow-card">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Your Journey With Us</h3>
              <div className="space-y-4 text-white">
                {[
                  "Apply for our immersive 4-month internship program",
                  "Receive your personalized project assignments",
                  "Engage in hands-on projects and skill-building exercises",
                  "Track your progress with monthly evaluations",
                  "Graduate with a valuable completion certificate"
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#002B5B] font-bold">{index + 1}</span>
                    </div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const benefits = [
  {
    title: "Industry-Relevant Skills",
    description: "Gain practical experience in cutting-edge technologies and methodologies",
    icon: Code,
  },
  {
    title: "Personalized Mentorship",
    description: "Receive guidance from experienced professionals in your field of interest",
    icon: Users,
  },
  {
    title: "Career Development",
    description: "Build a strong foundation for your future in the tech industry",
    icon: Rocket,
  },
]

