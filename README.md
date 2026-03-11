# MyTadabbur — Jurnal Al-Quran Harian

Aplikasi web untuk mencatat refleksi tadabbur Al-Quran, menjejak bacaan, dan kekal istiqamah setiap hari.

## Ciri-ciri Utama

- **Jurnal Tadabbur** — Tulis refleksi harian berdasarkan ayat Al-Quran
- **Penjejak Bacaan** — Jejak progress Juz (30) dan Surah (114)
- **Kitaran Khatam** — Rancang dan rekod khatam Al-Quran
- **Streak Harian** — Rekod halaman dibaca dan minit dihabiskan setiap hari
- **Statistik** — Ringkasan pencapaian, carta bulanan, dan surah paling kerap
- **Al-Quran** — Baca 114 surah dengan teks Arab dan terjemahan Melayu (Basmeih)
- **PWA** — Boleh dipasang sebagai aplikasi di telefon

## Tech Stack

| Komponen | Teknologi |
|----------|-----------|
| Framework | [TanStack Start](https://tanstack.com/start) (React, SSR) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Database | PostgreSQL via [Drizzle ORM](https://orm.drizzle.team/) |
| Auth | [Clerk](https://clerk.com/) |
| State | [TanStack Query](https://tanstack.com/query) + TanStack Router |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Quran API | [Al-Quran Cloud API](https://alquran.cloud/api) |

## Prasyarat

- [Node.js](https://nodejs.org/) v18 atau lebih baru
- npm (disertakan bersama Node.js)
- Akaun [Clerk](https://clerk.com/) (percuma)
- Akaun [Neon](https://neon.tech/) untuk PostgreSQL (percuma)

## Langkah Pemasangan

### 1. Clone repositori

```bash
git clone https://github.com/<your-username>/mytadabbur.git
cd mytadabbur
```

### 2. Install dependencies

```bash
npm install
```

### 3. Sediakan pangkalan data (Neon PostgreSQL)

1. Pergi ke [neon.tech](https://neon.tech/) dan daftar akaun percuma
2. Cipta projek baru:
   - **Database name:** `neondb` (atau pilihan anda)
   - **Region:** Pilih region terdekat (cth. `ap-southeast-1` untuk Asia Tenggara)
3. Salin **connection string** dari dashboard Neon (format: `postgresql://...`)

### 4. Sediakan autentikasi (Clerk)

1. Pergi ke [clerk.com](https://clerk.com/) dan daftar akaun percuma
2. Cipta aplikasi baru dan pilih **TanStack Start** sebagai framework
3. Dari halaman **API Keys**, salin:
   - **Publishable Key** (bermula `pk_test_...`)
   - **Secret Key** (bermula `sk_test_...`)

### 5. Konfigurasi environment variables

Cipta fail `.env.local` di root projek:

```bash
cp .env.local.example .env.local
```

Atau cipta secara manual dengan kandungan berikut:

```env
# Clerk configuration
VITE_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
CLERK_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE

# Database URL for PostgreSQL (dari Neon dashboard)
DATABASE_URL="postgresql://username:password@host/dbname?sslmode=verify-full"
```

Gantikan nilai-nilai di atas dengan kunci sebenar dari Clerk dan Neon.

### 6. Push schema ke database

```bash
npx drizzle-kit push
```

Ini akan mencipta 5 jadual dalam database:
- `users` — Maklumat pengguna
- `journal_entries` — Catatan jurnal tadabbur
- `reading_progress` — Progress bacaan Juz/Surah
- `khatam_cycles` — Kitaran khatam Al-Quran
- `daily_streaks` — Rekod streak harian

### 7. Jalankan aplikasi

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di pelayar web.

## Skrip NPM

| Skrip | Keterangan |
|-------|------------|
| `npm run dev` | Jalankan dev server (port 3000) |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run test` | Jalankan ujian |
| `npm run db:generate` | Jana migration Drizzle |
| `npm run db:push` | Push schema ke database |
| `npm run db:studio` | Buka Drizzle Studio (GUI database) |

## Struktur Projek

```
src/
├── components/
│   ├── journal/        # Komponen jurnal (form, list, card)
│   ├── tracker/        # Komponen penjejak (grid, khatam, streak)
│   ├── stats/          # Komponen statistik (carta, overview)
│   ├── shared/         # Komponen dikongsi (Bismillah, EmptyState, dll.)
│   ├── layout/         # Layout (MobileNav)
│   └── ui/             # shadcn/ui components
├── db/
│   ├── schema.ts       # Drizzle schema (5 jadual)
│   └── index.ts        # Database connection
├── lib/
│   ├── quran/          # Data surah statik + API fetch
│   ├── validators/     # Zod schemas
│   └── utils.ts        # Utility functions (cn)
├── routes/
│   ├── __root.tsx      # Root layout
│   ├── index.tsx       # Landing / Dashboard
│   ├── journal/        # /journal, /journal/new, /journal/$entryId
│   ├── tracker/        # /tracker, /tracker/khatam
│   ├── quran/          # /quran, /quran/$surahNumber
│   ├── stats/          # /stats
│   └── settings/       # /settings
├── server/
│   ├── functions/      # Server functions (journal, tracker, khatam, streaks, stats)
│   └── middleware/     # Auth middleware (Clerk token verification)
├── integrations/
│   ├── clerk/          # Clerk provider + header
│   └── tanstack-query/ # TanStack Query provider
└── styles.css          # Global CSS + theme variables
```

## Deployment

Aplikasi ini direka untuk deployment di [Vercel](https://vercel.com/):

1. Push kod ke GitHub
2. Import repositori di Vercel
3. Tambah environment variables (`VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL`)
4. Deploy

## Environment Variables

| Variable | Keterangan | Diperlukan |
|----------|------------|------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Ya |
| `CLERK_SECRET_KEY` | Clerk secret key | Ya |
| `DATABASE_URL` | PostgreSQL connection string | Ya |

## Lesen

MIT
