'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
    {
        name: 'Utilisateurs inscrits',
        href: '/private/profile/admin',
    },
    {
        name: 'Utilisateurs en attente',
        href: '/private/profile/admin//onboarding-users',
    },/*
    {
        name: 'Analytics',
        href: '/admin/analytics',
    },*/
];

export default function AdminNavigation() {
    const pathname = usePathname();

    return (
        <nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex space-x-8">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${isActive
                                    ? 'border-blue-400 text-blue-300'
                                    : 'border-transparent text-white/70 hover:text-white hover:border-white/30'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
