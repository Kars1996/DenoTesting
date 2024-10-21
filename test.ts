import Prompts from "./src/ui/prompts.ts";

console.log(
    await Prompts.choice("Pick an operation", [
        "Create a repository",
        "existing repository",
    ])
);
