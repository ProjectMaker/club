'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
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
  
  const pathname = usePathname()
  const router = useRouter()
  
  // Fonction pour synchroniser l'état d'authentification
  const syncAuthState = async () => {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    setUser(user)
    setLoading(false)
  }

  // Effet pour l'initialisation de l'auth
  useEffect(() => {
    const supabase = createClient()
    
    // Synchronisation initiale
    syncAuthState()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session?.user?.email)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Resynchroniser quand la fenêtre reprend le focus (au cas où l'auth aurait changé côté serveur)
    const handleFocus = () => {
      syncAuthState()
    }

    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        syncAuthState()
      }
    })

    return () => {
      subscription.unsubscribe()
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', () => {
        if (!document.hidden) {
          syncAuthState()
        }
      })
    }
  }, [])

  useEffect(() => {
    if (pathname === '/' || pathname.startsWith('/private')) {
      // Resynchroniser l'état quand on arrive sur une page qui pourrait nécessiter une mise à jour de l'auth
      syncAuthState()
    }
  }, [pathname])

  useEffect(() => {
    if (loading) return // Attendre que l'auth soit initialisée

    if (!user && pathname.startsWith('/private')) {
      router.push('/login')
      return
    }
  }, [user, loading, pathname, router])

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