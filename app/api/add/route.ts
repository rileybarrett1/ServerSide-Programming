import { NextResponse } from "next/server";
import { getCharactersCollection } from "@/lib/mongodb";

type IncomingCharacter = {
  name?: unknown;
  species?: unknown;
  image?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IncomingCharacter;

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const species = typeof body.species === "string" ? body.species.trim() : "";
    const image = typeof body.image === "string" ? body.image.trim() : "";

    if (!name || !species || !image) {
      return NextResponse.json(
        {
          error:
            "Invalid payload. Required fields: name (string), species (string), image (string).",
        },
        { status: 400 }
      );
    }

    const collection = await getCharactersCollection();

    const result = await collection.insertOne({
      name,
      species,
      image,
    });

    return NextResponse.json(
      {
        id: result.insertedId.toString(),
        name,
        species,
        image,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add character:", error);
    return NextResponse.json({ error: "Failed to add character" }, { status: 500 });
  }
}
