import { Link } from '@tanstack/react-router'
import ClerkHeader from '../integrations/clerk/header-user.tsx'
import ThemeToggle from './ThemeToggle'
import { MobileNav } from './layout/MobileNav'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <div className="flex h-14 items-center gap-3">
        {/* Mobile hamburger */}
        <MobileNav />

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[var(--foreground)] no-underline"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,var(--lagoon),var(--palm))]" />
          <span className="text-base font-bold tracking-tight">
            MyTadabbur
          </span>
        </Link>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <ClerkHeader />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
