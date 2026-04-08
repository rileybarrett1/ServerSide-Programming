import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCharactersCollection, seedCharactersIfEmpty } from "@/lib/mongodb";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await seedCharactersIfEmpty();

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid character id" },
        { status: 400 }
      );
    }

    const collection = await getCharactersCollection();
    const character = await collection.findOne({ _id: new ObjectId(id) });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: character._id.toString(),
      name: character.name,
      species: character.species,
      image: character.image,
    });
  } catch (error) {
    console.error("Failed to fetch character by id:", error);
    return NextResponse.json(
      { error: "Failed to fetch character" },
      { status: 500 }
    );
  }
}
