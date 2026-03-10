import { Link, createFileRoute } from '@tanstack/react-router'
import { PenLine, CheckSquare, BookMarked, BarChart3 } from 'lucide-react'
import { Bismillah } from '#/components/shared/Bismillah'

export const Route = createFileRoute('/')({ component: DashboardPage })

const quickLinks = [
  {
    to: '/journal/new',
    label: 'Tulis Catatan',
    description: 'Catat refleksi tadabbur hari ini.',
    icon: PenLine,
  },
  {
    to: '/tracker',
    label: 'Penjejak Bacaan',
    description: 'Jejak progress Juz dan Surah.',
    icon: CheckSquare,
  },
  {
    to: '/quran',
    label: 'Al-Quran',
    description: 'Baca dan terokai 114 surah.',
    icon: BookMarked,
  },
  {
    to: '/stats',
    label: 'Statistik',
    description: 'Lihat ringkasan dan pencapaian.',
    icon: BarChart3,
  },
] as const

function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <Bismillah size="sm" className="mb-4 text-[var(--muted-foreground)]" />
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          Assalamualaikum
        </h1>
        <p className="mt-1 text-sm text-[var(--muted-foreground)]">
          Selamat datang ke MyTadabbur. Mulakan tadabbur hari ini.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-[var(--accent)]">
              <item.icon className="size-5 text-[var(--primary)]" />
            </div>
            <h2 className="text-base font-semibold text-[var(--foreground)]">
              {item.label}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
