export abstract class RevisitsDataSourceContract {
    public abstract getUsersIdsOfPendingRevisits(): Promise<string[]>;
}
