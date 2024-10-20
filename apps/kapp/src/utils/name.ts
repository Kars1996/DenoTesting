// TODO: Function to edit name of project

export default class ProjectEdit {
    private static readonly _defaultName: string = "kars-project";

    private static parseName(name: string): string {
        return name.replace(" ", "-").toLowerCase();
    }
}
