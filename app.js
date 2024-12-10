// app.js

const apiUrl = 'https://codestats.net/api/users/josglf26'; 
const jokeApiUrl = 'https://v2.jokeapi.dev/joke/Programming?type=single';

const badgesData = [
    {
        name: "Responsive Web Design",
        image: "./images/freecodecamp1.png",
        description: "November 15, 2024"
    }
];

async function fetchTimeTrackerStats() {
    try {
        const response = await fetch(apiUrl); 
        if (!response.ok) {
            throw new Error(`Error al obtener datos: ${response.statusText}`);
        }

        const data = await response.json();
        renderTimeTrackerStats(data); // Pasar los datos a la función de renderizado
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        document.getElementById("timetracker-container").innerHTML = "<p>No se pudieron cargar las estadísticas. Revisa la consola para más detalles.</p>";
    }
}

// Mostrar estadísticas en el DOM
function renderTimeTrackerStats(data) {
    const container = document.getElementById("timetracker-container");

    if (!data) {
        container.innerHTML = "<p class='error-message'>No hay estadísticas disponibles</p>";
        return;
    }

    let statsContent = `
            <ul class="languages-list">`;
    
    for (const language in data.languages) {
        statsContent += `
            <li class="language-item">
                <span class="language-name">${language}</span>
                <span class="language-xp">${data.languages[language].xps} XP</span>
            </li>`;
    }
    
    statsContent += `
            </ul>
        </div>`;

    container.innerHTML = statsContent;
    console.log(data);
}

// Renderizar insignias en el DOM
function renderBadges() {
    const container = document.getElementById("badges-container");

    if (!container) {
        console.error("El contenedor de insignias no existe en el DOM.");
        return;
    }

    badgesData.forEach(badge => {
        const badgeItem = document.createElement("div");
        badgeItem.className = "badge-item";
        badgeItem.innerHTML = `
            <img src="${badge.image}" alt="${badge.name}" class="badge-img">
            <p>${badge.description}</p>
        `;
        container.appendChild(badgeItem);
    });
}

// chistes de programación
async function fetchProgrammingJoke() {
    try {
        const response = await fetch(jokeApiUrl);
        const jokeData = await response.json();

        const jokeContainer = document.getElementById("joke-container");
        let jokeText = '';

        if (jokeData.type === 'single') {
            jokeText = `"${jokeData.joke}"`;
        } else {
            jokeText = `"${jokeData.setup}" - ${jokeData.delivery}`;
        }

        jokeContainer.innerHTML = `
            <blockquote>
                ${jokeText}
            <p>- Programming joke<p>
            </blockquote>

        `;
    } catch (error) {
        console.error("Error al obtener chiste:", error);
    }
}

// Ejecutar funciones cuando el documento esté cargado
document.addEventListener("DOMContentLoaded", () => {
    fetchTimeTrackerStats();  // Obtener estadísticas de Code::Stats
    renderBadges();           // Renderizar insignias
    fetchProgrammingJoke();   // Obtener chiste de programación
});
