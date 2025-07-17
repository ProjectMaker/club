'use client'

import { useAuth } from '@/contexts/AuthContext'
import AuthLoader from '@/components/ui/AuthLoader'
import Header from '@/components/pages/Header'
import { ReactNode } from 'react'

interface AuthWrapperProps {
  children: ReactNode
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { loading } = useAuth()

  if (loading) {
    return <AuthLoader />
  }

  return (
    <>
      <Header />
      <div className=" flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900  min-h-screen">
        <div className="max-w-7xl">
          {children}
        </div>
      </div>
    </>
  )
}

export default AuthWrapper 