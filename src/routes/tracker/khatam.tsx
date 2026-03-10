import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { KhatamTimeline } from '#/components/tracker/KhatamTimeline'
import { StartKhatamForm } from '#/components/tracker/StartKhatamForm'

export const Route = createFileRoute('/tracker/khatam')({
  component: KhatamPage,
})

function KhatamPage() {
  return (
    <div>
      {/* Back */}
      <Link
        to="/tracker"
        className="mb-4 inline-flex items-center gap-1 text-sm text-[var(--muted-foreground)] no-underline hover:text-[var(--foreground)]"
      >
        <ArrowLeft className="size-4" />
        Penjejak Bacaan
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Kitaran Khatam
      </h1>

      <div className="space-y-6">
        <StartKhatamForm />
        <KhatamTimeline />
      </div>
    </div>
  )
}
