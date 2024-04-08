import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { Post, PostSchema } from '../schemas/post.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, connect, Model } from 'mongoose';
import { numberToObjectId } from '../number-to-object-id/number-to-object-id';

const mockedPosts: Post[] = [
  {
    _id: numberToObjectId(1),
    title: 'Lady Gaga is okay',
    origin: 'Reddit',
    upvotes: '1000',
    description: 'Lady Gaga is a singer',
    url: 'https://www.reddit.com/r/Music',
    time: '2021-10-10T12:00:00.000Z',
    collectiveSentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(2),
    title: 'Lady Gaga likes hamburger',
    origin: 'Reddit',
    upvotes: '1000',
    description: 'Lady Gaga is a singer',
    url: 'https://www.reddit.com/r/Music',
    time: '2021-10-10T12:00:00.000Z',
    collectiveSentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(3),
    title: 'Lady Gaga is the worst ever',
    origin: 'Reddit',
    upvotes: '1000',
    description: 'Lady Gaga is a singer',
    url: 'https://www.reddit.com/r/Music',
    time: '2021-10-10T12:00:00.000Z',
    collectiveSentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
];
describe('PostsService', () => {
  let postService: PostsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let postModel: Model<Post>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    postModel = mongoConnection.model(Post.name, PostSchema);
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: getModelToken(Post.name), useValue: postModel },
      ],
    }).compile();
    postService = app.get<PostsService>(PostsService);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  describe('Findall Method', () => {
    beforeEach(async () => {
      await postModel.create(mockedPosts);
    });
    it('should return an empty array of posts', async () => {
      const posts = await postService.findAll({ keyword: 'BTS' });
      expect(posts).toBeInstanceOf(Array);
      expect(posts).toHaveLength(0);
    });

    it('should return an array of posts with the correct length', async () => {
      const posts = await postService.findAll({ keyword: 'Lady Gaga' });
      expect(posts).toHaveLength(3);
    });
  });
});
