import { Controller, Get, Query } from '@nestjs/common';
import { SentimentsService } from './sentiments.service';
import { Sentiment } from './dto/sentiment.dto';

@Controller('sentiments')
export class SentimentsController {
  constructor(private readonly sentimentsService: SentimentsService) {}

  @Get()
  findAll(@Query('keywords') keywords: string) {
    if (keywords === '') {
      return [];
    }
    // Use the 'keywords' array in your logic
    return this.sentimentsService.findAll(keywords.split(',')).then(() => {
      return this.sentimentsService.findAll(keywords.split(',')).then((res) => {
        const combinedRecords = combineRecords(res);
        return combinedRecords.sort(
          (a, b) =>
            new Date(b.sentimentDate).getTime() -
            new Date(a.sentimentDate).getTime(),
        );
      });

      function combineRecords(records: Sentiment[]) {
        const combinedMap = new Map();
        for (const record of records) {
          const sentimentDate = new Date(record.sentimentDate);
          const year: number = sentimentDate.getUTCFullYear();
          const month: number = sentimentDate.getUTCMonth();
          const day: number = sentimentDate.getUTCDate();
          const key = `${year}-${month}-${day}|${record.keyword}`;
          if (combinedMap.has(key)) {
            const combinedRecord = combinedMap.get(key);
            combinedRecord.mentions++;
            combinedRecord.sentiments.push(record.sentiment);
          } else {
            combinedMap.set(key, {
              sentimentDate: new Date(
                sentimentDate.getUTCFullYear(),
                sentimentDate.getUTCMonth(),
                sentimentDate.getUTCDate(),
              ).toDateString(),
              keyword: record.keyword,
              mentions: 1,
              sentiments: [record.sentiment],
            });
          }
        }
        const sentiments = Array.from<{
          sentimentDate: string;
          keyword: string;
          mentions: number;
          sentiments: { positive: number; neutral: number; negative: number }[];
        }>(combinedMap.values());

        return sentiments.map((sentiment) => ({
          keyword: sentiment.keyword,
          sentimentDate: sentiment.sentimentDate,
          mentions: sentiment.mentions,
          sentiment: {
            positive: Number(
              (
                sentiment.sentiments
                  .map((s) => s.positive)
                  .reduce((partialSum, a) => partialSum + a, 0) /
                sentiment.sentiments.length
              ).toFixed(2),
            ),
            neutral: Number(
              (
                sentiment.sentiments
                  .map((s) => s.neutral)
                  .reduce((partialSum, a) => partialSum + a, 0) /
                sentiment.sentiments.length
              ).toFixed(2),
            ),
            negative: Number(
              (
                sentiment.sentiments
                  .map((s) => s.negative)
                  .reduce((partialSum, a) => partialSum + a, 0) /
                sentiment.sentiments.length
              ).toFixed(2),
            ),
          },
        }));
      }
    });
  }
}
