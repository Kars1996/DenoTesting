#!/usr/bin/env deno
import UI from "./ui/ui.ts";
import Prompts from "./ui/prompts.ts";
import Download from "./utils/download.ts";
import templateOptions, { icons, templatePaths } from "./lib/consts.ts";

// TODO: Main UI functionality
const isDev: boolean = Deno.args.includes("--dev");

function earlyExit(value: unknown): asserts value is NonNullable<typeof value> {
    if (value === undefined || value === null) {
        UI.print("Exiting Early");
        UI.footer();
        Deno.exit(0);
    }
}

if (import.meta.main) {
    UI.header(isDev);
    UI.print("Welcome to the Deno Testing Framework!");
    const templateCategory = await Prompts.choice(
        "Select a template category",
        Object.keys(templateOptions) as (keyof typeof templateOptions)[]
    );
    earlyExit(templateCategory)
    const template = await Prompts.choice(
        `${icons[templateCategory]} Select a template`,
        templateOptions[templateCategory]
    );
    earlyExit(template)

}
