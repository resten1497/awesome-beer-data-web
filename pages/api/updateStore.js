import clientPromise from "../../lib/mongodb";
import { MongoClient, ObjectId } from "mongodb";

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db("awesomebeerdb");

  if (req.method == "POST") {
    let query = req.body;
    console.log(query);
    db.collection("beerTest")
      .updateOne({ _id: ObjectId(query._id) }, { $set: query.result })
      .then((data) => {
        console.log(data);
        if (data.acknowledged == true) {
          console.log("update success");
          res.status(200).send();
        } else {
          res.status(400).send();
        }
      });
  } else {
    res.send(400);
  }
};
