import Character from "@/components/Character";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type CharacterData = {
  id: string;
  name: string;
  species: string;
  image: string;
};

async function getCharacter(id: string): Promise<CharacterData> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host");
  const protocol = host?.includes("localhost") ? "http" : (requestHeaders.get("x-forwarded-proto") ?? "http");
  const baseUrl = host ? `${protocol}://${host}` : "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/characters/${id}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch character from backend API");
  }

  return res.json();
}

export default async function CharacterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await getCharacter(id);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <Character
        name={character.name}
        species={character.species}
        image={character.image}
      />
    </div>
  );
}
