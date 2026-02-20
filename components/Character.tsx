import Image from "next/image";

interface CharacterProps {
  name: string;
  species: string;
  image: string;
}

export default function Character({ name, species, image }: CharacterProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg shadow-md">
      <Image
        src={image}
        alt={name}
        width={200}
        height={200}
        className="rounded-full"
      />
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-lg text-gray-600">Species: {species}</p>
    </div>
  );
}
