import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-gray-800 p-4">
      <nav className="flex gap-6 justify-center">
        <Link href="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link href="/characters" className="text-white hover:text-gray-300">
          Characters
        </Link>
      </nav>
    </header>
  );
}
