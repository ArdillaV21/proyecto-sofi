"use client"

import { ChevronsDown } from "lucide-react"

export default function ScrollIndicator() {
  return (
    <div className="flex flex-row items-center gap-2 animate-bounce">
      <ChevronsDown className="mb-10 h-10 w-20 text-muted-foreground" />
    </div>
  )
}

