import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type Character = {
    id: string;
    name: string;
    species: string;
    image: string;
};

async function getCharacters(): Promise<Character[]> {
    const requestHeaders = await headers();
    const host = requestHeaders.get("host");
    const protocol = host?.includes("localhost") ? "http" : (requestHeaders.get("x-forwarded-proto") ?? "http");
    const baseUrl = host ? `${protocol}://${host}` : "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/characters`, { cache: "no-store" });

    if (!res.ok) {
        const fallbackMessage = "Failed to fetch characters from backend API";
        let message = fallbackMessage;

        try {
            const errorPayload = (await res.json()) as { error?: string };
            message = errorPayload.error ?? fallbackMessage;
        } catch {
            message = fallbackMessage;
        }

        throw new Error(message);
    }

    return res.json();
}

export default async function Characters() {
    const characters = await getCharacters();

    return (
    <div className="min-h-screen bg-linear-to-b from-green-900 to-gray-900 p-8">
            <h1 className="text-4xl font-bold text-center text-green-400 mb-8">Characters</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {characters.map((character) => (
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