export const arrayMin = <T, M>(array: T[], mapper: (item: T) => T | M = (item) => item): T => {
  return array.reduce((acc, value) => mapper(acc) < mapper(value) ? acc : value);
};

export const arrayMax = <T, M>(array: T[], mapper: (item: T) => T | M = (item) => item) => {
  return array.reduce((acc, value) => mapper(acc) > mapper(value) ? acc : value);
};
