import {
  AppWindow,
  BarChart3,
  Code2,
  Database,
  Globe,
  Network,
  Settings2,
  Shield,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { skillMeta } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal, SectionHeading } from './ui'

const icons = {
  Code2,
  Globe,
  AppWindow,
  Database,
  BarChart3,
  Network,
  Shield,
  Settings2,
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

const stillList = { hidden: {}, show: {} }
const stillItem = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
}

export default function Skills() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()

  return (
    <section id="competences" className="py-12 sm:py-16" aria-labelledby="competences-title">
      <div className="site">
        <Reveal>
          <SectionHeading id="competences-title" icon={Settings2} title={t.skillsTitle} />
        </Reveal>

        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={reduce ? stillList : list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
        >
          {skillMeta.map((skill) => {
            const Icon = icons[skill.icon]
            const copy = t.skills[skill.id]
            return (
              <motion.li key={skill.id} variants={reduce ? stillItem : item} className="min-w-0">
                <article className="group lift h-full rounded-[22px] border border-line bg-white p-5 shadow-card">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-gold-soft text-gold-ink transition-colors group-hover:bg-gold group-hover:text-ink">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-ink">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{copy.items.join(', ')}</p>
                </article>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
