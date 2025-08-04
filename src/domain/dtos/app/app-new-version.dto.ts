export class AppNewVersionDto {
    private constructor (
        public readonly launchUrl: string,
        public readonly version: string
    ) {}

    /**
     * Creates a new AppNewVersionDto from a request object.
     * The request object should have two properties: 'launchUrl' and 'version'.
     *
     * @param {Object} data - The request object.
     * @returns {AppNewVersionDto} A new AppNewVersionDto.
     */
    public static fromRequest(data: { [key: string]: string }): AppNewVersionDto {
        return new AppNewVersionDto(data.launchUrl, data.version);
    }
}
