/* Supabase */
import { supabase } from '@config/supabase';

/* Contracts */
import { UsersDataSourceContract } from '@domain/contracts/datasources';

/* Errors */
import { DataSourceError } from '@domain/errors';

export class UsersDataSource implements UsersDataSourceContract {

    /**
     * Gets the IDs of all users in the app.
     * 
     * @return {Promise<string[]>} The IDs of all users in the app.
     */
    public async getAllUsersIds(): Promise<string[]> {
        const { data, error } = await supabase.auth.admin.listUsers();

        if (error) {
            const errorData = { name: error.name, code: error.code, message: error.message };
            throw new DataSourceError(errorData.message, errorData);
        }

        return data.users.map(user => user.id);
    }
}