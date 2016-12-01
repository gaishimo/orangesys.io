export const getCSSPropertyOf = (name) => (
  getComputedStyle(document.documentElement).getPropertyValue(name)
);
