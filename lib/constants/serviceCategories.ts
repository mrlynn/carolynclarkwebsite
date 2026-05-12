export const SERVICE_CATEGORIES = {
  MASSAGE: 'massage',
  THERAPY: 'therapy',
  WELLNESS: 'wellness',
} as const;

export const SERVICE_CATEGORY_LABELS: Record<string, string> = {
  [SERVICE_CATEGORIES.MASSAGE]: 'Massage',
  [SERVICE_CATEGORIES.THERAPY]: 'Therapy',
  [SERVICE_CATEGORIES.WELLNESS]: 'Wellness',
};

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[keyof typeof SERVICE_CATEGORIES];
