"use client";

export default function CharactersError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-linear-to-b from-green-900 to-gray-900 p-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-gray-900 border border-red-400/50 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold text-red-300 mb-3">Couldn&apos;t load characters</h2>
  <p className="text-gray-200 mb-4 wrap-break-word">{error.message}</p>
        <p className="text-sm text-gray-300 mb-6">
          If this mentions <code>MONGODB_URI</code>, create <code>.env.local</code> in
          the project root and set your MongoDB Atlas connection string.
        </p>
        <button
          onClick={reset}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
