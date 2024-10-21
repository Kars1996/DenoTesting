#!/usr/bin/env deno

import { cyan, green, white, bold, gray, red } from "kolorist";

export default class UI {
    public static divider(): void {
        console.log(white(""));
    }

    public static header(isDev: boolean): void {
        this.divider();
        console.log(bold(cyan("Deno Testing Framework")));
        if (isDev) {
            console.log(gray("Running in development mode"));
        }
        this.divider();
    }

    public static print(text: string, isRed?: boolean): void {
        const color = isRed ? red(text) : text;
        console.log(bold(color));
    }

    public static footer(): void {
        this.divider();
        console.log(green("Testing completed successfully"));
        this.divider();
    }
}
