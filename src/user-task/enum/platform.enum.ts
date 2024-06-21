import { registerEnumType } from '@nestjs/graphql';

export enum Platform {
  Youtube = 'Youtube',
  X = 'X',
  Reddit = 'Reddit',
}

registerEnumType(Platform, { name: 'Platform' });

export const platformResolver: Record<keyof typeof Platform, any> = {
  Youtube: 'Youtube',
  X: 'X',
  Reddit: 'Reddit',
};
