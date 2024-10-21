import yoctoSpinner from "npm:yocto-spinner";
import Prompts from "../ui/prompts.ts";
import UI from "../ui/ui.ts";

class Github {
    private static readonly _commitMessage: string =
        "feat(⭐): Init Repository!";
    private static readonly _commitDesc: string =
        "🦕Powered by create-kapp (Deno Version)";

    private readonly _projectName: string;

    constructor(projectName: string) {
        this._projectName = projectName;
    }

    public async checkGit(): Promise<boolean> {
        try {
            const gitCommand = new Deno.Command("git", {
                args: ["--version"],
            });
            const output = await gitCommand.output();
            return output.code === 0; // ? Outputs True if found
        } catch (error) {
            console.error("Error checking Git installation:", error);
            return false;
        }
    }

    public async commit(): Promise<void> {
        // TODO: Implement Github commit logic
    }

    public async createRepo(): Promise<void> {
        // TODO: Implement Github repository creation logic
    }
}

export default async function GitSetup(projectName: string) {
    if (
        await Prompts.booleanChoice("Would you like to use git setup options")
    ) {
        const git = new Github(projectName);
        if (await git.checkGit()) {
            UI.print("Git Detected");
            const operation = await Prompts.choice("Pick an operation", [
                "Create a repo",
                "Commit to repo",
            ]);
            if (operation == "Create a repo") {
                const spinner = yoctoSpinner({ text: "Creating Repository" });
                await git.createRepo();
                setTimeout(() => {
                    spinner.text = "Calculating splines";
                }, 250);
                spinner.text = "Committing to repository";
                await git.commit();
                spinner.success("Setup Github!");
            }
            if (operation == "Commit to repo") {
                const spinner = yoctoSpinner({
                    text: "Committing to repository",
                });
                await git.commit();
                spinner.success("Committed successfully!");
            }
        }
    }
}
