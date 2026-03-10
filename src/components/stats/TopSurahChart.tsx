import { useAuth } from '@clerk/clerk-react'
import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { getTopSurahs } from '#/server/functions/stats'

export function TopSurahChart() {
  const { getToken } = useAuth()
  const topFn = useServerFn(getTopSurahs)

  const { data: surahs } = useQuery({
    queryKey: ['stats', 'top-surahs'],
    queryFn: async () => {
      const clerkToken = (await getToken()) ?? ''
      return topFn({ data: { clerkToken } })
    },
  })

  if (!surahs || surahs.length === 0) return null

  const max = Math.max(...surahs.map((s) => s.count), 1)

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
      <h3 className="mb-4 text-sm font-semibold text-[var(--foreground)]">
        Surah Paling Banyak Ditulis
      </h3>

      <div className="space-y-2">
        {surahs.map((surah) => {
          const width = (surah.count / max) * 100
          return (
            <div key={surah.surahNumber} className="flex items-center gap-3">
              <span className="w-6 shrink-0 text-right text-xs font-medium text-[var(--muted-foreground)]">
                {surah.surahNumber}
              </span>
              <div className="flex-1">
                <div className="mb-0.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--foreground)]">
                    {surah.surahName}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {surah.count}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--muted)]">
                  <div
                    className="h-2 rounded-full bg-[var(--primary)] transition-all duration-300"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
