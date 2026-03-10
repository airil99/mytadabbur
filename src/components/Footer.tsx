export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] px-4 py-6 text-center text-[var(--muted-foreground)]">
      <p className="m-0 text-xs">
        &copy; {year} MyTadabbur. Dibina dengan iman dan kod.
      </p>
    </footer>
  )
}
