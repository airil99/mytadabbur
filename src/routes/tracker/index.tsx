import { createFileRoute } from '@tanstack/react-router'
import { CheckSquare } from 'lucide-react'
import { EmptyState } from '#/components/shared/EmptyState'

export const Route = createFileRoute('/tracker/')({
  component: TrackerPage,
})

function TrackerPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Penjejak Bacaan
      </h1>
      <EmptyState
        icon={<CheckSquare />}
        title="Penjejak belum aktif"
        description="Grid Juz dan Surah akan datang di fasa seterusnya."
      />
    </div>
  )
}
