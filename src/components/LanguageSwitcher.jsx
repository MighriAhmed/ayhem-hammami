import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { locales } from '../i18n/translations'
import { useLanguage } from '../i18n/LanguageContext'

function FranceFlag() {
  return (
    <svg viewBox="0 0 24 16" className="h-4 w-6 rounded-[3px] ring-1 ring-black/10" aria-hidden="true">
      <rect width="8" height="16" fill="#0055A4" />
      <rect x="8" width="8" height="16" fill="#FFFFFF" />
      <rect x="16" width="8" height="16" fill="#EF4135" />
    </svg>
  )
}

function UkFlag() {
  const rawId = useId().replace(/:/g, '')
  return (
    <svg viewBox="0 0 60 30" className="h-4 w-6 rounded-[3px] ring-1 ring-black/10" aria-hidden="true">
      <clipPath id={rawId}>
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath={`url(#${rawId})`}>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#FFFFFF" strokeWidth="8" />
        <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="4" />
        <path d="M30 0 V30 M0 15 H60" stroke="#FFFFFF" strokeWidth="14" />
        <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="8" />
      </g>
    </svg>
  )
}

const flags = {
  fr: FranceFlag,
  en: UkFlag,
}

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const listId = useId()
  const current = locales.find((item) => item.id === locale) ?? locales[0]
  const CurrentFlag = flags[current.id]

  useEffect(() => {
    if (!open) return undefined

    function onPointer(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }

    function onKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function choose(next) {
    setLocale(next)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-2.5 text-sm font-semibold text-ink sm:px-3"
        aria-label={t.chooseLanguage}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <CurrentFlag />
        <span>{current.code}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-label={t.language}
          className="absolute right-0 z-50 mt-2 w-44 rounded-2xl border border-line bg-white p-1.5 shadow-lift"
        >
          {locales.map((item) => {
            const Flag = flags[item.id]
            const selected = item.id === locale
            return (
              <li key={item.id}>
                <button
                  type="button"
                  role="option"
                  lang={item.id}
                  aria-selected={selected}
                  className={`flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 text-sm font-semibold ${
                    selected ? 'bg-gold-soft text-ink' : 'text-navy hover:bg-paper'
                  }`}
                  onClick={() => choose(item.id)}
                >
                  <Flag />
                  <span className="flex-1 text-left">{item.label}</span>
                  {selected && <Check className="h-4 w-4 text-gold-ink" aria-hidden="true" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
