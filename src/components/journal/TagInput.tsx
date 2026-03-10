import { useState } from 'react'
import { X } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { cn } from '#/lib/utils'

const SUGGESTED_TAGS = [
  'Ramadan',
  'Qiyamullail',
  'Tadabbur Pagi',
  'Tadabbur Malam',
  'Surah Pilihan',
]

interface TagInputProps {
  value: string
  onChange: (tags: string) => void
  className?: string
}

export function TagInput({ value, onChange, className }: TagInputProps) {
  const [input, setInput] = useState('')

  const tags = value ? value.split(',').filter(Boolean) : []

  function addTag(tag: string) {
    const trimmed = tag.trim()
    if (!trimmed || tags.includes(trimmed)) return
    onChange([...tags, trimmed].join(','))
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag).join(','))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
      setInput('')
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--muted)] px-2 py-0.5 text-xs font-medium text-[var(--foreground)]"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <Input
        placeholder="Taip tag dan tekan Enter..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {tags.length === 0 && (
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              className="rounded-md border border-dashed border-[var(--border)] px-2 py-0.5 text-xs text-[var(--muted-foreground)] transition hover:border-[var(--primary)]/40 hover:text-[var(--foreground)]"
            >
              + {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
