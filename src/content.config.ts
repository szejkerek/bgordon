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
    draft: draftFlag,
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
    status: z.enum(['reading', 'finished', 'want-to-read']),
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
