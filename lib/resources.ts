import crypto from 'crypto';

export interface Resource {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fileName: string;
  pageCount: string;
}

export const resources: Resource[] = [
  {
    slug: 'self-mfr-techniques',
    title: '5 Simple Self-Myofascial Release Techniques You Can Do at Home',
    subtitle: 'Free Guide',
    description:
      'Learn gentle, effective techniques to release tension in your neck, shoulders, back, and hips. Includes step-by-step instructions and safety guidelines.',
    fileName: 'self-mfr-techniques.pdf',
    pageCount: '12 pages',
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function generateDownloadToken(): string {
  return crypto.randomUUID();
}
