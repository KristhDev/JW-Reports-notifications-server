export abstract class RevisitsFacadeContract {
    public abstract notifyUsersOfPendingRevisits(): Promise<void>;
}