import { cn } from '#/lib/utils'
import { MOODS, moodLabels } from '#/lib/validators/journal'

const moodEmojis: Record<(typeof MOODS)[number], string> = {
  grateful: '🤲',
  reflective: '🤔',
  motivated: '💪',
  repentant: '😢',
  calm: '😌',
  amazed: '😲',
}

interface MoodSelectorProps {
  value?: string | null
  onChange: (mood: string | null) => void
}

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {MOODS.map((mood) => (
        <button
          key={mood}
          type="button"
          onClick={() => onChange(value === mood ? null : mood)}
          className={cn(
            'rounded-lg border px-3 py-1.5 text-sm transition',
            value === mood
              ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
              : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)]/40 hover:bg-[var(--accent)]',
          )}
        >
          {moodEmojis[mood]} {moodLabels[mood]}
        </button>
      ))}
    </div>
  )
}
