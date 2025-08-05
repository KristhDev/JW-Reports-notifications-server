export abstract class UsersDatasourceContract {
    public abstract getAllUsersIds(): Promise<string[]>;
}
