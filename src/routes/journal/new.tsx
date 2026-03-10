import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Bismillah } from '#/components/shared/Bismillah'
import { JournalForm } from '#/components/journal/JournalForm'

const searchSchema = z.object({
  surah: z.number().optional(),
  ayah: z.number().optional(),
})

export const Route = createFileRoute('/journal/new')({
  validateSearch: searchSchema,
  component: NewJournalPage,
})

function NewJournalPage() {
  const { surah, ayah } = Route.useSearch()

  return (
    <div>
      <Bismillah size="sm" className="mb-4 text-[var(--muted-foreground)]" />
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Tulis Catatan Baru
      </h1>
      <JournalForm
        defaultValues={
          surah
            ? { surahNumber: surah, ayahStart: ayah ?? null }
            : undefined
        }
      />
    </div>
  )
}
