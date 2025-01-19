"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])
  
  useEffect(() => {
    if (!isOpen) return
    
    // Play success sound
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3')
    audio.play().catch(e => console.log("Audio playback failed:", e))
    
    // Create initial particles
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD']
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
    setParticles(initialParticles)
    
    // Add more particles periodically
    const interval = setInterval(() => {
      setParticles(prev => {
        if (prev.length >= 100) return prev // Limit max particles
        return [...prev, {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          color: colors[Math.floor(Math.random() * colors.length)]
        }]
      })
    }, 200)
    
    return () => {
      clearInterval(interval)
      setParticles([])
    }
  }, [isOpen])

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(360deg); opacity: 0; }
        }
        
        @keyframes firework {
          0% { transform: translate(var(--x), var(--initialY)); width: var(--initialSize); opacity: 1; }
          50% { width: 0.5vmin; opacity: 1; }
          100% { width: var(--finalSize); opacity: 0; }
        }

        .celebration-particle {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          border-radius: 50%;
          animation: float 3s linear forwards;
        }

        .firework,
        .firework::before,
        .firework::after {
          --initialSize: 0.5vmin;
          --finalSize: 45vmin;
          --particleSize: 0.2vmin;
          --color1: yellow;
          --color2: khaki;
          --color3: white;
          --color4: lime;
          --color5: gold;
          --color6: mediumseagreen;
          --y: -30vmin;
          --x: -50%;
          --initialY: 60vmin;
          content: "";
          animation: firework 2s infinite;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, var(--y));
          width: var(--initialSize);
          aspect-ratio: 1;
          background:
            radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 0% 0%,
            radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 0%,
            radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 100% 100%,
            radial-gradient(circle, var(--color4) var(--particleSize), #0000 0) 0% 100%,
            radial-gradient(circle, var(--color5) var(--particleSize), #0000 0) 50% 0%,
            radial-gradient(circle, var(--color6) var(--particleSize), #0000 0) 50% 100%,
            radial-gradient(circle, var(--color1) var(--particleSize), #0000 0) 0% 50%,
            radial-gradient(circle, var(--color2) var(--particleSize), #0000 0) 100% 50%,
            radial-gradient(circle, var(--color3) var(--particleSize), #0000 0) 50% 50%;
          background-size: 0.5vmin 0.5vmin;
          background-repeat: no-repeat;
        }
      `}</style>

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Application Submitted Successfully! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              We're excited to review your application for Innovix Solutions.
            </DialogDescription>
          </DialogHeader>
          <div className="text-center space-y-4 py-4">
            <p className="text-lg">
              Thank you for applying to Innovix Solutions. We've received your application and will review it shortly.
            </p>
            <p className="text-lg">
              You will receive a confirmation email soon with further details.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Floating particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="celebration-particle"
                style={{
                  '--tx': `${Math.random() * 200 - 100}px`,
                  '--ty': `${Math.random() * -200 - 100}px`,
                  left: particle.x,
                  top: particle.y,
                  background: particle.color,
                  width: Math.random() * 10 + 5 + 'px',
                  height: Math.random() * 10 + 5 + 'px',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              />
            ))}
            
            {/* Fireworks */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <div className="firework" style={{ '--x': '30vmin' as string }}></div>
              <div className="firework" style={{ '--x': '-30vmin' as string }}></div>
              <div className="firework" style={{ '--x': '0vmin' as string }}></div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

