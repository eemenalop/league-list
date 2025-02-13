import { UserInput, askQuestion } from "./inputs";
import { showMenu } from "./main";


export const generalList: string[] = [];
const queuelList: string[] = [];
export let gameInProgress = false;

interface CurrentGame {
    team1: string[],
    team2: string[]
}

export let currentGame: CurrentGame ={team1: [], team2: []}

export async function addPlayerToGeneralList() {

    const player = (await UserInput.getString('Enter a player: ')).toString();
    generalList.push(player);
    queuelList.push(player);
    generalList.forEach((player, index) => {
        console.log(`${index + 1} - ${player}`)
    });
    console.log(`\n Player \'${player}\' added to the list...`)
    
    const addOtherPlayer = await UserInput.getString('Desea agregar otro jugador? (s/n): ');
    if (addOtherPlayer.toLowerCase() == 's') {
        await addPlayerToGeneralList();
    } else {
        console.log("Regresando al menu...")
        await showMenu();
    }
}

export function makeGame() {

    if (gameInProgress) {
        console.log("Hay un juego en curso.");
        return;
    }
    if (generalList.length < 10) {
        console.log("Min 10 players to start a game.");
        return;
    };
    
    currentGame.team1 = queuelList.splice(0, 5);
    currentGame.team2 = queuelList.splice(0, 5);

    gameInProgress = true;

    console.log("Iniciando juego...")

    console.log("Team 1:", currentGame.team1);
    console.log("Team 2:", currentGame.team2);

    return {team1: currentGame.team1, team2:currentGame.team2};
};

export async function endGame(team1: string[], team2: string[]) {

    console.log('\nPartido en curso');
    console.log('↓↓↓↓↓');
    console.log("Team 1: ", team1);
    console.log("Team 2: ", team2);

    const winnerTeam = (await UserInput.getNumber('Select the winner team: '));
        if (Number(winnerTeam) === 1) {
            queuelList.push(...team2);
            team2 = [];
            console.log("El equipo 1 sigue jugando");
            gameInProgress = false;
            await showMenu();
            return;
        } else if (Number(winnerTeam) === 2) {
            queuelList.push(...team1);
            team1 = [];
            console.log("El equipo 2 sigue jugando");
            gameInProgress = false;
            await showMenu();
            return;
        } else {
            console.log("Opcion no valida");
            await showMenu();
            return;
        }
}

export function showGeneralList() {
    if (generalList.length === 0) {
        console.log('\nThere are not players on the list');
    }
    generalList.forEach((player, index) => {
        console.log(`${index + 1} - ${player}`)
    });
}
