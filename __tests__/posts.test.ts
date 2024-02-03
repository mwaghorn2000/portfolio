import { getPosts } from '../backend/posts';

// Mock the database collection method
const mockFind = jest.fn();
const mockToArray = jest.fn();
jest.mock('../app/lib/mongodb', () => ({
  getDb: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      find: mockFind,
    }),
  }),
}));

describe('getPosts', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockFind.mockClear();
    mockToArray.mockClear();
  });

  test('it should retrieve posts', async () => {
    const mockPosts = [{ title: 'Test Post', content: 'Content', author: 'Mitchell Waghorn', likes: 0, datePublished: '2024-01-29'}];
    mockFind.mockReturnValue({
      toArray: mockToArray.mockResolvedValue(mockPosts),
    });

    const db = require('../app/lib/mongodb').getDb();
    const posts = await getPosts(db);

    expect(mockFind).toHaveBeenCalledWith({});
    expect(posts).toEqual(mockPosts);
  });
});