import Navigation from "./_Navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Navigation />
      {children}
    </div>
  )
}