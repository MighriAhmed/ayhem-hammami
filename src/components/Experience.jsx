import { Award, Briefcase, Check, Languages, MapPin, Star } from 'lucide-react'
import { certificationGroups } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import { Reveal } from './ui'

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-12 sm:py-16" aria-label={t.experienceAria}>
      <div className="site grid items-start gap-5 lg:grid-cols-3">
        <Reveal>
          <article className="lift flex flex-col rounded-[24px] border border-[#f3e7b8] bg-gold-pale p-6 sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-gold-ink"
                aria-hidden="true"
              >
                <Briefcase className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h2
                id="experience-title"
                tabIndex={-1}
                className="text-balance text-2xl font-extrabold tracking-tight text-ink focus:outline-none"
              >
                {t.experienceTitle}
              </h2>
            </div>

            <div className="rounded-[20px] bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gold-ink">{t.internshipRole}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-ink">{t.company}</h3>
                </div>
                <p className="text-sm font-semibold text-navy">{t.experienceDates}</p>
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted">
                <MapPin className="h-4 w-4 text-gold-ink" aria-hidden="true" />
                {t.experienceLocation}
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="lift rounded-[24px] border border-line bg-white p-6 shadow-card sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold-ink"
                aria-hidden="true"
              >
                <Award className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h2 tabIndex={-1} className="text-2xl font-extrabold tracking-tight text-ink focus:outline-none">
                {t.certifications}
              </h2>
            </div>
            <div className="space-y-5">
              {certificationGroups.map((group) => (
                <div key={group.provider}>
                  <p className="text-xs font-bold uppercase tracking-wide text-gold-ink">{group.provider}</p>
                  {group.label && <p className="mt-1 text-sm font-bold text-ink">{group.label}</p>}
                  <ul className="mt-2 space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-navy">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.14}>
          <article className="lift flex flex-col gap-6 rounded-[24px] border border-line bg-white p-6 shadow-card sm:p-7">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold-ink"
                  aria-hidden="true"
                >
                  <Star className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <h2 tabIndex={-1} className="text-balance text-2xl font-extrabold tracking-tight text-ink focus:outline-none">
                  {t.softSkillsTitle}
                </h2>
              </div>
              <ul className="space-y-2.5">
                {t.softSkills.map((skill) => (
                  <li key={skill} className="flex gap-2.5 text-sm font-medium text-navy">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-line pt-5">
              <div className="mb-3 flex items-center gap-2">
                <Languages className="h-5 w-5 text-gold-ink" aria-hidden="true" />
                <h3 className="text-lg font-extrabold text-ink">{t.languagesTitle}</h3>
              </div>
              <ul className="space-y-2">
                {t.spoken.map((language) => (
                  <li key={language} className="text-sm font-medium text-navy">
                    {language}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
