import { GraduationCap, UserRound } from 'lucide-react'
import { profile } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal, SectionHeading } from './ui'

export default function About() {
  const { t } = useLanguage()

  return (
    <div className="site grid items-start gap-6 py-6 lg:grid-cols-[1.35fr_0.9fr] lg:gap-8 lg:py-10">
      <section id="apropos" aria-labelledby="apropos-title">
        <Reveal>
          <SectionHeading id="apropos-title" icon={UserRound} title={t.aboutTitle} />
          <p className="max-w-2xl text-base leading-relaxed text-navy">{t.about}</p>
        </Reveal>
      </section>

      <section id="formation" aria-labelledby="formation-title">
        <Reveal delay={0.08}>
          <article className="lift h-full rounded-[24px] border border-[#f3e7b8] bg-gold-pale p-6 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-gold-ink"
                aria-hidden="true"
              >
                <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h2
                id="formation-title"
                tabIndex={-1}
                className="text-2xl font-extrabold tracking-tight text-ink focus:outline-none"
              >
                {t.educationTitle}
              </h2>
            </div>

            <div className="border-l-4 border-gold pl-4">
              <div className="flex items-start justify-between gap-4">
                <p className="font-extrabold text-ink">{profile.school}</p>
                <p className="shrink-0 text-sm font-bold text-gold-ink">{t.dates}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-navy">{t.degree}</p>
              <p className="mt-2 text-sm font-medium text-muted">{t.status}</p>
            </div>
          </article>
        </Reveal>
      </section>
    </div>
  )
}
