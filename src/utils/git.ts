import yoctoSpinner from "npm:yocto-spinner";
import Prompts from "../ui/prompts.ts";
import UI from "../ui/ui.ts";

class Github {
    private readonly _commitMessage: string = "feat(⭐): Init Repository!";
    private readonly _commitDesc: string =
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
        try {
            const gitAddCommand = new Deno.Command("git", {
                args: ["add", "."],
            });
            await gitAddCommand.output();

            const gitCommitCommand = new Deno.Command("git", {
                args: [
                    "commit",
                    "-m",
                    this._commitMessage,
                    "-m",
                    this._commitDesc,
                ],
            });
            await gitCommitCommand.output();

            const gitPushCommand = new Deno.Command("git", {
                args: ["push"],
            });
            await gitPushCommand.output();

            console.log("Commit successful!");
        } catch (error) {
            console.error("Error committing to repository:", error);
        }
    }

    public async createRepo(): Promise<void> {
        try {
            const gitInitCommand = new Deno.Command("git", {
                args: ["init"],
            });
            await gitInitCommand.output();

            const gitRemoteCommand = new Deno.Command("git", {
                args: [
                    "remote",
                    "add",
                    "origin",
                    `https://github.com/user/${this._projectName}.git`,
                ],
            });
            await gitRemoteCommand.output();

            console.log("Repository created successfully!");
        } catch (error) {
            console.error("Error creating repository:", error);
        }
    }
}

export default async function GitSetup(projectName: string, isDev: boolean) {
    if (isDev) return;
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

            if (operation === "Create a repo") {
                const spinner = yoctoSpinner({ text: "Creating Repository" });
                await git.createRepo();
                setTimeout(() => {
                    spinner.text = "Calculating splines";
                }, 250);
                spinner.text = "Committing to repository";
                await git.commit();
                spinner.success("Setup Github!");
            } else if (operation === "Commit to repo") {
                const spinner = yoctoSpinner({
                    text: "Committing to repository",
                });
                await git.commit();
                spinner.success("Committed successfully!");
            }
        } else {
            UI.print("Git not detected. Please install Git and try again.");
        }
    } else {
        UI.print("Git setup skipped.");
    }
}
