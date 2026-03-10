import { createFileRoute } from '@tanstack/react-router'
import { BookOpen } from 'lucide-react'
import { EmptyState } from '#/components/shared/EmptyState'

export const Route = createFileRoute('/journal/')({
  component: JournalPage,
})

function JournalPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Jurnal Tadabbur
      </h1>
      <EmptyState
        icon={<BookOpen />}
        title="Tiada catatan lagi"
        description="Mula menulis catatan tadabbur pertama anda."
      />
    </div>
  )
}
