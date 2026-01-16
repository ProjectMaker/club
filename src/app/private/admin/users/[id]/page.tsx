import { getUser } from "@/data-access-layers/users";
import UserForm from "./_Form";
import BackButton from "./_BackButton";

export default async function AdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUser(id)
  return (
    <div className="w-7xl">
      <BackButton />
      <UserForm defaultValues={user} />
    </div>
  )
}