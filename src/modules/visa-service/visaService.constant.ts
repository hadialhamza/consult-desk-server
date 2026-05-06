export const VISA_TYPES = [
  'tourist',
  'medical',
  'business',
  'student',
  'work',
  'transit',
  'e-visa',
] as const;

export const VISA_CATEGORIES = [
  'standard',
  'express',
  'urgent',
] as const;

export const VISA_SERVICE_SEARCHABLE_FIELDS = [
  'title',
  'description',
  'visaType',
  'category',
];

export const VISA_SERVICE_FILTERABLE_FIELDS = [
  'country',
  'visaType',
  'category',
  'feeMin',
  'feeMax',
  'rating',
  'search',
];
