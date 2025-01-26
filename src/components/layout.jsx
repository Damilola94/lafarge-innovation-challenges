"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TimerProvider } from "@/contexts/TimerContext";

export function Layout({ children }) {
  const [isMacOrIOS, setIsMacOrIOS] = useState(false);

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    if (platform.includes("mac") || /iphone|ipad|ipod/.test(userAgent)) {
      setIsMacOrIOS(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4 py-2">
        <div className="max-w-7xl mx-auto justify-between flex items-center">
          <Link href="/">
            <Image
              className="dark:invert"
              src={isMacOrIOS ? "/logo-mac.png" : "/logo.png"}
              alt="logo"
              width={100}
              height={25}
              priority
            />
          </Link>
          <h1 className="text-black text-base font-bold mt-2">
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
