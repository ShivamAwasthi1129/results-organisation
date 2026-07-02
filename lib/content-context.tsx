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

export function ContentProvider({ children, initialContent }: { children: React.ReactNode, initialContent?: SiteContent | null }) {
  const [content, setContent] = useState<SiteContent>(initialContent || defaultContent)
  const [isDirty, setIsDirty] = useState(false)

  useEffect(() => {
    // If we received server-side initialContent, we might want to prioritize it over localStorage,
    // or maybe not. Assuming initialContent from server is always the freshest source of truth:
    if (initialContent) {
      setContent(initialContent)
      setIsDirty(true)
      return
    }
    
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
  }, [initialContent])

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
    setContent(initialContent || defaultContent)
    setIsDirty(false)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }, [initialContent])

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent, isDirty }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  return useContext(ContentContext)
}
