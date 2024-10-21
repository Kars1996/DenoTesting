#!/usr/bin/env deno

import prompts from "prompts";
import UI from "./ui.ts";

export default class Prompts {
    public static async choice<T extends string>(
        title: string,
        options: T[]
    ): Promise<T> {
        const response = await prompts({
            type: "select",
            name: "choice",
            message: title,
            choices: options.map((option) => ({
                title: option,
                value: option,
            })),
        });
        UI.divider();
        return response.choice;
    }

    public static async booleanChoice(
        prompt: string,
        starting: boolean = true
    ) {
        const response = await prompts({
            type: "toggle",
            name: "boolean",
            message: prompt,
            initial: starting,
            active: "true",
            inactive: "false",
        });
        UI.divider();
        return response.boolean;
    }

    public static async text(
        prompt: string,
        defaultValue?: string
    ): Promise<string> {
        const response = await prompts({
            type: "text",
            name: "text",
            message: prompt,
            initial: defaultValue,
            validate: (value: string) =>
                value ? true : `Please enter a valid value.`,
        });
        UI.divider();
        return response.text;
    }
}
