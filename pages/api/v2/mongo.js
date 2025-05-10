import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("studio")
    .find({})
    .limit(20)
    .toArray();
  console.log(movies);
  res.json(movies);
};
