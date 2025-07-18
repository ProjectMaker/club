import { User } from '@/models';
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface CustomJwtPayload extends JwtPayload {
  user_role: string;
}

// Fonctions utilitaires pour détecter l'environnement
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

export function isServer(): boolean {
  return typeof window === 'undefined'
}

export function isBrowser(): boolean {
  return typeof document !== 'undefined'
}

export function isNodeJS(): boolean {
  return !!(typeof process !== 'undefined' && process.versions && process.versions.node)
}

// Gestion automatique des instances Supabase
export async function getSupabaseClient() {
  if (isClient()) {
    // Côté client : utiliser l'import dynamique pour éviter les erreurs SSR
    const { createClient: createBrowserClient } = await import('@/lib/supabase-client')
    return createBrowserClient()
  } else {
    // Côté serveur : utiliser l'instance d'authentification pour lire les cookies de session
    const { createClient: createServerClient } = await import('@/lib/supabase-server')
    return await createServerClient()
  }
}

// Fonction pour récupérer l'access_token selon l'environnement
export async function getAccessToken(): Promise<string | null> {
  try {
    const supabase = await getSupabaseClient()
    const { data: sessionData, error } = await supabase.auth.getSession()
    
    if (error || !sessionData.session) {
      return null
    }
    
    return sessionData.session.access_token
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error)
    return null
  }
}

// Fonction pour vérifier si l'utilisateur est connecté
export async function isAuthenticated(): Promise<boolean> {
  try {
    const supabase = await getSupabaseClient()
    const { data: sessionData, error } = await supabase.auth.getSession()
    
    return !error && !!sessionData.session
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error)
    return false
  }
}

export async function getUser(): Promise<User | null> {
  const supabase = await getSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = await checkIsAdmin()
  return {...user, is_admin: isAdmin} as User
}

// Fonction pour récupérer le rôle utilisateur depuis le token
export async function getUserRole(): Promise<string | null> {
  try {
    const accessToken = await getAccessToken()
    
    if (!accessToken) {
      return null
    }
    
    const { user_role } = jwtDecode<CustomJwtPayload>(accessToken)
    return user_role || null
  } catch (error) {
    console.error('Erreur lors de la récupération du rôle:', error)
    return null
  }
}

// Fonction pour vérifier si l'utilisateur est admin (compatible client/serveur)
export async function checkIsAdmin(): Promise<boolean> {
  try {
    const userRole = await getUserRole()
    return userRole === 'admin'
  } catch (error) {
    console.error('Erreur lors de la vérification admin:', error)
    return false
  }
}