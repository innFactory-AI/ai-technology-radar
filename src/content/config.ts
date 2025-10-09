import { defineCollection, z } from 'astro:content';

const techCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['data-management', 'languages', 'infrastructure', 'datastores']),
    ring: z.enum(['adopt', 'trial', 'assess', 'hold']),
    changeIndicator: z.enum(['up', 'down', 'same']),
    description: z.string(),
    publishedDate: z.string(),
  }),
});

export const collections = {
  'tech': techCollection,
};
