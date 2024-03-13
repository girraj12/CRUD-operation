import { MongoClient } from "mongodb";

const url = "mongodb+srv://girrajsinghal:girraj@cluster0.xy9oqoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongodb is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getDB = () => {
  return client.db("ExpenZap");
};

