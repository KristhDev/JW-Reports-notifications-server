import dotenv from 'dotenv';
import { get } from 'env-var';

dotenv.config({ quiet: true });

export const env = {
    APP_ACCESS_TOKEN: get('APP_ACCESS_TOKEN').required().asString(),
    APP_PORT: get('APP_PORT').required().asPortNumber(),

    LOGTAIL_SOURCE_TOKEN: get('LOGTAIL_SOURCE_TOKEN').required().asString(),
    LOGTAIL_SOURCE_URL: get('LOGTAIL_SOURCE_URL').required().asString(),

    ONESIGNAL_API_URL: get('ONESIGNAL_API_URL').required().asString(),
    ONESIGNAL_APP_ID: get('ONESIGNAL_APP_ID').required().asString(),
    ONESIGNAL_REST_API_KEY: get('ONESIGNAL_REST_API_KEY').required().asString(),

    SUPABASE_APY_KEY: get('SUPABASE_APY_KEY').required().asString(),
    SUPABASE_URL: get('SUPABASE_URL').required().asString(),
}