import { closeReadLine, UserInput } from "./inputs";
import { addPlayerToGeneralList, makeGame, endGame, generalList, gameInProgress, currentGame } from "./functions";

export async function showMenu() {

    while (true) {

        console.log("\nLIGA DE BALONCESTO")
        console.log("\n Selecciona una opcion:")
        console.log("\n1) Agregar jugador")
        console.log("\n2) Ver listado")
        console.log("3) Iniciar proximo juego")
        console.log("4) Finalizar juego")
        console.log("5) Salir del programa\n")

        const choise = (await UserInput.getString("Select an option: ")).toString();

        if (choise === '5') {
            console.log('Goodbye!');
            closeReadLine();
            break;
        }
        switch (choise) {
            case "1":
                console.log('\n Option 1 selected...');
                addPlayerToGeneralList();
                break;

            case "2":
                console.log('\n Option 2 selected...');
                generalList.forEach((player, index) => {
                    console.log(`${index + 1} - ${player}`)
                });
                break;

            case "3":
                console.log('\n Option 3 selected...');
                setTimeout(() => {
                    makeGame();
                    setTimeout(() => {
                        showMenu();
                    }, 1000);
                }, 1000)
                break;

            case "4":
                console.log('Option 4 selected...');
                if (gameInProgress) {
                    endGame(currentGame[0], currentGame[1]);
                } else {
                    console.log("No hay juego en curso");
                    setTimeout(() => {
                        showMenu();
                    }, 1000);
                }
                break;
            
            default:
                console.log("OPCION INVALIDA!");
                setTimeout(() => {
                    showMenu();
                }, 1000);
        }
    }

}

showMenu();