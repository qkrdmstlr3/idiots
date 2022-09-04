const sortByKey = <T>(
  array: T[],
  key: keyof T,
  direction: 'desc' | 'asc' = 'asc',
): void => {
  const useASC = direction === 'asc';
  array.sort((a, b) => {
    if (a[key] < b[key]) return useASC ? -1 : 1;
    return useASC ? 1 : -1;
  });
};

export default sortByKey;
