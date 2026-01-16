'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { User } from '@/models'


const salesItem = [
  {
    name: 'Laveries',
    href: '/private/admin/laundries',
  },
  {
    name: 'Pressings',
    href: '/private/admin/pressings',
  },
  {
    name: 'Matériel',
    href: '/private/admin/materials',
  }
]

const usersItems = [
  {
    name: 'Utilisateurs inscrits',
    href: '/private/admin/users?approved=true',
  },
  {
    name: 'Utilisateurs en attente',
    href: '/private/admin/users?approved=false',
  },
  {
    name: 'Analytics',
    href: '/private/admin/analytics',
  }
];

const ButtonLink = ({ name, href, isActive }: { name: string, href: string, isActive: boolean }) => {
  return (
    <Link
      href={href}
      className={`py-2 px-3 border-l-4 font-medium text-sm transition-colors rounded-r ${isActive
        ? 'border-blue-400 text-blue-300 bg-white/10'
        : 'border-transparent text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5'
        }`}
    >
      {name}
    </Link>
  )
}

const SalesNavigation = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="flex items-center gap-2 text-base font-semibold text-white mb-1">
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2a5 5 0 00-1 9.584V19a2 2 0 002 2h8a2 2 0 002-2v-.416A5 5 0 0017 9z" />
        </svg>
        <span>Annonces</span>
      </h3>
      {salesItem.map((item) => {
        let isActive = false
        let show = true
        if (pathname === '/private/admin/laundries') {
          isActive = item.href.indexOf('/private/admin/laundries') === 0 ? true : false;
          show = user?.is_admin ? true : false;
        } else if (pathname === '/private/admin/pressings') {
          isActive = item.href.indexOf('/private/admin/pressings') === 0 ? true : false;
          show = user?.is_admin ? true : false;
        } else if (pathname === '/private/admin/materials') {
          isActive = item.href.indexOf('/private/admin/materials') === 0 ? true : false;
        }
        
        return show ? <ButtonLink name={item.name} href={item.href} isActive={isActive} key={item.href} /> : null;
      })}
    </div>
  )
}

const UsersNavigation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isApproved = searchParams.get('approved') === 'true';
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="flex items-center gap-2 text-base font-semibold text-white mb-1">
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11c1.657 0 3 1.343 3 3v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2c0-1.657 1.343-3 3-3" />
          <circle cx="9" cy="7" r="3" strokeWidth={2} />
          <circle cx="15" cy="7" r="3" strokeWidth={2} />
        </svg>
        <span>Utilisateurs</span>
      </h3>
      {usersItems.map((item) => {
        let isActive = false
        if (pathname.indexOf('/private/admin/users') === 0) {
          if (item.href.indexOf('/private/admin/users?approved=true') === 0) {
            isActive = isApproved ? true : false;
          } else if (item.href.indexOf('/private/admin/users?approved=false') === 0) {
            isActive = !isApproved ? true : false;
          }
        }
        
        return <ButtonLink name={item.name} href={item.href} key={item.href} isActive={isActive} />
      })}
    </div>
  )
}

const OtherNavigation = () => {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="flex items-center gap-2 text-base font-semibold text-white mb-1">
        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12V4" />
        </svg>
        <span>Autres</span>
      </h3>
    </div>
  )
}
export default function AdminNavigation({ user }: { user: User | null }) {
  return (
    <nav className="w-64 flex-shrink-0 pt-3">
      <div className="flex flex-col space-y-2 gap-3">
        <SalesNavigation user={user} />
        {
          user?.is_admin && (
            <UsersNavigation />
          )
        }
      </div>
    </nav>
  );
}
