'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  supabase: ReturnType<typeof createClient>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const [supabase] = useState(() => createClient())
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      setInitialLoadComplete(true)
    }

    getUser()

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      setInitialLoadComplete(true)

      // Gestion des redirections
      if (event === 'SIGNED_OUT') {
        // Rediriger vers la page de connexion si on est sur une page privée
        if (pathname.startsWith('/private')) {
          router.push('/login')
        }
      }

      if (event === 'SIGNED_IN') {
        // Si connecté et sur page de connexion, rediriger vers l'accueil
        if (pathname === '/login') {
          router.push('/')
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, pathname, router])

  // Protection des pages privées avec double vérification
  useEffect(() => {
    if (initialLoadComplete && !loading && !user && pathname.startsWith('/private')) {
      const timeoutId = setTimeout(() => {
        // Double vérification après délai
        supabase.auth.getUser().then(({ data: { user: reVerifiedUser } }) => {
          if (!reVerifiedUser) {
            router.push('/login')
          } else {
            setUser(reVerifiedUser)
          }
        })
      }, 1000) // Délai pour synchronisation avec le serveur

      return () => clearTimeout(timeoutId)
    }
  }, [user, loading, pathname, router, initialLoadComplete, supabase])

  const value = {
    user,
    loading,
    supabase
  }

  return (
    <AuthContext.Provider value={value}>
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