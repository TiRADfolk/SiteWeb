export function formatDateFR(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
}

export function isFutureDate(dateString: string): boolean {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

export function parseFrenchDate(dateStr: string): number {
  const parts = dateStr?.split('/').map(Number) || [];
  const [day, month, year] = parts;
  if (!day || !month || !year) return 0;
  return new Date(year, month - 1, day).getTime();
}