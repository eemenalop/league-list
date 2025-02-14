import { promises } from "dns";
import * as readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    })
}

export function closeReadLine(){
    rl.close();
    return;
}

export class UserInput{

    static async getString(question: string): Promise<string>{
        return await askQuestion(question);
    }

    static async getNumber(question: string): Promise<number>{
        let answer = await askQuestion(question);
        return parseInt(answer);
    }
}