import { supabase } from '../../config/supabase';

import { TimeAdapterContract } from '../../domain/contracts/adapters';
import { RevisitsDatasourceContract } from '../../domain/contracts/datasources';

export class RevisitsDatasource implements RevisitsDatasourceContract {
    constructor(
        private readonly timeAdapter: TimeAdapterContract
    ) {}

    public async getUsersIdsOfPendingRevisits(): Promise<string[]> {
        const now = this.timeAdapter.nowWithFormat('YYYY-MM-DD');

        const { data, error } = await supabase.from('revisits')
            .select('user_id')
            .eq('done', false)
            .gte('next_visit', `${ now } 00:00`)
            .lte('next_visit', `${ now } 23:59`);

        if (error) throw new Error(error.message);

        const userIds = new Set(data.map(({ user_id }) => user_id) as string[]);

        return [ ...userIds ];
    }
}