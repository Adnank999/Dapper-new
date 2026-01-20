

// mongodb.ts
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// if (!uri) throw new Error("Missing MONGODB_URI");

// const dbName = process.env.MONGODB_DB;
// if (!dbName) throw new Error("Missing MONGODB_DB");

// declare global {
//   // eslint-disable-next-line no-var
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// const clientPromise =
//   global._mongoClientPromise ??
//   (global._mongoClientPromise = new MongoClient(uri).connect());

// export default clientPromise;

// // ✅ export a Db (not Promise)
// export const db = (await clientPromise).db(dbName);

import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

const dbName = process.env.MONGODB_DB;
if (!dbName) throw new Error("Missing MONGODB_DB");

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export const client =
  global._mongoClient ?? (global._mongoClient = new MongoClient(uri));

export const clientPromise =
  global._mongoClientPromise ?? (global._mongoClientPromise = client.connect());

// This does NOT need an active connection immediately
export const db = client.db(dbName);

// Use this anywhere you want to guarantee the connection is established
export async function connectMongo() {
  await clientPromise;
  return { client, db };
}
