'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  {
    name: 'Utilisateurs inscrits',
    href: '/private/admin',
  },
  {
    name: 'Utilisateurs en attente',
    href: '/private/admin/onboarding-users',
  },/*
    {
        name: 'Analytics',
        href: '/admin/analytics',
    },*/
];

export default function AdminNavigation() {
  const pathname = usePathname();

  // Trier les items par longueur décroissante pour vérifier d'abord les routes les plus spécifiques
  const sortedItems = [...navigationItems].sort((a, b) => b.href.length - a.href.length);

  return (
    <nav className="w-64 flex-shrink-0">
      <div className="flex flex-col space-y-2">
        {navigationItems.map((item) => {
          // Vérifier si cette route correspond, mais seulement si aucune route plus spécifique ne correspond
          const matchesThisRoute = pathname === item.href || pathname.startsWith(item.href + '/');
          const hasMoreSpecificMatch = sortedItems.some(
            otherItem => otherItem.href.length > item.href.length &&
              (pathname === otherItem.href || pathname.startsWith(otherItem.href + '/'))
          );
          const isActive = matchesThisRoute && !hasMoreSpecificMatch;
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
