import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tracker/khatam')({
  component: KhatamPage,
})

function KhatamPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Kitaran Khatam
      </h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        Sejarah dan kitaran khatam akan datang di fasa seterusnya.
      </p>
    </div>
  )
}
