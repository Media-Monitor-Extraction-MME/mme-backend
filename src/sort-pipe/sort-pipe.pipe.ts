import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { SortQuery } from '../sort-query/sort-query.interface';

@Injectable()
export class SortPipePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type, data } = metadata;

    if (type !== 'query' || data !== 'sort') {
      return value;
    }

    if (typeof value === 'string') {
      const [field, order] = value
        .replace('{', '')
        .replace('}', '')
        .replace(' ', '')
        .split(',');
      return {
        field: field.split(':')[1],
        order: order.split(':')[1],
      } as SortQuery;
    }
    // Transform the query parameter.
    return value;
  }
}
