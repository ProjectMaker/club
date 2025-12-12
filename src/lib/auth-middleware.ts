import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

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
  
  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const {
    data: { user },
    error
  } = await supabase.auth.getUser()
  
  // Vérifier si c'est une requête vers une page privée
  const isPrivatePage = request.nextUrl.pathname.startsWith('/private')
  
  if (!user && isPrivatePage) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // Si l'utilisateur est connecté et accède à une page privée, vérifier is_approved
  if (user && isPrivatePage) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (serviceRoleKey) {
      const serviceClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        }
      )

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
  }
  
  return supabaseResponse
}