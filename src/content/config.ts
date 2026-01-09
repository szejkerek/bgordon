import { defineCollection, z } from 'astro:content';

const gamesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().refine(
      (val) => !isNaN(Date.parse(val.replace(/(\w+)\s+(\d{4})/, '$1 1, $2'))),
      { message: 'Invalid date format. Use "Month Year" format (e.g., "January 2024")' }
    ),
    tags: z.array(z.string()).optional().default([]),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional().default([]),
    playUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    jam: z.string().optional(),
    featured: z.boolean().optional().default(false),
    teamSize: z.number().int().positive().optional(),
  }),
});

const achievementsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.string().refine(
      (val) => !isNaN(Date.parse(val.replace(/(\w+)\s+(\d{4})/, '$1 1, $2'))),
      { message: 'Invalid date format. Use "Month Year" format (e.g., "January 2024")' }
    ),
    description: z.string(),
    type: z.enum(['winner', 'finalist', 'participant', 'publication', 'organization']),
    icon: z.enum(['trophy', 'medal', 'star', 'award', 'book', 'users']).optional().default('trophy'),
    url: z.string().url().optional(),
    image: z.string().optional(),
    gallery: z.array(z.string()).optional().default([]),
    game: z.string().optional(),
    rank: z.string().optional(),
    participants: z.string().optional(),
  }),
});

export const collections = {
  games: gamesCollection,
  achievements: achievementsCollection,
};
