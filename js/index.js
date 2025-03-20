const requestURL = 'https://f1api.dev/api/current/drivers-championship';

async function fetchChampionshipJson() {
    try {
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Problem load api https://f1api.dev/api/current/drivers-championship', error);
        return null;
    }
}

function createChampionshipTable({ position, points, driver, team }) {
    return `
        <tr>
            <th scope="row" class="text-center">${position}</th>
            <td>${driver.name} ${driver.surname}</td>
            <td class="text-center">${points}</td>
            <td>${team.teamName}</td>
        </tr>
    `;
}

async function displayChampionship() {
    const championshipSection = document.getElementById('championshipSection');
    const championshipData = await fetchChampionshipJson();

    if (championshipData && championshipData.drivers_championship) {
        const ChampionshipTable = championshipData.drivers_championship.map(createChampionshipTable).join('');
        championshipSection.innerHTML = ChampionshipTable;
    } else {
        championshipSection.innerHTML = '<p>Not Access to api https://f1api.dev/api/current/drivers-championship</p>';
    }
}

displayChampionship();