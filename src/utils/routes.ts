export const SECTION_IDS = {
  experience: 'experience',
  education: 'education',
  projects: 'projects',
  achievements: 'achievements',
} as const;

export const ROUTES = {
  experience: `/#${SECTION_IDS.experience}`,
  education: `/#${SECTION_IDS.education}`,
  projects: `/#${SECTION_IDS.projects}`,
  achievements: `/#${SECTION_IDS.achievements}`,
  books: '/books',
} as const;
