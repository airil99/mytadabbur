import { Link } from '@tanstack/react-router'
import { Calendar, BookOpen } from 'lucide-react'
import { cn } from '#/lib/utils'
import { moodLabels } from '#/lib/validators/journal'

interface JournalCardProps {
  entry: {
    id: string
    surahNumber: number
    surahName: string
    ayahStart: number | null
    ayahEnd: number | null
    reflection: string
    mood: string | null
    tags: string | null
    date: string
  }
  className?: string
}

const moodEmojis: Record<string, string> = {
  grateful: '🤲',
  reflective: '🤔',
  motivated: '💪',
  repentant: '😢',
  calm: '😌',
  amazed: '😲',
}

export function JournalCard({ entry, className }: JournalCardProps) {
  const ayahRange = entry.ayahStart
    ? entry.ayahEnd && entry.ayahEnd !== entry.ayahStart
      ? `${entry.ayahStart}-${entry.ayahEnd}`
      : `${entry.ayahStart}`
    : null

  const tags = entry.tags ? entry.tags.split(',').filter(Boolean) : []

  return (
    <Link
      to="/journal/$entryId"
      params={{ entryId: entry.id }}
      className={cn(
        'block rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 no-underline shadow-sm transition hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="size-4 text-[var(--primary)]" />
          <span className="font-semibold text-[var(--foreground)]">
            {entry.surahName}
            {ayahRange && (
              <span className="font-normal text-[var(--muted-foreground)]">
                {' '}
                : {ayahRange}
              </span>
            )}
          </span>
        </div>
        {entry.mood && (
          <span className="shrink-0 text-sm">
            {moodEmojis[entry.mood]}{' '}
            <span className="text-xs text-[var(--muted-foreground)]">
              {moodLabels[entry.mood as keyof typeof moodLabels]}
            </span>
          </span>
        )}
      </div>

      {/* Reflection preview */}
      <p className="mb-3 line-clamp-3 text-sm text-[var(--muted-foreground)]">
        {entry.reflection}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
          <Calendar className="size-3" />
          {entry.date}
        </span>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[var(--muted)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--muted-foreground)]"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-[10px] text-[var(--muted-foreground)]">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
