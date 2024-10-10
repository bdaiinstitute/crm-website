/**
 * Removes the leading forward slash from a URL if it exists.
 * @param url The relative URL string.
 * @returns The URL without the leading slash.
 */
const removeLeadingSlash = (url: string): string =>
  url.startsWith("/") ? url.slice(1) : url;

/**
 * Converts a relative URL to an absolute URL based on the application's base
 * URL.
 * @param relativeUrl The relative URL string.
 * @returns The absolute URL.
 */
export function getAbsoluteUrl(relativeUrl: string) {
  // Dynamically get the base URL from Vite's environment variables
  const BASE_URL = `${window.location.origin}${import.meta.env.BASE_URL}`;
  const absoluteUrl = `${BASE_URL}${removeLeadingSlash(relativeUrl)}`;
  return absoluteUrl;
}
