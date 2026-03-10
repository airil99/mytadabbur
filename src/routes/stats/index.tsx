import { createFileRoute } from '@tanstack/react-router'
import { BarChart3 } from 'lucide-react'
import { EmptyState } from '#/components/shared/EmptyState'

export const Route = createFileRoute('/stats/')({
  component: StatsPage,
})

function StatsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Statistik
      </h1>
      <EmptyState
        icon={<BarChart3 />}
        title="Tiada data lagi"
        description="Statistik dan analitik akan muncul selepas anda mula menulis catatan."
      />
    </div>
  )
}
