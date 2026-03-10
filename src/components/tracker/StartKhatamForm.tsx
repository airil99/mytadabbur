import { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Play } from 'lucide-react'
import { getActiveKhatam, startKhatamCycle } from '#/server/functions/khatam'
import { Input } from '#/components/ui/input'
import { Button } from '#/components/ui/button'

export function StartKhatamForm() {
  const [label, setLabel] = useState('')
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const activeFn = useServerFn(getActiveKhatam)
  const startFn = useServerFn(startKhatamCycle)

  const { data: active } = useQuery({
    queryKey: ['khatam', 'active'],
    queryFn: async () => {
      const clerkToken = (await getToken()) ?? ''
      return activeFn({ data: { clerkToken } })
    },
  })

  const startMutation = useMutation({
    mutationFn: async () => {
      const clerkToken = (await getToken()) ?? ''
      return startFn({
        data: { clerkToken, label: label || undefined },
      })
    },
    onSuccess: () => {
      setLabel('')
      queryClient.invalidateQueries({ queryKey: ['khatam'] })
    },
  })

  // Don't show if there's an active cycle
  if (active) return null

  return (
    <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--card)] p-4">
      <p className="mb-3 text-sm font-medium text-[var(--foreground)]">
        Mulakan kitaran khatam baharu
      </p>
      <div className="flex gap-2">
        <Input
          placeholder="Label (cth: Ramadan 2026)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={() => startMutation.mutate()}
          disabled={startMutation.isPending}
        >
          <Play className="size-4" />
          Mula
        </Button>
      </div>
      {startMutation.isError && (
        <p className="mt-2 text-xs text-[var(--destructive)]">
          {(startMutation.error as Error).message}
        </p>
      )}
    </div>
  )
}
