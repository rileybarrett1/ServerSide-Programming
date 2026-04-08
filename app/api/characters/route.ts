import { NextResponse } from "next/server";
import { WithId } from "mongodb";
import { getCharactersCollection, seedCharactersIfEmpty } from "@/lib/mongodb";

type CharacterDoc = {
  name: string;
  species: string;
  image: string;
};

function toCharacterResponse(character: WithId<CharacterDoc>) {
  return {
    id: character._id.toString(),
    name: character.name,
    species: character.species,
    image: character.image,
  };
}

export async function GET() {
  try {
    await seedCharactersIfEmpty();

    const collection = await getCharactersCollection();
    const characters = await collection.find({}).toArray();

    return NextResponse.json(characters.map(toCharacterResponse));
  } catch (error) {
    console.error("Failed to fetch characters:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch characters";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
