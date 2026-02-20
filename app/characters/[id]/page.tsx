import Character from "@/components/Character";

export default async function CharacterDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const character = await res.json();

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
