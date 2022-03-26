import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://root:root@cluster0.0trdk.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getComments(client, collection, sort) {
  const db = (await client).db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
