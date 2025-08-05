import dotenv from 'dotenv';
dotenv.config();

export const env = {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN!,
    LOGTAIL_TOKEN: process.env.LOGTAIL_TOKEN!,
    ONESIGNAL_API_URL: process.env.ONESIGNAL_API_URL!,
    ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID!,
    ONESIGNAL_REST_API_KEY: process.env.ONESIGNAL_REST_API_KEY!,
    PORT: process.env.PORT!,
    SUPABASE_APY_KEY: process.env.SUPABASE_APY_KEY!,
    SUPABASE_URL: process.env.SUPABASE_URL!,
}