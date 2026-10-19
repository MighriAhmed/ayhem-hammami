import { Linkedin, Mail, Phone } from 'lucide-react'
import { navItems, profile } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import { scrollToSection } from './ui'
import { useReducedMotion } from 'framer-motion'

export default function Footer() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()
  const socials = [
    {
      href: profile.linkedin,
      label: t.linkedinAria,
      icon: Linkedin,
      external: true,
    },
    {
      href: `mailto:${profile.email}`,
      label: t.emailAria,
      icon: Mail,
    },
    {
      href: profile.phoneHref,
      label: t.phoneAria,
      icon: Phone,
    },
  ]

  return (
    <footer className="border-t border-line bg-white">
      <div className="site py-8">
        <nav aria-label={t.footerNav}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm font-medium text-muted hover:text-ink"
                  onClick={(event) => scrollToSection(event, link.href, reduce)}
                >
                  {t.nav[link.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-extrabold tracking-tight text-ink">
            {profile.firstName} <span className="text-gold-ink">{profile.lastName}</span>
          </p>
          <p className="text-sm text-muted">{t.thanks}</p>
          <ul className="flex gap-2">
            {socials.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-line text-navy hover:border-gold hover:bg-gold-pale"
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </footer>
  )
}
