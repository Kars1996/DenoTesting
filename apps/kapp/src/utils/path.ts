#!/usr/bin/env deno

import { resolve } from "@std/path";
import { ensureDir } from "@std/fs";
import _UI from "../ui/ui.ts";

export default class PathUtils {
    public static async resolvePath(path: string): Promise<string> {
        let absPath: string;
        if (path === "/" || path === ".") {
            absPath = Deno.cwd();
        } else {
            absPath = resolve(Deno.cwd(), path);
        }

        try {
            await Deno.stat(absPath);
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                await ensureDir(absPath);
                // UI.print(`Created Dir`)
            } else {
                throw error;
            }
        }
        return absPath;
    }
}
