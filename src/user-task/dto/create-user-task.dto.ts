export class CreateUserTaskDto {
  keywords: Array<{
    keyword: string;
    secondaryKeywords?: string[];
  }>;
  userId: string;
  platforms: Array<Platform> = [Platform.Youtube, Platform.X, Platform.Reddit];
}

export enum Platform {
  Youtube = 'Youtube',
  X = 'X',
  Reddit = 'Reddit',
}
