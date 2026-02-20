import Link from "next/link";

export default async function Characters() {

    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-900 to-gray-900 p-8">
            <h1 className="text-4xl font-bold text-center text-green-400 mb-8">Characters</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {data.results.map((character: any) => (
                    <Link 
                        key={character.id}
                        href={`/characters/${character.id}`}
                        className="bg-gray-800 hover:bg-green-700 transition-all duration-300 p-4 rounded-lg border-2 border-green-500 hover:border-green-300 hover:scale-105 shadow-lg hover:shadow-green-500/50"
                    >
                        <p className="text-white text-center font-semibold text-lg">
                            {character.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )

}