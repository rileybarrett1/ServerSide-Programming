import Image from "next/image";

export default function Home() {
  return (
    <div 
      className="flex min-h-screen flex-col items-center justify-center p-8 relative"
      style={{
        backgroundImage: "url('/rick-and-morty.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      
      <main className="flex flex-col items-center gap-8 relative z-10">
        <div className="bg-green-500 rounded-full p-6 shadow-lg shadow-green-500/50">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
            className="invert"
          />
        </div>
        <h1 className="text-5xl font-bold text-center text-green-400 drop-shadow-lg">
          Welcome to Rick and Morty Trivia Adventure!
        </h1>
        <p className="text-xl text-center text-gray-200 max-w-md">
          Explore characters from the Rick and Morty universe. Click on Characters to get started!
        </p>
        <div className="flex gap-4 mt-4">
          <a 
            href="/characters" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/50"
          >
            Explore Characters
          </a>
        </div>
      </main>
    </div>
  );
}
