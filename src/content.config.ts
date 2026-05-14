import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { achievementIconKeys } from './utils/icons';
import { dateRefine, dateRefineMessage } from './utils/dates';

const gamesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/games' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().refine(dateRefine, dateRefineMessage),
    tags: z.array(z.string()).optional().default([]),
    playUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    jam: z.string().optional(),
    featured: z.boolean().optional().default(false),
    teamSize: z.number().int().positive().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const achievementsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/achievements' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.string().refine(dateRefine, dateRefineMessage),
    description: z.string(),
    type: z.enum(['winner', 'finalist', 'participant', 'publication', 'organization']),
    icon: z.enum(achievementIconKeys).optional().default('trophy'),
    url: z.string().url().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional().default([]),
    game: z.string().optional(),
    rank: z.string().optional(),
    participants: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const booksCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'finished', 'want-to-read']),
    startDate: z.string().refine(dateRefine, dateRefineMessage).optional(),
    finishDate: z.string().refine(dateRefine, dateRefineMessage).optional(),
    image: z.string().optional(),
    thoughts: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  games: gamesCollection,
  achievements: achievementsCollection,
  books: booksCollection,
};
