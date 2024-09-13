export function isBookMyShowUrl(url: string): boolean {
  const bookMyShowPattern = /https:\/\/in\.bookmyshow\.com\/explore\/[a-z%0-9\-]+(\/)?(\?.*)?$/i;
  return bookMyShowPattern.test(url);
}

export function isInsiderInUrl(url: string): boolean {
  const insiderInPattern = /https:\/\/insider\.in\/[a-z%0-9\-]+(\/)?(\?.*)?$/i;
  return insiderInPattern.test(url);
}

export function isAlleventsUrl(url: string): boolean {
  const alleventsPattern = /https:\/\/allevents\.in\/[a-z%0-9\-]+(\/)?(\?.*)?$/i;
  return alleventsPattern.test(url);
}

export function isValidQuery(query: string): boolean {
  const validPattern = /events\s+in\s+[a-z\s]+/i;
  return validPattern.test(query);
}

