import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
})

function SettingsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Tetapan
      </h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        Tetapan profil dan akaun akan datang di fasa seterusnya.
      </p>
    </div>
  )
}
