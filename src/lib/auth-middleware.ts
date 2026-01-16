import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import { createServiceClient } from './supabase-service'
import { getUser } from '@/utils/auth'
import { User } from '@/models'

async function addAnalytics({ user, request }: { user: User | null, request: NextRequest }) {
  if (!user) {
    return
  }
  if (process.env.NODE_ENV === 'development') {
    return
  }

  let code
  if (request.nextUrl.pathname.indexOf('/private/laundries') === 0) {
    code = 'laundries'
  } else if (request.nextUrl.pathname.indexOf('/private/materials') === 0) {
    code = 'materials'
  } else if (request.nextUrl.pathname.indexOf('/private/pressings') === 0) {
    code = 'pressings'
  }
  
  if (code) {
    const serviceClient = createServiceClient()
    await serviceClient
      .from('analytics')
      .insert({
        path: request.nextUrl.pathname,
        user_id: user.id,
        code,
      })
  }
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )


  const user = await getUser()

  // Vérifier si c'est une requête vers une page privée
  const isPrivatePage = request.nextUrl.pathname.startsWith('/private')
  const isAdminPage = request.nextUrl.pathname.startsWith('/private/admin') 
    && !request.nextUrl.pathname.startsWith('/private/admin/materials')
  
  if ((!user && isPrivatePage) || (!user?.is_admin && isAdminPage)) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Si l'utilisateur est connecté et accède à une page privée, vérifier is_approved
  if (user && isPrivatePage) {
    await addAnalytics({user, request})
    const serviceClient = createServiceClient()

    const { data: userData } = await serviceClient
      .from('users')
      .select('is_approved')
      .eq('id', user.id)
      .single()

    // Si l'utilisateur n'est pas approuvé, déconnecter et rediriger
    if (!userData?.is_approved) {
      await supabase.auth.signOut()
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('error', 'account_not_approved')
      return NextResponse.redirect(url)
    }
    
  }
  
  return supabaseResponse
}