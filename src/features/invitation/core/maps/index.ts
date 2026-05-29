const BASE = "https://www.google.com/maps/search/?api=1&query=";

export function getMapsUrl(location: string): string {
  return `${BASE}${encodeURIComponent(location)}`;
}

export function getMapsEmbedUrl(location: string): string {
  return `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(location)}`;
}

export function openInMaps(location: string): void {
  window.open(getMapsUrl(location), "_blank", "noopener,noreferrer");
}
