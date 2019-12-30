export const formatNumber = (
  number: number | string | Date,
  style: 'decimal' | 'percent' = 'decimal',
  minimumFractionDigits: number = 0
): string => {
  const options: Intl.NumberFormatOptions = {
    style,
    minimumFractionDigits
  };

  return number?.toLocaleString('en-US', options);
};

export const formatPrice = (number: number, currency: string = 'usd'): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 20
  };

  return number?.toLocaleString('en-US', options);
};

// alternative to lodash _.times helper function
export const times = (times: number, iteratee = (i: any) => i) =>
  Array.from({ length: times }).map((_, i) => iteratee(i));
