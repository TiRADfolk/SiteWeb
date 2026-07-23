

export function formatDriveImageUrl(url: string | undefined): string {
  if (!url || typeof url !== 'string') return '';
  
  const driveRegex = /\/file\/d\/([^\/]+)/;
  const match = url.match(driveRegex);
  
  if (match && match[1]) {
    const fileId = match[1];
    return `https://lh3.googleusercontent.com/d/$${fileId}=s1600`;
  }
  
  return url;
}
