import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)
const storageKey = 'portfolio-lang'

function readLocale() {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === 'fr' || saved === 'en') return saved
  } catch {
    /* ignore private-mode storage errors */
  }
  return 'fr'
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(readLocale)
  const t = translations[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.documentTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', t.metaDescription)
    try {
      localStorage.setItem(storageKey, locale)
    } catch {
      /* ignore private-mode storage errors */
    }
  }, [locale, t])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('useLanguage must be used within LanguageProvider')
  return value
}
