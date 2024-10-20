// TODO: Commit to github and/or make github repository

export default class Github {
    private static readonly _commitMessage: string =
        "feat(⭐): Init Repository!";
    private static readonly _commitDesc: string =
        "Powered by create-kapp (Deno Version)";

    public static async commit(): Promise<void> {
        // TODO: Implement Github commit logic
    }

    public static async createRepo(_repoName: string): Promise<void> {
        // TODO: Implement Github repository creation logic
    }
}
