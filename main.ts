import { closeReadLine, UserInput } from "./inputs";
import { addPlayerToGeneralList, makeGame, endGame, gameInProgress, currentGame, showGeneralList } from "./functions";

export async function showMenu() {

    while (true) {
        console.log("\nLIGA DE BALONCESTO")
        console.log("\n Selecciona una opcion:\n")
        console.log("1) Agregar jugador")
        console.log("2) Ver listado")
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
                showGeneralList();
                break;

            case "3":
                console.log('\n Option 3 selected...');
                    makeGame();
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