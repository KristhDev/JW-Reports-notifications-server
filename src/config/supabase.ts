import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

/* Creating a client that will be used to connect to the database. */
export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_APY_KEY!
);