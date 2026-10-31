import type { Metadata } from "next";

// Pages de compte : utiles aux membres, sans intérêt dans les résultats de recherche
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children
}
