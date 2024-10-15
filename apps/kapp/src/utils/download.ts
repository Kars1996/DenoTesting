#!/usr/bin/env deno run --allow-read --allow-write --allow-net

import { templateTypes, templateOptions } from "../lib/consts.ts";
import { ensureDir } from "@std/fs";
import { join, resolve } from "@std/path";
import { unzip } from "@std/tar";

export default class Download {
    private static _path: string = "./src/release";

    constructor(private outputPath: string) {}

    private get releasePath(): string {
        return resolve(Download._path);
    }

    public async downloadTemplate(
        template: templateTypes,
        templateName: string
    ): Promise<void> {
        if (!templateOptions[template]?.includes(templateName)) {
            throw new Error(
                `Invalid template: ${templateName} for ${template}`
            );
        }

        const zipName: string = `${templateName}.zip`;
        const srcPath = join(this.releasePath, zipName);
        const destPath = join(this.outputPath, templateName);

        try {
            await ensureDir(destPath);

            const zipData = await Deno.readFile(srcPath);
            for await (const entry of unzip(zipData)) {
                const entryPath = join(destPath, entry.fileName);

                // Ensure directory exists for nested files
                if (entry.isFile) {
                    await ensureDir(join(destPath, entry.fileName));
                    await Deno.writeFile(entryPath, await entry.read());
                }
            }

            console.log(`Downloaded and extracted ${templateName} template`);
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
