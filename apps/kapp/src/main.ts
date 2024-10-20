#!/usr/bin/env deno
import UI from "./ui/ui.ts";
import Prompts from "./ui/prompts.ts";
import Path from "./utils/path.ts";
import Download from "./utils/download.ts";
import templateOptions, { icons } from "./lib/consts.ts";

const isDev: boolean = Deno.args.includes("--dev");

function earlyExit(value: unknown): asserts value is NonNullable<typeof value> {
    if (value === undefined || value === null) {
        UI.print("Exiting Early", true);
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
    earlyExit(templateCategory);
    const template = await Prompts.choice(
        `${icons[templateCategory]} Select a template`,
        templateOptions[templateCategory]
    );
    earlyExit(template);
    let path: string = await Prompts.text("Select a file path");
    earlyExit(path);
    path = await Path.resolvePath(path);

    const download = new Download(path);
    try {
        if (!isDev) {
            await download.downloadTemplate(
                templateCategory as keyof typeof templateOptions,
                template
            );
        }
    } catch (err) {
        if (err instanceof Error) {
            UI.print(`Error downloading template: ${err.message}`, true);
        } else {
            UI.print(`Error downloading template: ${String(err)}`, true);
        }
        UI.footer();
        Deno.exit(1);
    }
}
