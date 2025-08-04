/* Supabase */
import { supabase } from '@config/supabase';

/* Contracts */
import { UsersDatasourceContract } from '@domain/contracts/datasources';

export class UsersDatasource implements UsersDatasourceContract {

    /**
     * Gets the IDs of all users in the app.
     * 
     * @return {Promise<string[]>} The IDs of all users in the app.
     */
    public async getAllUsersIds(): Promise<string[]> {
        const { data, error } = await supabase.auth.admin.listUsers();
        if (error) throw new Error(error.message);

        return data.users.map(user => user.id);
    }
}