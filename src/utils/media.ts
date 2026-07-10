const GIF_EXT = ['gif'];
const STILL_IMAGE_EXT = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg'];

/** Every extension that counts as a displayable image asset — still images plus gif. No leading dot. */
export const IMAGE_FILE_EXTENSIONS = [...STILL_IMAGE_EXT, ...GIF_EXT];

export function resolveMediaPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}
