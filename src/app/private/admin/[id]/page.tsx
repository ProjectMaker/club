import Link from "next/link";

import { getUser } from "@/data-access-layers/users";
import UserForm from "../_Form";

export default async function AdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log('id', id)
  const user = await getUser(id)
  return (
    <div className="w-7xl">
      <Link
				href={'/private/admin'}
				className="mb-6 flex items-center cursor-pointer text-white/80 hover:text-white transition-colors duration-200 mt-3"
			>
				<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
				Retour à la liste
			</Link>
      <UserForm defaultValues={user} />
    </div>
  )
}