document.addEventListener("DOMContentLoaded", () => {
    fetchTimeTrackerStats();  // Obtener y mostrar estadísticas de Code::Stats
    renderBadges();  // Mostrar insignias
});

// URL y token de la API de Code::Stats
const apiUrl = 'https://codestats.net/api/users/josglf26';
const apiToken = 'SFMyNTY.YW05eloyeG1Nalk9IyNNalEwTURRPQ.4VoOQMVDx4K5sk7cAPKm1LElqpDUR5rmreN93F2VCPg';

// Datos de las insignias (badges)
const badgesData = [
    {
        name: "Responsive Web Design",
        image: "./images/freecodecamp1.png",
        description: "Developer certification on November 15, 2024"
    }
];

// Obtener estadísticas de Code::Stats
async function fetchTimeTrackerStats() {
    try {
        const response = await fetch(apiUrl, {
            headers: { 'X-API-Token': apiToken }
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        renderTimeTrackerStats(data);  // Llamar a la función para renderizar los datos
    } catch (error) {
        console.error("Error fetching Code Stats:", error);
        document.getElementById("timetracker-container").innerHTML = "<p>Failed to load stats. Please check the console for details.</p>";
    }
}

// Mostrar las estadísticas de Code::Stats
function renderTimeTrackerStats(data) {
    const container = document.getElementById("timetracker-container");
    
    if (!data) {
        container.innerHTML = "<p>No stats available</p>";
        return;
    }

    let statsContent = ` 
        <p>Total XP: ${data.total_xp}</p>
        <p>New XP: ${data.new_xp}</p>
        <h4>Machines</h4>
        <ul>`;
    
    for (const machine in data.machines) {
        statsContent += `<li>${machine}: ${data.machines[machine].xps} XP</li>`;
    }

    statsContent += `</ul>`;
    
    container.innerHTML = statsContent;
}

// Renderizar insignias (Badges)
function renderBadges() {
    const container = document.getElementById("badges-container");

    if (!container) {
        console.error("El contenedor de badges no existe en el DOM.");
        return;
    }

    badgesData.forEach(badge => {
        const badgeItem = document.createElement("div");
        badgeItem.className = "badge-item";
        badgeItem.innerHTML = `
            <img src="${badge.image}" alt="${badge.name}" class="badge-img">
            <h3>${badge.name}</h3>
            <p>${badge.description}</p>
        `;
        container.appendChild(badgeItem);
    });
}
