import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { getMonthlyStats } from '#/server/functions/stats'

export function MonthlyChart() {
  const { getToken } = useAuth()
  const monthlyFn = useServerFn(getMonthlyStats)

  const { data: months } = useQuery({
    queryKey: ['stats', 'monthly'],
    queryFn: async () => {
      const clerkToken = (await getToken()) ?? ''
      return monthlyFn({ data: { clerkToken } })
    },
  })

  if (!months) return null

  const max = Math.max(...months.map((m) => m.count), 1)

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
      <h3 className="mb-4 text-sm font-semibold text-[var(--foreground)]">
        Catatan Bulanan
      </h3>

      <div className="flex items-end gap-1.5" style={{ height: 160 }}>
        {months.map((m) => {
          const height = max > 0 ? (m.count / max) * 100 : 0
          return (
            <div
              key={m.month}
              className="group flex flex-1 flex-col items-center gap-1"
            >
              {/* Tooltip */}
              <span className="text-[10px] font-medium text-[var(--foreground)] opacity-0 transition group-hover:opacity-100">
                {m.count}
              </span>
              {/* Bar */}
              <div
                className="w-full rounded-t-sm bg-[var(--primary)] transition-all duration-300 group-hover:opacity-80"
                style={{
                  height: `${Math.max(height, 2)}%`,
                  minHeight: m.count > 0 ? 4 : 2,
                }}
              />
              {/* Label */}
              <span className="text-[9px] text-[var(--muted-foreground)]">
                {m.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
