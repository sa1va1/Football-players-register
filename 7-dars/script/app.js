document.addEventListener("DOMContentLoaded", () => {
    const playerForm = document.getElementById("playerForm");
    const playersList = document.getElementById("playersList");
    const filterClub = document.getElementById("filterClub");

    let players = JSON.parse(localStorage.getItem("players")) || [];

    const populateClubFilter = () => {
        const clubs = [...new Set(players.map(player => player.club))];
        filterClub.innerHTML = '<option value="">All Clubs</option>';
        clubs.forEach(club => {
            filterClub.innerHTML += `<option value="${club}">${club}</option>`;
        });
    };

    const displayPlayers = (playersToDisplay) => {
        playersList.innerHTML = '';
        playersToDisplay.forEach((player, index) => {
            playersList.innerHTML += `
                <div class="bg-gray-100 p-3 my-2 rounded-lg shadow-md flex justify-between items-center">
                    <div>
                        <p><strong>Name:</strong> ${player.name}</p>
                        <p><strong>Age:</strong> ${player.age}</p>
                        <p><strong>Club:</strong> ${player.club}</p>
                    </div>
                    <div>
                        <button class="bg-blue-500 text-white py-1 px-2 rounded mr-2" onclick="transferPlayer(${index})">Transfer</button>
                        <button class="bg-red-500 text-white py-1 px-2 rounded" onclick="deletePlayer(${index})">Delete</button>
                    </div>
                </div>
            `;
        });
    };

    const savePlayers = () => {
        localStorage.setItem("players", JSON.stringify(players));
    };

    playerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const club = document.getElementById("club").value;

        players.push({ name, age, club });
        savePlayers();
        populateClubFilter();
        displayPlayers(players);
        playerForm.reset();

        Toastify({
            text: "Player registered successfully!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#4caf50",
        }).showToast();
    });

    filterClub.addEventListener("change", () => {
        const filterValue = filterClub.value;
        const filteredPlayers = filterValue ? players.filter(player => player.club === filterValue) : players;
        displayPlayers(filteredPlayers);
    });

    window.transferPlayer = (index) => {
        const newClub = prompt("Enter new club for the player:");
        if (newClub) {
            players[index].club = newClub;
            savePlayers();
            populateClubFilter();
            displayPlayers(players);

            Toastify({
                text: "Player transferred successfully!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#2196f3",
            }).showToast();
        }
    };

    window.deletePlayer = (index) => {
        if (confirm("Are you sure you want to delete this player?")) {
            players.splice(index, 1);
            savePlayers();
            populateClubFilter();
            displayPlayers(players);

            Toastify({
                text: "Player deleted successfully!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336",
            }).showToast();
        }
    };

    populateClubFilter();
    displayPlayers(players);
});
