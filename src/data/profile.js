/**
 * Faits vérifiés du CV FlowCV d’Ayhem Hammami.
 * Les textes affichés sont dans src/i18n/translations.js.
 * N’ajouter un projet que s’il est documenté.
 */

export const profile = {
  firstName: 'Ayhem',
  lastName: 'Hammami',
  fullName: 'Ayhem Hammami',
  email: 'ayhem252003@gmail.com',
  phoneDisplay: '+216 26 000 086',
  phoneHref: 'tel:+21626000086',
  linkedin: 'https://linkedin.com/in/ayhem-hammami-641687393',
  linkedinLabel: 'linkedin.com/in/ayhem-hammami-641687393',
  cvHref: `${import.meta.env.BASE_URL}Ayhem_Hammami_CV_PFE.pdf`,
  cvFilename: 'Ayhem_Hammami_CV_PFE.pdf',
  school: 'ESEN Manouba',
}

export const skillMeta = [
  { id: 'programming', icon: 'Code2' },
  { id: 'web', icon: 'Globe' },
  { id: 'software', icon: 'AppWindow' },
  { id: 'databases', icon: 'Database' },
  { id: 'data', icon: 'BarChart3' },
  { id: 'networks', icon: 'Network' },
  { id: 'is', icon: 'Shield' },
]

export const projects = []

export const certificationGroups = [
  {
    provider: '365 Data Science',
    items: ['SQL', 'SQL + Tableau'],
  },
  {
    provider: 'DataCamp',
    label: 'Database & SQL Courses',
    items: [
      'Intermediate SQL',
      'Joining Data in SQL',
      'Introduction to Oracle SQL',
      'Database Design',
      'Introduction to Relational Databases in SQL',
    ],
  },
]

export const navItems = [
  { href: '#accueil', id: 'accueil' },
  { href: '#apropos', id: 'apropos' },
  { href: '#competences', id: 'competences' },
  { href: '#projets', id: 'projets' },
  { href: '#experience', id: 'experience' },
  { href: '#formation', id: 'formation' },
  { href: '#contact', id: 'contact' },
]
