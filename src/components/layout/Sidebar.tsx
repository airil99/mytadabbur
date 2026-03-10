import { Link } from '@tanstack/react-router'
import {
  BookOpen,
  PenLine,
  BarChart3,
  CheckSquare,
  Settings,
  BookMarked,
} from 'lucide-react'
import { cn } from '#/lib/utils'

const navItems = [
  { to: '/', label: 'Utama', icon: BookOpen },
  { to: '/journal', label: 'Jurnal', icon: PenLine },
  { to: '/tracker', label: 'Penjejak', icon: CheckSquare },
  { to: '/quran', label: 'Al-Quran', icon: BookMarked },
  { to: '/stats', label: 'Statistik', icon: BarChart3 },
  { to: '/settings', label: 'Tetapan', icon: Settings },
] as const

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'flex h-full w-60 flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar-background)]',
        className,
      )}
    >
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === '/' }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[var(--sidebar-foreground)] no-underline transition hover:bg-[var(--sidebar-accent)]"
              activeProps={{
                className:
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium no-underline bg-[var(--sidebar-accent)] text-[var(--sidebar-primary)]',
              }}
            >
              <item.icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
