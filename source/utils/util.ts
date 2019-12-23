export const formatPrice = (price: number, currency?: string): string =>
  price ? `${price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}${currency}` : '';

export const formatNumber = (number: number): string => (number ? number.toLocaleString() : '');
