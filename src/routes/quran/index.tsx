import { createFileRoute } from '@tanstack/react-router'
import { BookMarked } from 'lucide-react'
import { EmptyState } from '#/components/shared/EmptyState'

export const Route = createFileRoute('/quran/')({
  component: QuranPage,
})

function QuranPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Al-Quran
      </h1>
      <EmptyState
        icon={<BookMarked />}
        title="Senarai 114 Surah"
        description="Senarai surah dan paparan ayat akan datang di fasa seterusnya."
      />
    </div>
  )
}
