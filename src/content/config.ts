import { defineCollection, z } from 'astro:content';

const gamesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    playUrl: z.string().optional(),
    sourceUrl: z.string().optional(),
    jam: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

const achievementsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.string(),
    description: z.string(),
    type: z.string(),
    icon: z.string().optional().default('trophy'),
    url: z.string().optional(),
  }),
});

export const collections = {
  games: gamesCollection,
  achievements: achievementsCollection,
};
