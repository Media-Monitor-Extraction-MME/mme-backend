export class CreateTaskDto {
  keywords: Array<{
    keyword: string;
    secondaryKeywords?: string[];
  }>;
  userId: string;
}
