# Rick and Morty Characters (MongoDB + Next.js API)

This project stores Rick and Morty characters in MongoDB and serves them through Next.js API routes.

## Assignment coverage

### Step 1: Store character data in MongoDB Atlas

- Database: `rickmorty`
- Collection: `characters`
- Stored fields: `name`, `species`, `image` (plus MongoDB's automatic `_id`)

The app auto-seeds two starter characters if the collection is empty:

- Rick Sanchez
- Morty Smith

## VS Code + Atlas setup

1. Create a MongoDB Atlas cluster and get your connection string.
2. Install **MongoDB for VS Code** extension.
3. Create `.env.local` in the project root:

```env
MONGODB_URI="your_atlas_connection_string"
```

4. In VS Code, open MongoDB extension → **Create Playground**.
5. Connect to your Atlas cluster and verify documents in `rickmorty.characters`.

### Optional playground insert example

```javascript
use("rickmorty");

db.characters.insertMany([
	{
		name: "Rick Sanchez",
		species: "Human",
		image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
	},
	{
		name: "Morty Smith",
		species: "Human",
		image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
	},
]);
```

## Step 2: API routes

- `GET /api/characters` → returns all characters
- `GET /api/characters/[id]` → returns one character by MongoDB `_id`
- `POST /api/add` → inserts one character with JSON body:
- `GET /api/health` → quick MongoDB connection health check

```json
{
	"name": "Summer Smith",
	"species": "Human",
	"image": "https://rickandmortyapi.com/api/character/avatar/3.jpeg"
}
```

## Step 3: Frontend now uses backend API

- `app/characters/page.tsx` fetches from `/api/characters`
- `app/characters/[id]/page.tsx` fetches from `/api/characters/[id]`

No direct fetches to `rickandmortyapi.com` are used by the frontend routes.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000/characters`.

## Postman test for `POST /api/add`

- Method: `POST`
- URL: `http://localhost:3000/api/add`
- Header: `Content-Type: application/json`
- Body: raw JSON (see example above)

## Health check endpoint

- URL: `http://localhost:3000/api/health`
- Success response: `{ "ok": true, ... }`
- If `MONGODB_URI` is missing or invalid, response is `{ "ok": false, ... }`
