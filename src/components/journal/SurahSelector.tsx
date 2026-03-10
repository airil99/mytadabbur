import { useState, useMemo, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Input } from '#/components/ui/input'
import { cn } from '#/lib/utils'
import { SURAHS, searchSurahs, type Surah } from '#/lib/quran/surahs'

interface SurahSelectorProps {
  value?: number
  onChange: (surahNumber: number, surahName: string) => void
  className?: string
}

export function SurahSelector({
  value,
  onChange,
  className,
}: SurahSelectorProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => searchSurahs(query), [query])

  const selected = value ? SURAHS[value - 1] : undefined

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(surah: Surah) {
    onChange(surah.number, surah.nameTransliteration)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <Input
          placeholder="Cari surah..."
          value={open ? query : selected ? `${selected.number}. ${selected.nameTransliteration}` : query}
          onChange={(e) => {
            setQuery(e.target.value)
            if (!open) setOpen(true)
          }}
          onFocus={() => {
            setOpen(true)
            if (selected) setQuery('')
          }}
          className="pl-9"
        />
      </div>

      {open && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-[var(--border)] bg-[var(--popover)] p-1 shadow-lg">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-sm text-[var(--muted-foreground)]">
              Tiada surah ditemui
            </p>
          ) : (
            results.map((surah) => (
              <button
                key={surah.number}
                type="button"
                onClick={() => handleSelect(surah)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition hover:bg-[var(--accent)]',
                  value === surah.number &&
                    'bg-[var(--accent)] text-[var(--primary)]',
                )}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[var(--muted)] text-xs font-semibold">
                  {surah.number}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-medium">
                    {surah.nameTransliteration}
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {surah.name} · {surah.ayahCount} ayat ·{' '}
                    {surah.revelationType}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
