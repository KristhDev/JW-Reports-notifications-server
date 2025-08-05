import { createClient } from '@supabase/supabase-js';
import { env } from './env';

/* Creating a client that will be used to connect to the database. */
export const supabase = createClient(
    env.SUPABASE_URL,
    env.SUPABASE_APY_KEY
);