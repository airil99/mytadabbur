import { createFileRoute } from '@tanstack/react-router'
import { StatsOverview } from '#/components/stats/StatsOverview'
import { MonthlyChart } from '#/components/stats/MonthlyChart'
import { TopSurahChart } from '#/components/stats/TopSurahChart'

export const Route = createFileRoute('/stats/')({
  component: StatsPage,
})

function StatsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Statistik
      </h1>

      <div className="space-y-6">
        <StatsOverview />

        <div className="grid gap-6 md:grid-cols-2">
          <MonthlyChart />
          <TopSurahChart />
        </div>
      </div>
    </div>
  )
}
