import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { CreateIndexesOptions } from 'mongodb';
import { SortQuery } from 'src/sort-query/sort-query.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('Post') private readonly postModel: Model<Post>,
    @InjectConnection() private connection: Connection,
  ) {
    this.createTitleIndex();
  }

  async indexExists(indexName: string): Promise<boolean> {
    const indexes = await this.postModel.listIndexes();
    return indexes.some((index) => index.name === indexName);
  }

  async createTitleIndex() {
    try {
      if (await this.indexExists('title_text')) {
        console.log('Index already exists');
        return;
      }
      this.postModel.schema.index(
        { title: 'text', description: 'text' },
        { name: 'text_search' },
      );
      const indexOptions: CreateIndexesOptions = {
        background: true,
        name: 'title_text',
      };

      await this.postModel.createIndexes(indexOptions);
      console.log('Text index created on title field');
    } catch (error) {
      console.error('Error creating index:', error);
    }
  }

  async findPostsByRange(
    keywords: string[],
    startTime?: Date,
    endTime?: Date,
    limit: number = 10,
    offset: number = 0,
    sort?: SortQuery,
  ): Promise<Post[]> {
    await this.postModel.ensureIndexes();
    const query: any = {
      $text: { $search: keywords.join(' ') },
    };

    if (sort) {
      console.log(sort);
      switch (sort.field.toLowerCase()) {
        case 'upvotes':
          query.sort = { upvotes: sort.order === 'asc' ? 1 : -1 };
          break;
        case 'time':
          query.sort = { time: sort.order === 'asc' ? 1 : -1 };
          break;
        case 'collectivesentiment':
        case 'sentiment':
          query.sort = {
            'collectiveSentiment.positive': sort.order === 'asc' ? 1 : -1,
          };
          break;

        default:
          break;
      }
    }
    if (startTime && endTime) {
      query.time = {
        $gte: startTime.toISOString().slice(0, 10),
        $lte: endTime.toISOString().slice(0, 10),
      };
    } else if (startTime) {
      query.time = {
        $gte: startTime.toISOString().slice(0, 10),
        $lte: new Date(startTime.getTime() + 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
      };
    }

    console.log(query);
    const mongoSort = query.sort;
    delete query.sort;
    const aggregatedPosts = await this.postModel
      .aggregate([
        { $match: query },
        {
          $addFields: {
            upvotes: { $toInt: '$upvotes' },
          },
        },

        { $sort: mongoSort },
        { $skip: offset },
        { $limit: limit ? Number(limit) : 10 },
      ])
      .exec();
    return aggregatedPosts;
  }

  async findAll({ keyword }: { keyword: string }): Promise<Post[]> {
    // console.log(this.connection.collections['posts'].find());
    const posts = await this.postModel
      .find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      })
      .exec();

    return posts;
    // return (await this.postModel.find().exec()).filter((post) => {
    //   if (post.title === undefined || post.description === undefined)
    //     return false;

    //   if (post.title === undefined) return post.description.includes(keyword);
    //   if (post.description === undefined) return post.title.includes(keyword);
    //   return post.title.includes(keyword) || post.description.includes(keyword);
    // });
  }
}
