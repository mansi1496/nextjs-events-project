import { MongoClient } from "mongodb";
import { connectDB, insertDocument } from "../../helpers/db-util";

export default async function handler(req, res) {
  
  if (req.method === "POST") {
    const email = req.body.email;

    //Mongo db connection
    let client;
    try {
      client = await connectDB();
    } catch (error) {
      res.status(500).json({ message: "Database connection failed" });
      return;
    }

    try {
      await insertDocument(client, "newsLetter", { email: email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Data insertion failed!!" });
      return;
    }

    res.status(200).json({ message: "Signed up!!!", email: email });
  } else {
    res.status(200).json({ message: "Hello" });
  }
}
