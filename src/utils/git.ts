// TODO: Commit to github and/or make github repository

export default class Github {
    private static readonly _commitMessage: string =
        "feat(⭐): Init Repository!";
    private static readonly _commitDesc: string =
        "Powered by create-kapp (Deno Version)";

    private async checkGit(): Promise<boolean> {
        try {
            const gitCommand = new Deno.Command("git", {
                args: ["--version"],
            });
            const output = await gitCommand.output();
            return output.code === 0;
        } catch (error) {
            console.error("Error checking Git installation:", error);
            return false;
        }
    }

    public async commit(): Promise<void> {
        // TODO: Implement Github commit logic
    }

    public async createRepo(_repoName: string): Promise<void> {
        // TODO: Implement Github repository creation logic
    }
}
