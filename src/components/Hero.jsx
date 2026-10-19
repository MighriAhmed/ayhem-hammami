import { ArrowRight, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import { CvButton, MotionLink, scrollToSection } from './ui'

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()
  const contacts = [
    { id: 'phone', icon: Phone, href: profile.phoneHref, label: profile.phoneDisplay },
    { id: 'mail', icon: Mail, href: `mailto:${profile.email}`, label: profile.email },
    { id: 'location', icon: MapPin, label: t.location },
    {
      id: 'linkedin',
      icon: Linkedin,
      href: profile.linkedin,
      label: t.linkedinProfile,
      external: true,
    },
  ]

  const enter = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease },
        }

  return (
    <section id="accueil" className="relative overflow-hidden" aria-labelledby="hero-title">
      <div
        className="float-slow pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-gold/25 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="float-slower pointer-events-none absolute -right-10 top-24 h-64 w-64 rounded-full bg-gold/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="site relative grid items-center gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
        <div>
          <motion.p className="text-sm font-bold text-gold-ink" {...enter(0.05)}>
            {t.hello}
          </motion.p>
          <motion.h1
            id="hero-title"
            tabIndex={-1}
            className="mt-3 max-w-xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink focus:outline-none sm:text-5xl lg:text-[3.35rem]"
            {...enter(0.12)}
          >
            <span className="block">{t.iAm}</span>
            <span className="block text-gold">Ayhem Hammami</span>
          </motion.h1>
          <motion.p className="mt-4 text-lg font-semibold text-navy sm:text-xl" {...enter(0.2)}>
            {t.role}
          </motion.p>
          <motion.p className="mt-4 max-w-xl text-base leading-relaxed text-muted" {...enter(0.28)}>
            {t.heroIntro}
          </motion.p>

          <motion.div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap" {...enter(0.36)}>
            <MotionLink
              href="#contact"
              className="btn-primary"
              onClick={(event) => scrollToSection(event, '#contact', reduce)}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {t.contactCta}
            </MotionLink>
            <MotionLink
              href="#projets"
              className="btn-secondary"
              onClick={(event) => scrollToSection(event, '#projets', reduce)}
            >
              {t.projectsCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </MotionLink>
          </motion.div>

          <motion.div className="mt-4" {...enter(0.42)}>
            <CvButton className="btn-secondary" />
          </motion.div>

          <motion.ul className="mt-8 grid gap-3 sm:grid-cols-2" {...enter(0.48)}>
            {contacts.map((item) => {
              const Icon = item.icon
              const content = (
                <>
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                  <span className="break-words">{item.label}</span>
                </>
              )

              return (
                <li key={item.id} className="min-w-0 text-sm font-medium text-navy">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="inline-flex items-start gap-2 rounded-lg hover:text-ink"
                      {...(item.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {content}
                    </a>
                  ) : (
                    <span className="inline-flex items-start gap-2">{content}</span>
                  )}
                </li>
              )
            })}
          </motion.ul>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[420px]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <div
            className="float-slow absolute left-6 top-10 h-40 w-40 rounded-[40%] bg-gold/80"
            aria-hidden="true"
          />
          <div
            className="float-slower absolute bottom-8 right-4 h-24 w-24 rounded-full bg-gold/50"
            aria-hidden="true"
          />

          <p className="relative z-10 mx-auto mb-3 max-w-[16rem] text-center font-hand text-[1.75rem] leading-tight text-navy xl:mr-2 xl:rotate-2 xl:text-right">
            {t.tagline}
          </p>

          <div className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
            <svg
              className="absolute inset-0 h-full w-full -rotate-6"
              viewBox="0 0 200 200"
              aria-hidden="true"
            >
              <circle
                cx="100"
                cy="100"
                r="94"
                fill="none"
                stroke="#FDC708"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="430 170"
              />
            </svg>
            <img
              src={`${import.meta.env.BASE_URL}portrait.jpg`}
              alt={t.portraitAlt}
              width="600"
              height="600"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-full object-cover shadow-lift"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
