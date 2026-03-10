import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/journal/new')({
  component: NewJournalPage,
})

function NewJournalPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Tulis Catatan Baru
      </h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        Form catatan akan datang di fasa seterusnya.
      </p>
    </div>
  )
}
