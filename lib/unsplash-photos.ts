/**
 * Curated Unsplash photos for massage therapy & wellness.
 * Each key maps to the file id segment after `photo-` in images.unsplash.com URLs.
 * @see https://unsplash.com/license
 */

import { unsplashUrl } from './unsplash';

export const unsplashPhotos = {
  /** Hero landing: hands-on therapeutic massage (not spa / sauna imagery) */
  landingHeroAtmosphere: '1745327883508-b6cd32e5dde5',

  /** Classic therapeutic massage table session */
  massageTherapy: '1571019614242-c5c5dee9f50b',

  /** Gentle forearm / hands-on work — strong fit for myofascial framing */
  therapeuticHands: '1757689314932-bec6e9c39e51',

  /** Quiet, supportive touch */
  healingTouch: '1611073615830-9f76902c10fe',

  /** Spa still life: towels, oils — calm treatment space */
  healingSpace: '1760434100079-91428953cbe9',

  /** Courtyard, water, greenery — open, restorative environment */
  wellnessEnvironment: '1776761363446-4fc3c102cd7d',

  /** Rest on table with towel — pause and ease */
  calmSpace: '1712638932314-e2b185ca0930',

  /** Foot / lower-body work — relaxation-focused service page */
  relaxation: '1728497872607-fa0b98a3eb79',

  /** Floating botanicals — ritual, softness */
  peacefulMoment: '1758912174188-30df2d8eb250',

  /** Full-body movement / breath */
  holisticWellness: '1682352689072-7b2c0b8580c2',

  /** Mat and openness — recovery and length */
  stretchingRecovery: '1506126613408-eca07ce68773',

  /** Studio floor, props — stability and mobility */
  mobilityFocus: '1576091160550-2173dba999ef',

  /** Editorial portrait-adjacent mood for bios (not a specific person) */
  professionalPortrait: '1611073615848-d6ff6215931f',

  /** Warm abstract wellness tone */
  journeyHealing: '1701713654177-7dbace7e8a32',

  /** Hand on linen — texture and stillness */
  transformationWellness: '1620051844584-15ac31d5fccd',
};

/**
 * Build full Unsplash URLs with optimization (imgix params).
 */
export function getUnsplashImage(
  key: keyof typeof unsplashPhotos,
  size: 'hero' | 'section' | 'thumbnail' | 'portrait' = 'section'
) {
  const photoId = unsplashPhotos[key];
  const sizeConfig = {
    hero: { w: 1920, h: 1080, q: 85 },
    section: { w: 1600, h: 900, q: 85 },
    thumbnail: { w: 800, h: 533, q: 80 },
    portrait: { w: 900, h: 1200, q: 85 },
  };
  return unsplashUrl(photoId, { ...sizeConfig[size], fit: 'crop' });
}

/** Short attribution labels (full credit on Unsplash photo pages). */
export const photoCredits = {
  landingHeroAtmosphere: 'Unsplash',
  massageTherapy: 'Unsplash',
  therapeuticHands: 'Unsplash',
  healingTouch: 'Unsplash',
  healingSpace: 'Unsplash',
  wellnessEnvironment: 'Unsplash',
  calmSpace: 'Unsplash',
  relaxation: 'Unsplash',
  peacefulMoment: 'Unsplash',
  holisticWellness: 'Unsplash',
  stretchingRecovery: 'Unsplash',
  mobilityFocus: 'Unsplash',
  professionalPortrait: 'Unsplash',
  journeyHealing: 'Unsplash',
  transformationWellness: 'Unsplash',
};
