import Image from "next/image";
import Link from "next/link";
import { TimerProvider } from "@/contexts/TimerContext";

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4 py-2">
        <div className="max-w-7xl mx-auto justify-between flex items-center">
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
          <h1 className="max-w- text-base font-bold mt-2">
            Pushing Boundaries with Innovation & Excellence
          </h1>
        </div>
      </header>
      <TimerProvider>
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </TimerProvider>
    </div>
  );
}
