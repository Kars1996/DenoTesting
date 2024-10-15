#!/usr/bin/env deno

export const templateOptions: Record<string, string[]> = {
    "Next.js": ["Template", "APITemplate"],
    "Discord.js": ["DJS14Template"],
};

export const icons: Record<string, string> = {
    "Next.js": "▲",
    "Discord.js": "§",
};

export type templateTypes = keyof typeof templateOptions;