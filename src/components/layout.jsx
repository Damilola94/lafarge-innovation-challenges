import Image from "next/image"
import Link from "next/link"

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4 py-2">
        <div className="max-w-7xl mx-auto">
        <Link href="/">
        <Image
          className="dark:invert "
          src="/logo.png"
          alt="logo"
          width={100}
          height={25}
          priority
        />
          </Link>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-4">{children}</main>
    </div>
  )
}

