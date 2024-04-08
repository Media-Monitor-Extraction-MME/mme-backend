import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, connect } from 'mongoose';
import { CommentSchema, Comment } from '../schemas/comment.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from '../schemas/post.schema';
import { numberToObjectId } from '../number-to-object-id/number-to-object-id';
import { ObjectId } from 'mongodb';

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
const mockedComments: Comment[] = [
  {
    _id: numberToObjectId(1),
    post: mockedPosts[0],
    comment: 'I agree',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(2),
    post: mockedPosts[0],
    comment: 'I disagree',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(3),
    post: mockedPosts[0],
    comment: 'I am neutral',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(4),
    post: mockedPosts[1],
    comment: 'I agree',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(5),
    post: mockedPosts[1],
    comment: 'I disagree',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(6),
    post: mockedPosts[1],
    comment: 'I am neutral',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(7),
    post: mockedPosts[2],
    comment: 'I agree',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(8),
    post: mockedPosts[2],
    comment: 'I disagree',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
  {
    _id: numberToObjectId(9),
    post: mockedPosts[2],
    comment: 'I am neutral',
    upvotes: 10,
    time: '2021-10-10T12:00:00.000Z',
    sentiment: {
      positive: 10,
      negative: 5,
      neutral: 3,
    },
  },
];

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let commentModel: Model<Comment>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    commentModel = mongoConnection.model(Comment.name, CommentSchema);
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getModelToken(Comment.name), useValue: commentModel },
      ],
    }).compile();
    commentsService = app.get<CommentsService>(CommentsService);
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

  beforeEach(async () => {
    await commentModel.insertMany(mockedComments);
  });

  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  it('should return all comments for a post', async () => {
    const comments = await commentsService.findAll(mockedPosts[0]._id);
    expect(comments.length).toEqual(3);
  });

  it('should return no comments for a post id that does not exist.', async () => {
    const comments = await commentsService.findAll(new ObjectId());
    expect(comments.length).toEqual(0);
  });
});
