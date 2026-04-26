import { MetadataRoute } from 'next'

const FALLBACK_BASE_URL = 'https://celoclicker.vercel.app'

/**
 * Generates the sitemap.xml for search engine indexing.
 * Lists all public routes with their update frequency and priority.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL?.trim() || FALLBACK_BASE_URL).replace(/\/+$/, '')
  
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
