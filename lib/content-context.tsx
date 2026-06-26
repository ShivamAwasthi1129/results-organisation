"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { type SiteContent, defaultContent } from "./content-defaults"

const STORAGE_KEY = "r3sults_site_content"

type ContentContextType = {
  content: SiteContent
  updateContent: (next: SiteContent) => void
  resetContent: () => void
  isDirty: boolean
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  updateContent: () => {},
  resetContent: () => {},
  isDirty: false,
})

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as SiteContent
        setContent(parsed)
        setIsDirty(true)
      }
    } catch {
      // ignore
    }
  }, [])

  const updateContent = useCallback((next: SiteContent) => {
    setContent(next)
    setIsDirty(true)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
  }, [])

  const resetContent = useCallback(() => {
    setContent(defaultContent)
    setIsDirty(false)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [])

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isDirty }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
