'use client'

import Link from "next/link";
import { useState, useRef, useActionState, useTransition, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import { logout } from '@/actions/auth-logout'
import { User } from "@/models";

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

  console.log(user)

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
            {
              user && (
                <>
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
                  <Link
                    href="/pressings"
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${pathname.indexOf('/pressings') === 0
                      ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    Pressings
                  </Link>
                  <Link
                    href="/materials"
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${pathname.indexOf('/materials') === 0
                      ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    Matériel
                  </Link>
                </>
              )}


            {/* Mon espace - Dropdown */}
            {user && (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center space-x-1 ${pathname.indexOf('/profile') === 0 || pathname.indexOf('/admin') === 0
                    ? 'text-white bg-blue-500/50 backdrop-blur-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <span>Mon espace</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

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
                    <Link
                      href="/profile/materials"
                      className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 rounded-lg mx-2 ${pathname.indexOf('/profile/materials') === 0
                        ? 'text-blue-300 bg-blue-500/30 shadow-sm'
                        : 'text-white/90 hover:text-blue-300 hover:bg-white/10'
                        }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Matériel</span>
                    </Link>
                    {user?.is_admin && (
                      <Link
                        href="/private/profile/laundries"
                        className={`flex items-center cursor-pointer space-x-3 px-4 py-3 text-sm transition-all duration-200 rounded-lg mx-2 ${pathname.indexOf('/profile/laundries') === 0
                          ? 'text-blue-300 bg-blue-500/30 shadow-sm'
                          : 'text-white/90 hover:text-blue-300 hover:bg-white/10'
                          }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M7 12h10" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M7 16h10" />
                        </svg>
                        <span>Laveries</span>
                      </Link>
                    )}
                    {user?.is_admin && (
                      <Link
                        href="/profile/pressings"
                        className={`flex items-center cursor-pointer space-x-3 px-4 py-3 text-sm transition-all duration-200 rounded-lg mx-2 ${pathname.indexOf('/profile/pressings') === 0
                          ? 'text-blue-300 bg-blue-500/30 shadow-sm'
                          : 'text-white/90 hover:text-blue-300 hover:bg-white/10'
                          }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                        <span>Pressings</span>
                      </Link>
                    )}
                    {user?.is_admin && (
                      <Link
                        href="/admin"
                        className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 rounded-lg mx-2 ${pathname.indexOf('/admin/onboarding-users') === 0
                          ? 'text-blue-300 bg-blue-500/30 shadow-sm'
                          : 'text-white/90 hover:text-blue-300 hover:bg-white/10'
                          }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span>Administration</span>
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 rounded-lg mx-2 ${pathname === '/profile'
                        ? 'text-blue-300 bg-blue-500/30 shadow-sm'
                        : 'text-white/90 hover:text-blue-300 hover:bg-white/10'
                        }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Infos</span>
                    </Link>
                    <div className="border-t border-white/10 mx-2 my-2" />
                    <Logout />
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}