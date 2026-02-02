import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

// Enable CORS first
app.use(cors());

app.use(express.json());

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../FrontEnd')));

const API_KEY = "f783bfffc29a7bf54993775e96b07101";

app.post("/api/weather", async (request, response) => {
    const { city } = request.body;

    if (!city) {
        return response.status(400).json({ error: "City is required" });
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const apiResponse = await fetch(url);
        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            return response.status(404).json({ error: data.message });
        }

        const report = {
            description: data.weather[0].description,
            temperature: data.main.temp,
            windSpeed: `${data.wind.speed} km/h`
        };

        response.json(report);

    } catch (error) {
        response.status(500).json({ error: "Could not fetch weather data" });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FrontEnd', 'index.html'));
});

app.listen(3000, () => {
    console.log("Weather backend running on port 3000");
});