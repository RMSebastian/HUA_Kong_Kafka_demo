export const getDifferencesOfTime = (start: Date, end: Date): number => {
  return (end.getTime() - start.getTime());
};
