import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { JournalList } from '#/components/journal/JournalList'

const searchSchema = z.object({
  surahNumber: z.number().optional(),
  mood: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['newest', 'oldest', 'surah-asc', 'surah-desc']).optional(),
})

export const Route = createFileRoute('/journal/')({
  validateSearch: searchSchema,
  component: JournalPage,
})

function JournalPage() {
  const filters = Route.useSearch()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Jurnal Tadabbur
      </h1>
      <JournalList {...filters} />
    </div>
  )
}
