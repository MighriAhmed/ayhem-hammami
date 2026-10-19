import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { navItems, profile } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import { CvButton, scrollToSection } from './ui'

const spyIds = ['accueil', 'apropos', 'formation', 'competences', 'projets', 'experience', 'contact']

function getActiveSection() {
  const marker = window.scrollY + 130
  const tops = {}
  let current = 'accueil'
  let currentTop = -Infinity

  for (const id of spyIds) {
    const el = document.getElementById(id)
    if (!el) continue
    const top = el.getBoundingClientRect().top + window.scrollY
    tops[id] = top
    if (top <= marker && top >= currentTop) {
      current = id
      currentTop = top
    }
  }

  if (
    current === 'formation' &&
    tops.apropos != null &&
    tops.formation - tops.apropos < 140
  ) {
    current = 'apropos'
  }

  return current
}

export default function Navbar() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('accueil')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      setActive(getActiveSection())
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.innerWidth >= 1280) setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  function handleNav(event, href) {
    event.preventDefault()
    setOpen(false)
    window.requestAnimationFrame(() => scrollToSection(event, href, reduce))
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md ${
        scrolled ? 'border-line shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="site flex h-[4.5rem] items-center justify-between gap-4">
        <a
          href="#accueil"
          className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl"
          aria-label={t.homeAria}
          onClick={(event) => handleNav(event, '#accueil')}
        >
          <span className="text-[15px] font-extrabold tracking-tight text-ink">
            {profile.firstName} <span className="text-gold-ink">{profile.lastName}</span>
          </span>
        </a>

        <nav className="hidden xl:block" aria-label={t.navLabel}>
          <ul className="flex items-center gap-4 2xl:gap-5">
            {navItems.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="nav-link whitespace-nowrap"
                  aria-current={active === link.id ? 'page' : undefined}
                  onClick={(event) => handleNav(event, link.href)}
                >
                  {t.nav[link.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <CvButton className="btn-primary hidden shrink-0 xl:inline-flex" />
          <a
            href={profile.cvHref}
            download={profile.cvFilename}
            className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink xl:hidden"
            aria-label={t.cv}
          >
            <Download className="h-5 w-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? t.closeMenu : t.openMenu}</span>
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="border-t border-line bg-white xl:hidden" aria-label={t.mobileNavLabel}>
          <ul className="site flex flex-col gap-1 py-3">
            {navItems.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="nav-link-mobile"
                  aria-current={active === link.id ? 'page' : undefined}
                  onClick={(event) => handleNav(event, link.href)}
                >
                  {t.nav[link.id]}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <CvButton className="btn-primary w-full" />
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
