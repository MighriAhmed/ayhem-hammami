import { Download } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'

const ease = [0.22, 1, 0.36, 1]

export function MotionLink({ className, children, ...props }) {
  const reduce = useReducedMotion()

  return (
    <motion.a
      className={className}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      {...props}
    >
      {children}
    </motion.a>
  )
}

export function CvButton({ className = 'btn-primary', children }) {
  const { t } = useLanguage()

  return (
    <MotionLink
      href={profile.cvHref}
      download={profile.cvFilename}
      className={className}
    >
      <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      {children ?? t.cv}
    </MotionLink>
  )
}

export function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.55, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({ id, icon: Icon, title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold-ink"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>
      <h2
        id={id}
        tabIndex={-1}
        className="text-balance text-2xl font-extrabold tracking-tight text-ink focus:outline-none sm:text-[1.7rem]"
      >
        {title}
      </h2>
      <span className="hidden h-[3px] w-14 rounded-full bg-gold sm:block" aria-hidden="true" />
    </div>
  )
}

export function scrollToSection(event, href, reduce) {
  const id = href.replace('#', '')
  const target = document.getElementById(id)
  if (!target) return

  event.preventDefault()
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  window.history.pushState(null, '', href)
}
