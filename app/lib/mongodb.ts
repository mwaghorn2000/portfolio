import { MongoClient, Db, ServerApiVersion } from 'mongodb';
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
if (!dbName) throw new Error('Please define the MONGODB_DB environment variable inside .env.local');

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri as string, {
    serverApi: ServerApiVersion.v1,
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
