export const pick = (
  obj: Record<string, any>,
  keys: string[]
): Record<string, any> => {
  return keys.reduce((acc: Record<string, any>, key: string) => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};
