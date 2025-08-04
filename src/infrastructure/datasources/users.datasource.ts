import { supabase } from '@config/supabase';

import { UsersDatasourceContract } from '@domain/contracts/datasources';

export class UsersDatasource implements UsersDatasourceContract {
    public async getAllUsersIds(): Promise<string[]> {
        const { data, error } = await supabase.auth.admin.listUsers();
        if (error) throw new Error(error.message);

        return data.users.map(user => user.id);
    }
}