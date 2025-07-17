'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Initialiser supabase une seule fois
  const pathname = usePathname()
  const router = useRouter()
  
  // Stabiliser router avec useRef
  // Effet pour l'initialisation de l'auth (une seule fois)
  useEffect(() => {
    const supabase = createClient()
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, []) // Seulement supabase comme dépendance

  // Effet séparé pour la gestion des redirections
  useEffect(() => {
    if (loading) return // Attendre que l'auth soit initialisée

    if (!user && pathname.startsWith('/private')) {
      router.push('/login')
    }

    if (user && pathname === '/login') {
      router.push('/')
    }
  }, [user, loading, pathname]) // Enlever router des dépendances

  // Refs pour tracker les changements de dépendances
  return (
    <AuthContext.Provider value={{user, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  return context
} 