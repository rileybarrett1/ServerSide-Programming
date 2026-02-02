import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

const weatherReports = {
    "Toronto": {
        description: "Sunny",
        temperature: 18,
        windSpeed: "11 km/h"
    },
    "Vancouver": {
        description: "Cloudy",
        temperature: 12,
        windSpeed: "37 km/h"
    },
    "Montreal": {
        description: "Partly Cloudy",
        temperature: 15,
        windSpeed: "15 km/h"
    },
    "Halifax": {
        description: "Rain",
        temperature: 9,
        windSpeed: "22 km/h"
    }
};

app.post("/api/weather", (request, response) => {
    const { city } = request.body;
    const report = weatherReports[city];
    if (report) {
        response.json(report);
    } else {
        response.status(404).json({ error: "City not found" });
    }
});

app.listen(3000, () => {
    console.log("Weather backend running on port 3000");
});