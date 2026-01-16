import { getUser } from "@/utils/auth";
import Navigation from "./_Navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  return (
    <div className="flex flex-row gap-6">
      <Navigation user={user} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}