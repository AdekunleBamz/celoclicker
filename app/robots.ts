import { MetadataRoute } from 'next'

/**
 * Generates the robots.txt configuration for the application.
 * Controls how search engine crawlers interact with the site.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://celoclicker.vercel.app'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
