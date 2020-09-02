export const arrayMin = <T, M>(array: T[], mapper: (item: T) => T | M = (item) => item): T => {
  return array.reduce((acc, value) => mapper(acc) < mapper(value) ? acc : value);
};

export const arrayMax = <T, M>(array: T[], mapper: (item: T) => T | M = (item) => item) => {
  return array.reduce((acc, value) => mapper(acc) > mapper(value) ? acc : value);
};

export const groupBy = <T>(array: T[], key: any) => {
  return array.reduce((acc: any, value: any) => {
    (acc[value[key]] = acc[value[key]] || []).push(value);
    return acc;
  }, {});
};
