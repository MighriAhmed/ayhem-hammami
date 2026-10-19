import { Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { profile } from '../data/profile'
import { useLanguage } from '../i18n/LanguageContext'
import { CvButton, Reveal, SectionHeading } from './ui'

export default function Contact() {
  const { t } = useLanguage()
  const channels = [
    {
      id: 'email',
      icon: Mail,
      label: t.email,
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      id: 'phone',
      icon: Phone,
      label: t.phone,
      value: profile.phoneDisplay,
      href: profile.phoneHref,
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      label: t.linkedin,
      value: profile.linkedinLabel,
      href: profile.linkedin,
      external: true,
    },
    {
      id: 'location',
      icon: MapPin,
      label: t.locationLabel,
      value: t.location,
    },
  ]

  return (
    <section id="contact" className="pb-8 pt-4 sm:pb-12" aria-labelledby="contact-title">
      <div className="site">
        <Reveal>
          <div className="rounded-[28px] border border-[#f3e7b8] bg-gold-pale px-5 py-8 sm:px-8 sm:py-10">
            <SectionHeading id="contact-title" icon={Mail} title={t.contactTitle} />
            <p className="max-w-2xl text-base leading-relaxed text-navy">{t.contactIntro}</p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {channels.map((channel) => {
                const Icon = channel.icon
                const inner = (
                  <>
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-soft text-gold-ink"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wide text-muted">
                        {channel.label}
                      </span>
                      <span className="mt-0.5 block break-words font-semibold text-ink">{channel.value}</span>
                    </span>
                  </>
                )

                return (
                  <li key={channel.id}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        className="lift flex min-h-[4.5rem] items-center gap-3 rounded-[20px] border border-line bg-white p-4"
                        {...(channel.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex min-h-[4.5rem] items-center gap-3 rounded-[20px] border border-line bg-white p-4">
                        {inner}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="mt-7">
              <CvButton />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
