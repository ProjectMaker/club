'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const navigationItems = [
  {
    name: 'Utilisateurs inscrits',
    href: '/private/admin?approved=true',
  },
  {
    name: 'Utilisateurs en attente',
    href: '/private/admin?approved=false',
  },
  {
    name: 'Analytics',
    href: '/private/admin/analytics',
  }
];

export default function AdminNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isApproved = searchParams.get('approved') === 'true';
  
  return (
    <nav className="w-64 flex-shrink-0">
      <div className="flex flex-col space-y-2">
        {navigationItems.map((item) => {
          let isActive = false
          if (item.href === '/private/admin?approved=true' && pathname.indexOf('/private/admin/analytics') === -1 && isApproved) {
            isActive = true
          } else if (item.href === '/private/admin?approved=false' && pathname.indexOf('/private/admin/analytics') === -1 && !isApproved) {
            isActive = true
          } else if (item.href === '/private/admin/analytics' && pathname.indexOf('/private/admin/analytics') === 0) {
            isActive = true
          }
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`py-3 px-4 border-l-4 font-medium text-sm transition-colors rounded-r ${isActive
                ? 'border-blue-400 text-blue-300 bg-white/10'
                : 'border-transparent text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5'
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
