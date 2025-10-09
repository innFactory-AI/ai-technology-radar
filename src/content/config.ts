import { defineCollection, z } from 'astro:content';

const techCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['ai-tools', 'ai-models-frameworks', 'ai-knowledge', 'ai-law-governance']),
    ring: z.enum(['implement', 'pilot', 'explore', 'watch']),
    changeIndicator: z.enum(['up', 'down', 'same']),
    description: z.string(),
    publishedDate: z.string(),
  }),
});

export const collections = {
  'tech': techCollection,
};
