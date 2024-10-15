// import { readLines } from "https://deno.land/std/io/mod.ts";

// class KPrompts {
//     private colors: { [key: string]: string };

//     constructor() {
//         this.colors = {
//             cyan: "\x1b[36m",
//             green: "\x1b[32m",
//             red: "\x1b[31m",
//             white: "\x1b[37m",
//             grey: "\x1b[90m",
//             underline: "\x1b[4m",
//             selected: "\x1b[36m\x1b[4m",
//             reset: "\x1b[0m",
//         };
//     }

//     private print(text: string): void {
//         Deno.stdout.writeSync(
//             new TextEncoder().encode(
//                 `${this.colors.white}${text}${this.colors.reset}`
//             )
//         );
//     }

//     private errorPrint(message: string): void {
//         this.print(`${this.colors.red}× ${message}${this.colors.reset}\n`);
//     }

//     private finalPrint(
//         question: string,
//         answer: string,
//         isPassword: boolean = false
//     ): void {
//         const displayAnswer = isPassword ? "•".repeat(answer.length) : answer;
//         console.log(
//             `${this.colors.green}√${this.colors.white} ${question} ${this.colors.grey}»${this.colors.white} ${displayAnswer}`
//         );
//     }

//     private async betterInput(
//         text: string,
//         isPassword: boolean = false
//     ): Promise<string> {
//         this.print(
//             `${this.colors.cyan}? ${this.colors.white}${text} ${this.colors.grey}»${this.colors.white} `
//         );
//         const input = await readLines(Deno.stdin).next();
//         return input.value || "";
//     }

//     private async selectInput(
//         message: string,
//         choices: string[]
//     ): Promise<string> {
//         let selected = 0;
//         const numChoices = choices.length;

//         const renderChoices = () => {
//             console.clear();
//             this.print(
//                 `${this.colors.cyan}? ${this.colors.white}${message} ${this.colors.grey}» - Use arrow-keys. Return to submit.${this.colors.reset}\n`
//             );
//             choices.forEach((choice, index) => {
//                 if (index === selected) {
//                     this.print(
//                         `${this.colors.selected}» ${choice}${this.colors.reset}\n`
//                     );
//                 } else {
//                     this.print(`  ${choice}\n`);
//                 }
//             });
//         };

//         renderChoices();

//         while (true) {
//             const key = await Deno.stdin.read(new Uint8Array(1));
//             if (key) {
//                 switch (key[0]) {
//                     case 65: // Up arrow
//                         selected = (selected - 1 + numChoices) % numChoices;
//                         break;
//                     case 66: // Down arrow
//                         selected = (selected + 1) % numChoices;
//                         break;
//                     case 13: // Enter
//                         return choices[selected];
//                 }
//                 renderChoices();
//             }
//         }
//     }

//     public async prompt(options: {
//         option: "input" | "password" | "select" | "confirm";
//         message: string;
//         choices?: string[];
//         keep?: boolean;
//     }): Promise<string | boolean> {
//         const { option, message, choices, keep = true } = options;

//         try {
//             let userInput: string | boolean;

//             switch (option) {
//                 case "input":
//                 case "password":
//                     userInput = await this.betterInput(
//                         message,
//                         option === "password"
//                     );
//                     break;
//                 case "select":
//                     if (!choices || choices.length === 0) {
//                         throw new Error(
//                             "Choices must be provided for select option"
//                         );
//                     }
//                     userInput = await this.selectInput(message, choices);
//                     break;
//                 case "confirm":
//                     userInput = await this.betterInput(
//                         `${message} ${this.colors.grey}(y/n)`
//                     );
//                     userInput = (userInput as string).toLowerCase() === "y";
//                     break;
//                 default:
//                     throw new Error(`Invalid option: ${option}`);
//             }

//             if (keep) {
//                 this.finalPrint(
//                     message,
//                     userInput.toString(),
//                     option === "password"
//                 );
//             }

//             return userInput;
//         } catch (error) {
//             console.error("An error occurred:", error);
//             return "";
//         }
//     }
// }

// // Usage example
// async function test() {
//     const kprompts = new KPrompts();

//     console.log("\x1b[1;31mGeneral Tests");

//     console.log(
//         await kprompts.prompt({ option: "input", message: "Enter any input" })
//     );
//     console.log(
//         await kprompts.prompt({
//             option: "password",
//             message: "Enter a password",
//         })
//     );
//     console.log(
//         await kprompts.prompt({
//             option: "confirm",
//             message: "Confirm yes or no",
//         })
//     );
//     console.log(
//         await kprompts.prompt({
//             option: "select",
//             message: "Select any option",
//             choices: ["Option1", "Option2", "Option3"],
//         })
//     );
// }

// if (import.meta.main) {
//     test();
// }
