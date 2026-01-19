'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useActionState, useTransition } from 'react'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import { logout } from '@/actions/auth-logout'
import { User } from "@/models";
import MobileMenu from "./MobileMenu";

// Composant de loading overlay
const LogoutLoadingOverlay = () => {
  const overlayContent = (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999
      }}
    >
      <div className="text-white text-center">
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-lg font-medium">Déconnexion en cours...</div>
      </div>
    </div>
  );

  // Utiliser un portal pour rendre au niveau du body
  return typeof window !== 'undefined'
    ? createPortal(overlayContent, document.body)
    : null;
}

function Logout() {
  const [state, formAction] = useActionState(logout, null as any);
  const [isTransitioning, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      formAction(null);
    });
  };

  return (
    <>
      {isTransitioning && <LogoutLoadingOverlay />}
      <button
        onClick={handleLogout}
        className="w-full cursor-pointer text-left flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 rounded-lg mx-2 text-white/90 hover:text-red-400 hover:bg-white/10"
        disabled={isTransitioning}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        <span>{isTransitioning ? 'Déconnexion...' : 'Déconnexion'}</span>
      </button>
    </>
  )
}
export default function Header({ user }: { user: User | null }) {
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
      <div className="max-w-7xl mx-auto  ">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Titre */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-white">
              <Link href="/" className="hover:text-blue-200 transition-colors">
                <Image
                  src="/club-laverie-logo.svg"
                  alt="Club Laverie"
                  width={260}
                  height={80}
                  className="text-white"
                />
              </Link>
            </h1>
          </div>


          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {
              user && (
                <>
                  <Link
                    href="/private/laundries"
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${pathname.indexOf('/private/laundries') === 0
                      ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    Laveries
                  </Link>
                  <Link
                    href="/private/pressings"
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${pathname.indexOf('/private/pressings') === 0
                      ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    Pressings
                  </Link>
                  <Link
                    href="/private/materials"
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${pathname.indexOf('/private/materials') === 0
                      ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    Matériel
                  </Link>
                  <Link
                    href={user?.is_admin ? '/private/admin/users?approved=true' : '/private/admin/materials'}
                    className={`px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${pathname.indexOf('/private/admin') === 0
                      ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    Mon espace
                  </Link>
                  <Logout />
                </>
              )}


            {/* Mon espace - Dropdown */}
            {user && (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-48 
                                bg-gradient-to-br from-slate-800/95 via-blue-900/95 to-indigo-900/95 
                                backdrop-blur-lg rounded-xl shadow-2xl shadow-black/40 
                                border border-white/10 py-3
                                transform transition-all duration-200 ease-out scale-100 opacity-100 translate-y-0
                                before:content-[''] before:absolute before:-top-2 before:left-6 
                                before:w-0 before:h-0 before:border-l-8 before:border-r-8 before:border-b-8
                                before:border-l-transparent before:border-r-transparent before:border-b-slate-800/95">
                    
                    <div className="border-t border-white/10 mx-2 my-2" />
                    
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Menu mobile */}
          {user && <MobileMenu />}
        </div>
      </div>
    </header>
  )
}