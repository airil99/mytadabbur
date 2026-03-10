import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Sun, Moon, Monitor, LogOut } from 'lucide-react'
import { Button } from '#/components/ui/button'

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
})

type ThemeMode = 'light' | 'dark' | 'auto'

function SettingsPage() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [theme, setTheme] = useState<ThemeMode>('auto')

  useEffect(() => {
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark' || stored === 'auto') {
      setTheme(stored)
    }
  }, [])

  function changeTheme(mode: ThemeMode) {
    setTheme(mode)
    window.localStorage.setItem('theme', mode)

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    const resolved =
      mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(resolved)
    document.documentElement.style.colorScheme = resolved

    if (mode === 'auto') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', mode)
    }
  }

  const themeOptions = [
    { value: 'light' as const, label: 'Cerah', icon: Sun },
    { value: 'dark' as const, label: 'Gelap', icon: Moon },
    { value: 'auto' as const, label: 'Sistem', icon: Monitor },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-[var(--foreground)]">
        Tetapan
      </h1>

      <div className="space-y-6">
        {/* Profile */}
        {user && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
            <h2 className="mb-4 text-sm font-semibold text-[var(--foreground)]">
              Profil
            </h2>
            <div className="flex items-center gap-4">
              {user.imageUrl && (
                <img
                  src={user.imageUrl}
                  alt={user.fullName ?? 'Avatar'}
                  className="size-14 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-[var(--foreground)]">
                  {user.fullName}
                </p>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {user.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Theme */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-4 text-sm font-semibold text-[var(--foreground)]">
            Tema
          </h2>
          <div className="flex gap-2">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => changeTheme(value)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition ${
                  theme === value
                    ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                    : 'border-[var(--border)] text-[var(--muted-foreground)] hover:bg-[var(--accent)]'
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
          <h2 className="mb-2 text-sm font-semibold text-[var(--foreground)]">
            Tentang
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            MyTadabbur — Jurnal Al-Quran
          </p>
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            Dibina untuk memudahkan tadabbur harian dan menjejaki bacaan
            Al-Quran.
          </p>
        </div>

        {/* Sign out */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signOut()}
        >
          <LogOut className="size-4" />
          Log Keluar
        </Button>
      </div>
    </div>
  )
}
