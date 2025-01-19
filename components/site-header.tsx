"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { BRAND, ROUTES } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { HomeIcon, FileText, Info, Phone, Menu, X } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

const menuItems = [
  { path: ROUTES.home, label: "Home", icon: HomeIcon },
  { path: ROUTES.apply, label: "Apply", icon: FileText },
  { path: ROUTES.about, label: "About", icon: Info },
  { path: ROUTES.contact, label: "Contact", icon: Phone },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-xl shadow-md" : "bg-transparent"
    )}>
      <div className="container relative flex h-16 items-center justify-between px-4">
        <div className="flex items-center flex-1 md:flex-initial">
          <button
            className="p-2 -ml-2 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-4 ml-4">
            {menuItems.slice(0, 3).map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                href={path}
                className={cn(
                  "flex items-center space-x-1 px-2 py-1 text-sm rounded-full transition-colors",
                  pathname === path
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-removebg-preview-K4z7b8mPtKBMf2i9ftSVJMoLBPCx0n.png"
                alt="Innovix Solutions Logo"
                className="h-8 w-auto"
              />
              <span className="font-bold text-lg hidden sm:inline">InnoviX Solutions</span>
            </motion.div>
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 md:flex-initial justify-end">
          <Button asChild size="sm" className="rounded-full gradient-bg">
            <Link href="/apply">Apply Now</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-b md:hidden overflow-hidden",
          !isMounted && "invisible" 
        )}
      >
        <nav className="container py-4">
          <ul className="space-y-2">
            {menuItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 text-sm rounded-lg transition-colors",
                    pathname === path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
            <li>
              <Button asChild size="sm" className="w-full justify-start rounded-lg gradient-bg">
                <Link href="/apply" onClick={() => setIsOpen(false)}>Apply Now</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </motion.div>
    </header>
  )
}

