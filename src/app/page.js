"use client"

import { redirect, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function page() {

  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') redirect('/bridge-in')
  }, [pathname])
}
