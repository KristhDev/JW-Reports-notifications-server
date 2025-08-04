export class AppNewVersionDto {
    private constructor (
        public readonly launchUrl: string,
        public readonly version: string
    ) {}

    public static fromRequest(data: { [key: string]: string }): AppNewVersionDto {
        return new AppNewVersionDto(data.launchUrl, data.version);
    }
}
