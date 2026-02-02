document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('citySelect');
    const display = document.getElementById('cityDisplay');
    const report = document.getElementById('report');

    const img = document.createElement('img');
    img.id = 'weatherImage';
    img.src = '';
    img.width = 400;

    report.parentNode.appendChild(img);

    select.addEventListener('change', () => {
        if (select.value === "") {
            display.textContent = "No city selected.";
            report.textContent = "";
            img.src = '';
            return;
        }

        const selectedValue = select.value;
        const selectedText = select.options[select.selectedIndex].text;
        display.textContent = "You selected: " + selectedText;

        fetch("/api/weather", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ city: selectedValue })
        })
        .then(response => response.json())
        .then(weather => {

            if (!weather || !weather.description) {
                report.textContent = "Unable to retrieve weather data.";
                img.src = '';
                return;
            }

            report.textContent =
                `Weather in ${selectedText}: ${weather.description}, ${weather.temperature}°C, Wind: ${weather.windSpeed}`;

            const description = weather.description.toLowerCase();

            if (description.includes("sun") || description.includes("clear")) {
                img.src = "Images/sunny.gif";
            } else if (description.includes("cloud")) {
                img.src = "Images/cloudy.gif";
            } else if (description.includes("rain")) {
                img.src = "Images/rainy.gif";
            } else if (description.includes("snow")) {
                img.src = "Images/snowy.gif";
            } else {
                img.src = "";
            }
        })
        .catch(error => {
            console.error("There was a problem", error);
            report.textContent = "not able to retrieve weather data.";
            img.src = '';
        });
    });
}); 