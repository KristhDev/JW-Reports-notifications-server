export abstract class RevisitsDatasourceContract {
    public abstract getUsersIdsOfPendingRevisits(): Promise<string[]>;
}
