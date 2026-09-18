import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { monthDate, draftFlag, optUrl } from './content.schemas';

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: monthDate,
    tags: z.array(z.string()).optional().default([]),
    playUrl: optUrl,
    sourceUrl: optUrl,
    teamSize: z.number().int().positive().optional(),
  }),
});

const achievementsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/achievements' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: monthDate,
    description: z.string(),
    type: z.enum(['winner', 'finalist', 'participant', 'publication', 'organization', 'education']),
    url: optUrl,
    image: z.string().optional(),
    gallery: z.array(z.string()).optional().default([]),
    project: reference('projects').optional(),
    rank: z.string().optional(),
    participants: z.string().optional(),
    draft: draftFlag,
  }),
});

const booksCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    /** Language of the edition. The page is English, so a Polish title or note
        has to say so, or a screen reader reads it with English phonemes. */
    lang: z.enum(['en', 'pl']).optional().default('en'),
    startDate: monthDate.optional(),
    finishDate: monthDate.optional(),
    image: z.string().optional(),
    thoughts: z.string().optional(),
    draft: draftFlag,
  }),
});

export const collections = {
  projects: projectsCollection,
  achievements: achievementsCollection,
  books: booksCollection,
};
