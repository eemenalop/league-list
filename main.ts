import { closeReadLine, UserInput } from "./inputs";
import { addPlayerToGeneralList, makeGame, endGame, gameInProgress, currentGame, showGeneralList } from "./functions";

export async function showMenu() {

    while (true) {
        console.log("\nBasketball League")
        console.log("\n Choose an option: \n")
        console.log("1) Add a Player")
        console.log("2) Check the general list.")
        console.log("3) Start the game")
        console.log("4) End game")
        console.log("5) Exit\n")

        const choise = (await UserInput.getString("Select an option: ")).toString();

        if (choise === '5') {
            console.log('Goodbye!');
            closeReadLine();
            break;
        }

        switch (choise) {
            case "1":
                console.log('\n Option 1 selected...');
                await addPlayerToGeneralList();
                break;

            case "2":
                console.log('\n Option 2 selected...');
                showGeneralList();
                break;

            case "3":
                console.log('\n Option 3 selected...')
                makeGame();
                break;

            case "4":
                console.log('Option 4 selected...');
                if (gameInProgress) {
                    endGame(currentGame.team1, currentGame.team2);
                } else {
                    console.log("There is not game in progress");
                }
                break;
            
            default:
                console.log("OPCION INVALIDA!");
                break;
        };
    };

};

showMenu();