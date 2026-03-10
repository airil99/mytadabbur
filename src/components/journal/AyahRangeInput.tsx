import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'

interface AyahRangeInputProps {
  ayahStart?: number | null
  ayahEnd?: number | null
  maxAyah?: number
  onStartChange: (v: number | null) => void
  onEndChange: (v: number | null) => void
}

export function AyahRangeInput({
  ayahStart,
  ayahEnd,
  maxAyah,
  onStartChange,
  onEndChange,
}: AyahRangeInputProps) {
  function parseNum(val: string): number | null {
    const n = parseInt(val, 10)
    return isNaN(n) ? null : n
  }

  return (
    <div className="flex items-end gap-2">
      <div className="flex-1">
        <Label className="mb-1.5 block text-[var(--foreground)]">
          Ayat dari
        </Label>
        <Input
          type="number"
          min={1}
          max={maxAyah}
          placeholder="cth: 1"
          value={ayahStart ?? ''}
          onChange={(e) => onStartChange(parseNum(e.target.value))}
        />
      </div>
      <span className="pb-2 text-sm text-[var(--muted-foreground)]">—</span>
      <div className="flex-1">
        <Label className="mb-1.5 block text-[var(--foreground)]">
          hingga
        </Label>
        <Input
          type="number"
          min={ayahStart ?? 1}
          max={maxAyah}
          placeholder="cth: 10"
          value={ayahEnd ?? ''}
          onChange={(e) => onEndChange(parseNum(e.target.value))}
        />
      </div>
    </div>
  )
}
