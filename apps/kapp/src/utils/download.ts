#!/usr/bin/env deno run --allow-read --allow-write --allow-net

import {
    templateTypes,
    templateOptions,
    templatePaths,
} from "../lib/consts.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import { join, resolve } from "https://deno.land/std/path/mod.ts";
import { unzip } from "npm:unzipit@1.4.3";

export default class Download {
    private static _path: string = "./src/release";

    constructor(private outputPath: string) {}

    private get releasePath(): string {
        return resolve(Download._path);
    }

    public async downloadTemplate(
        framework: templateTypes,
        templateName: string
    ): Promise<void> {
        if (!templateOptions[framework]?.includes(templateName)) {
            throw new Error(
                `Invalid template: ${templateName} for ${framework}`
            );
        }

        const zipName: string = `${templateName}.zip`;
        const srcPath = join(
            this.releasePath,
            templatePaths[framework],
            zipName
        );
        const destPath = join(this.outputPath, templateName);

        try {
            await ensureDir(destPath);
            const zipData = await Deno.readFile(srcPath);
            const { entries } = await unzip(zipData);

            for (const [name, entry] of Object.entries(entries)) {
                const entryPath = join(destPath, name);
                if (entry.isDirectory) {
                    await ensureDir(entryPath);
                } else {
                    await ensureDir(join(destPath, name, ".."));
                    const content = await entry.arrayBuffer();
                    await Deno.writeFile(entryPath, new Uint8Array(content));
                }
            }

            console.log(
                `Downloaded and extracted ${templateName} template for ${framework}`
            );
        } catch (error) {
            console.error(
                `Failed to copy template: ${(error as Error).message}`
            );
            throw error;
        }
    }

    public async findFiles(dir: string = this.outputPath): Promise<string[]> {
        const files: string[] = [];
        for await (const entry of Deno.readDir(dir)) {
            const path = join(dir, entry.name);
            if (entry.isDirectory) {
                files.push(...(await this.findFiles(path)));
            } else {
                files.push(path);
            }
        }
        return files;
    }
}
