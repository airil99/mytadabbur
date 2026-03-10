import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/quran/$surahNumber')({
  component: SurahDetailPage,
})

function SurahDetailPage() {
  const { surahNumber } = Route.useParams()

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Surah #{surahNumber}
      </h1>
      <p className="text-sm text-[var(--muted-foreground)]">
        Paparan ayat Arab + terjemahan akan datang di fasa seterusnya.
      </p>
    </div>
  )
}
