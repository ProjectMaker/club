import Navigation from "./_Navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row gap-6">
      <Navigation />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}