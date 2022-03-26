import { MongoClient } from "mongodb";
import {
  connectDB,
  getComments,
  insertDocument,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  //db connection
  let client;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });

    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      (await client).close();
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      const result = await insertDocument(client, "comment", newComment);
      console.log(newComment);
      newComment._id = result.insertedId;
      res
        .status(201)
        .json({ message: "New Comment added!!", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Data insertion failed!!" });
      (await client).close();
      return;
    }
  }
  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "Max",
        email: "max@yopmail.com",
        text: "This is a first comment!",
      },
      {
        id: "c2",
        name: "Manuel",
        email: "manuel@yopmail.com",
        text: "This is a second comment!",
      },
    ];

    //db

    try {
      const documents = await getComments(client, "comment", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!!!" });
    }
  }

  (await client).close();
}
