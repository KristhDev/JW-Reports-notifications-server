/* Supabase */
import { supabase } from '@config/supabase';

/* Contracts */
import { TimeAdapterContract } from '@domain/contracts/adapters';
import { RevisitsDatasourceContract } from '@domain/contracts/datasources';

/* Errors */
import { DatasourceError } from '@domain/errors';

export class RevisitsDatasource implements RevisitsDatasourceContract {
    constructor(
        private readonly timeAdapter: TimeAdapterContract
    ) {}

    /**
     * Gets the IDs of users that have revisits scheduled for today.
     * 
     * @return {Promise<string[]>} The IDs of users that have revisits scheduled for today.
     */
    public async getUsersIdsOfPendingRevisits(): Promise<string[]> {
        const now = this.timeAdapter.nowWithFormat('YYYY-MM-DD');

        const { data, error } = await supabase.from('revisits')
            .select('user_id')
            .eq('done', false)
            .gte('next_visit', `${ now } 00:00`)
            .lte('next_visit', `${ now } 23:59`);

        if (error) {
            const errorData = { code: error.code, details: error.details, hint: error.hint, message: error.message };
            throw new DatasourceError(error.message, errorData);
        }

        const userIds = new Set(data.map(({ user_id }) => user_id));

        return Array.from(userIds);
    }
}