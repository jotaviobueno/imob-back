import { randomUUID } from 'crypto';

export function generatePath(path: string, mimetype: string): string {
  return `${path}/${Date.now()}-${randomUUID()}.${mimetype.split('/')[1]}`;
}
