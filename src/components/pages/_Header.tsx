'use client'

import Link from "next/link";
import { useState, useRef, useActionState, useTransition, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import { logout } from '@/actions/auth-logout'



export default function Header() {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 150)
  }



  return (
    <header className="w-full bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-indigo-900/95 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Titre */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">
              <a href="/" className="hover:text-blue-200 transition-colors">
                ClubManager
              </a>
            </h1>
          </div>


          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-all duration-200 ${pathname === '/'
                ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
            >
              Accueil
            </Link>
            
              <Link
                href="/private/laundries"
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${pathname.indexOf('/private/laundries') === 0
                  ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                Laveries
              </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}