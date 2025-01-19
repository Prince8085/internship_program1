import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 gradient-text transition-colors duration-300">About Innovix Solutions</h1>
      
      <section className="mb-12 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative p-6 bg-card rounded-lg ring-1 ring-gray-900/5">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
          <p className="text-lg mb-4 leading-relaxed">
            At Innovix Solutions, we are dedicated to bridging the gap between academic learning and industry requirements. Our mission is to empower the next generation of tech innovators by providing immersive, hands-on internship experiences that prepare students for successful careers in the ever-evolving world of technology.
          </p>
        </div>
      </section>
      
      <section className="mb-12 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative p-6 bg-card rounded-lg ring-1 ring-gray-900/5">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Approach</h2>
          <p className="text-lg mb-4 leading-relaxed">
            We believe in learning by doing. Our internship programs are carefully crafted to provide:
          </p>
          <ul className="list-disc list-inside text-lg mb-4 space-y-2">
            <li>Practical, real-world project experience</li>
            <li>Mentorship from industry professionals</li>
            <li>Exposure to cutting-edge technologies and methodologies</li>
            <li>Soft skills development essential for career growth</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-12 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative p-6 bg-card rounded-lg ring-1 ring-gray-900/5">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Our Commitment</h2>
          <p className="text-lg mb-4 leading-relaxed">
            We are committed to fostering an inclusive, supportive learning environment where interns can explore, innovate, and grow. Our goal is not just to help students fulfill their college requirements, but to ignite a passion for technology and set them on a path to becoming future industry leaders.
          </p>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative p-6 bg-card rounded-lg ring-1 ring-gray-900/5">
            <h2 className="text-2xl font-semibold mb-4 text-primary">MSME Certified</h2>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative w-48 h-48 glow-card overflow-visible">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20msme-SBaJyYBMojwjzaRUjHKFSK7CnWDWtj.png"
                  alt="MSME Certification Logo"
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-xl -z-10"></div>
              </div>
              <div className="space-y-4 flex-1">
                <p className="text-lg leading-relaxed">
                  Innovix Solutions is proud to be certified under India's Ministry of Micro, Small and Medium Enterprises (MSME). This certification validates our commitment to excellence and adherence to national standards in providing quality internship and training programs.
                </p>
                <p className="text-lg leading-relaxed">
                  As an MSME certified organization, we are recognized by the Government of India for our contribution to skill development and entrepreneurship, ensuring that our internship programs meet the highest standards of quality and compliance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="relative group mb-12">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative p-6 bg-card rounded-lg ring-1 ring-gray-900/5">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Join Us</h2>
          <p className="text-lg mb-4 leading-relaxed">
            Are you ready to take the first step towards a rewarding career in technology? Join our internship program and be part of a community that values innovation, learning, and growth.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

