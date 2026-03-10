import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/journal/$entryId')({
  component: JournalEntryPage,
})

function JournalEntryPage() {
  const { entryId } = Route.useParams()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Catatan
      </h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        Paparan catatan #{entryId} akan datang di fasa seterusnya.
      </p>
    </div>
  )
}
