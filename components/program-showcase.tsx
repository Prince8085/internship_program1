"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const images = [
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(5)-PgYLJoMChvAFToHcs0VX3mz4qRp1l3.jpeg",
    alt: "Innovix Solutions Internship Program presentation in a large auditorium",
    caption: "Join Our Comprehensive Internship Program"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(7)-0tCCEcRFkVk6CWednuP7C5Kms1jUNs.jpeg",
    alt: "Interactive session at Innovix Solutions",
    caption: "Learn from Industry Experts"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(6).jpeg-CVCRZLAbg7pyhvW2M8VS2iMJkyTF0a.png",
    alt: "Modern internship event setup with digital displays",
    caption: "Experience Modern Learning Environment"
  },
  {
    url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(4).jpeg-lFlPA7doYhQxLmdDN3TXtXmIJr395w.png",
    alt: "Networking and group discussions at Innovix",
    caption: "Collaborate with Fellow Innovators"
  }
]

export function ProgramShowcase() {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  const prev = () => setCurrentIndex((current) => (current === 0 ? images.length - 1 : current - 1))
  const next = () => setCurrentIndex((current) => (current === images.length - 1 ? 0 : current + 1))

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="relative overflow-hidden rounded-xl">
        <div className="relative aspect-[16/9]">
          {images.map((image, index) => (
            <div
              key={image.url}
              className={cn(
                "absolute inset-0 transition-transform duration-500 ease-in-out",
                index === currentIndex ? "translate-x-0" : index < currentIndex ? "-translate-x-full" : "translate-x-full"
              )}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xl md:text-2xl font-bold">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={prev}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous slide</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={next}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next slide</span>
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
              )}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

