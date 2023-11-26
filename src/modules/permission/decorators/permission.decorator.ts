import { SetMetadata } from '@nestjs/common';
import { PERMISSION } from '../../../domain/enums';

export const PERMISSION_KEY = 'permissions';
export const Permissions = (...permissions: PERMISSION[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
