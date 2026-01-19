'use client'

import Link from "next/link"
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type NavItem = {
  href: string
  label: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/private/laundries',
    label: 'Laveries',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    href: '/private/pressings',
    label: 'Pressings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    href: '/private/materials',
    label: 'Matériels',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

const HamburgerIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const MobileMenu = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  // Fermer le menu lors du changement de route
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname.indexOf(href) === 0

  return (
    <div className="md:hidden">
      {/* Bouton hamburger */}
      <button 
        onClick={handleToggle}
        className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isOpen}
        tabIndex={0}
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}

      {/* Panel de navigation */}
      <nav 
        className={`
          fixed top-20 left-0 right-0 z-50
          bg-gradient-to-br from-blue-900/98 via-blue-800/98 to-indigo-900/98 
          backdrop-blur-lg border-b border-white/20
          transform transition-all duration-300 ease-out
          ${isOpen 
            ? 'translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-y-4 opacity-0 pointer-events-none'
          }
        `}
        aria-label="Menu de navigation mobile"
      >
        <div className="flex flex-col py-4 px-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleClose}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive(item.href)
                  ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
                }
              `}
              tabIndex={isOpen ? 0 : -1}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default MobileMenu

