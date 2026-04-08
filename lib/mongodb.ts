import { Collection, Db, MongoClient } from "mongodb";

type CharacterDoc = {
  name: string;
  species: string;
  image: string;
};

const starterCharacters: CharacterDoc[] = [
  {
    name: "Rick Sanchez",
    species: "Human",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    name: "Morty Smith",
    species: "Human",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
];

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (global._mongoClientPromise) {
    return global._mongoClientPromise;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Please define MONGODB_URI in your environment variables.");
  }

  const client = new MongoClient(mongoUri);
  const promise = client.connect();

  if (process.env.NODE_ENV !== "production") {
    global._mongoClientPromise = promise;
  }

  return promise;
}

export async function getDatabase(): Promise<Db> {
  const connectedClient = await getClientPromise();
  return connectedClient.db("rickmorty");
}

export async function getCharactersCollection(): Promise<Collection<CharacterDoc>> {
  const db = await getDatabase();
  return db.collection<CharacterDoc>("characters");
}

export async function seedCharactersIfEmpty(): Promise<void> {
  const collection = await getCharactersCollection();
  const count = await collection.estimatedDocumentCount();

  if (count === 0) {
    await collection.insertMany(starterCharacters);
  }
}
