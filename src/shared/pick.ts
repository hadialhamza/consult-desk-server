/**
 * Picks specific keys from an object.
 * Useful for extracting query parameters for filtering/pagination.
 */
const pick = <T extends Record<string, unknown>>(
  obj: T,
  keys: string[]
): Partial<T> => {
  const finalObj: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      (finalObj as any)[key] = obj[key];
    }
  }

  return finalObj;
};

export default pick;
