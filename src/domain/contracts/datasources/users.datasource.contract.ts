export abstract class UsersDataSourceContract {
    public abstract getAllUsersIds(): Promise<string[]>;
}
