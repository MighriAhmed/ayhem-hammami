import { ArrowUpRight, Check, FolderOpen } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal, SectionHeading } from './ui'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
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

/**
 * Carte réutilisable pour un projet documenté.
 * Le lien n’est affiché que si `href` est fourni.
 */
export function ProjectCard({ project }) {
  const { t } = useLanguage()
  const technologies = project.technologies ?? []
  const features = project.features ?? []

  return (
    <article
      className={`lift flex h-full flex-col rounded-[22px] bg-white p-6 shadow-card ${
        project.placeholder ? 'border border-dashed border-gold' : 'border border-line'
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold-soft text-gold-ink"
          aria-hidden="true"
        >
          <FolderOpen className="h-5 w-5" strokeWidth={1.75} />
        </span>
        {project.placeholder && (
          <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-ink">
            {t.placeholderBadge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-extrabold tracking-tight text-ink">{project.title}</h3>

      {technologies.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-gold-soft px-2.5 py-1 text-xs font-semibold text-ink"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

      {features.length > 0 && (
        <ul className="mt-4 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm leading-relaxed text-navy">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {project.href && (
        <a
          href={project.href}
          className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-ink"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.viewProject}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </article>
  )
}

export default function Projects() {
  const reduce = useReducedMotion()
  const { t } = useLanguage()
  const hasProjects = projects.length > 0
  const placeholder = {
    placeholder: true,
    title: t.placeholderTitle,
    description: t.placeholderDescription,
  }

  return (
    <section id="projets" className="py-8 sm:py-12" aria-labelledby="projets-title">
      <div className="site">
        <Reveal>
          <SectionHeading id="projets-title" icon={FolderOpen} title={t.projectsTitle} />
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted">{t.projectsNote}</p>
        </Reveal>

        {hasProjects ? (
          <motion.div
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            variants={reduce ? stillList : list}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={reduce ? stillItem : item} className="min-w-0">
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <Reveal>
            <div className="max-w-2xl">
              <ProjectCard project={placeholder} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
