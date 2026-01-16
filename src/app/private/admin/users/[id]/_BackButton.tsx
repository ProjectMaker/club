'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const BackButton = () => {
  const searchParams = useSearchParams()
  const isApproved = searchParams.get('approved') === 'true'
  return (
    <Link
      href={`/private/admin/users?approved=${isApproved}`}
      className="mb-6 flex items-center cursor-pointer text-white/80 hover:text-white transition-colors duration-200 mt-3"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      Retour à la liste
    </Link> 
  )
}

export default BackButton