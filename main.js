const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let generalList = [];
let queuelList = [];
let currentTeams = null;

function addPlayerToGeneralList() {
    rl.question("\n Digite el nombre del jugador: ", (player) => {
        console.log(`\n Jugador \'${player}\' agregado a la lista.`)
        generalList.push(player);
        queuelList.push(player);
        generalList.forEach((player, index) => {
            console.log(`${index + 1} - ${player}`)
        });

        rl.question("Desea agregar otro jugador? (s/n): ", (response) => {
            if (response.toLowerCase() == 's') {
                addPlayerToGeneralList();
            } else {
                console.log("Regresando al menu...")
                showMenu();
            }
        });
    });
}

function showMenu() {
    console.log("\nLIGA DE BALONCESTO")
    console.log("\n Selecciona una opcion:")
    console.log("\n1) Agregar jugador")
    console.log("\n2) Ver listado")
    console.log("3) Iniciar proximo juego")
    console.log("4) Finalizar juego")
    console.log("5) Salir del programa\n")

    rl.question("Opcion: ", (option) => {
        switch (option) {
            case "1":
                console.log("\n Opcion 1 seleccionada");
                addPlayerToGeneralList();
                break;

            case "2":
                console.log("\n Opcion 2 seleccionada");
                generalList.forEach((player, index) => {
                    console.log(`${index + 1} - ${player}`)
                });
                showMenu();
                break;

            case "3":
                setTimeout(() => {
                    currentTeams = makeGame();
                    if (currentTeams) {
                        console.log("Juego Iniciado")
                    }
                    setTimeout(() => {
                        showMenu();
                    }, 1000);
                }, 1000)
                break;

            case "4":
                if (currentTeams) {
                    endGame(currentTeams.team1, currentTeams.team2)
                } else {
                    console.log("No hay juego en curso");
                    setTimeout(() => {
                        showMenu();
                    }, 1000);
                }
                break;

            case "5":
                console.log("\n Saliendo del programa...")
                rl.close();
                break;

            default:
                console.log("OPCION INVALIDA!");
                setTimeout(() => {
                    showMenu();
                }, 1000);
        }
    });

}

showMenu();

function makeGame() {

    if (currentTeams) {
        console.log("Hay un juego en curso.");
        return;
    }
    if (generalList.length < 10) {
        console.log("Min 10 players to start a game.");
        return;
    };
    let currentGame = queuelList.splice(0, 10);

    let team1 = currentGame.slice(0, 5);
    let team2 = currentGame.slice(5, 10);

    console.log("Iniciando juego...")

    console.log("Team 1:", team1);
    console.log("Team 2:", team2);

    return { team1, team2 };
};

function endGame(team1, team2) {
    console.log("Team 1: ", team1);
    console.log("Team 2: ", team2);
    rl.question("Elige el equipo ganador: ", (team) => {
        if (Number(team) === 1) {
            queuelList.push(...team2);
            console.log("El equipo 1 sigue jugando");
        } else if (Number(team) === 2) {
            queuelList.push(...team1);
            console.log("El equipo 2 sigue jugando");
        } else {
            console.log("Opcion no valida");
        }
        showMenu();
    });
}



