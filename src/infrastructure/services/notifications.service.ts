/* Env */
import { env } from '@config/env';

/* Contracts */
import { HttpClientAdapterContract } from '@domain/contracts/adapters';
import { NotificationsServiceContract } from '@domain/contracts/services';

/* Interfaces */
import { HttpBody, HttpHeaders, NewAppVersionNotificationOptions } from '../interfaces';

export class NotificationsService implements NotificationsServiceContract {
    constructor (
        private readonly httpClientAdapter: HttpClientAdapterContract
    ) {}

    /**
     * Send a notification to the given users using OneSignal API
     *
     * @param {HttpBody} headings the notification headings
     * @param {HttpBody} contents the notification contents
     * @param {string[]} usersIds the users to send the notification to
     * @param {string} [launchUrl] the link to open when the notification is tapped
     * @returns {Promise<void>} The promise that resolves when the notification is sent
     */
    private async sendNotification(headings: HttpBody, contents: HttpBody, usersIds: string[], launchUrl?: string): Promise<void> {
        try {
            const url = `${ env.ONESIGNAL_API_URL }/notifications`;

            const headers: HttpHeaders = {
                'Authorization': env.ONESIGNAL_REST_API_KEY,
                'Content-Type': 'application/json',
            }

            const body: HttpBody = {
                app_id: env.ONESIGNAL_APP_ID,
                target_channel: 'push',
                headings,
                contents,
                include_aliases: { external_id: usersIds },
                url: launchUrl
            }

            await this.httpClientAdapter.post(url, { headers, body });
        } 
        catch (error) {
            throw error;
        }
    }

    /**
     * Send a daily notification to the given users that have courses to give today.
     *
     * @param {string[]} usersIds the users to send the notification to
     * @return {Promise<void>} The promise that resolves when the notification is sent
     */
    public async sendCoursesDailyNotification(usersIds: string[]): Promise<void> {
        try {
            const headings = {
                en: 'Bible courses',
                es: 'Cursos bíblicos'
            }

            const contents = {
                en: 'You have courses to give today, enter and see who they are.',
                es: 'Tienes cursos que dar hoy, entra y ve quienes son.'
            }

            await this.sendNotification(headings, contents, usersIds);
        } 
        catch (error) {
            throw error;
        }
    }

    /**
     * Send a notification to the given users that a new version of the app is available.
     *
     * @param {NewAppVersionNotificationOptions} options - The options for the notification.
     * @return {Promise<void>} The promise that resolves when the notification is sent.
     */
    public async sendNewAppVersionNotification({ launchUrl, usersIds, version }: NewAppVersionNotificationOptions): Promise<void> {
        try {
            const headings = {
                en: 'JW Reports update',
                es: 'Actualización de JW Reports'
            }

            const contents = {
                en: `The new version of JW Reports ${ version } is now available. To get it click on this notification and download it.`,
                es: `Ya esta disponible la nueva versión de JW Reports ${ version }. Para obtenerla precione está notificación y descarguela.`
            }

            await this.sendNotification(headings, contents, usersIds, launchUrl);   
        } 
        catch (error) {
            throw error;
        }
    }

    /**
     * Send a daily notification to the given users that have revisits scheduled for today.
     *
     * @param {string[]} usersIds the users to send the notification to
     * @return {Promise<void>} The promise that resolves when the notification is sent
     */
    public async sendRevisitsDailyNotification(usersIds: string[]): Promise<void> {
        try {
            const headings = {
                en: 'Revisits',
                es: 'Revisitas'
            }

            const contents = {
                en: 'You have revisits to give today, enter and see who they are.',
                es: 'Tienes revisitas para hoy, entra y ve cuáles son.'
            }

            await this.sendNotification(headings, contents, usersIds);
        } 
        catch (error) {
            throw error;
        }
    }

    /**
     * Send a notification to the given users that are at the end of the month and need to turn in their report.
     *
     * @param {string[]} usersIds the users to send the notification to
     * @return {Promise<void>} The promise that resolves when the notification is sent
     */
    public async sendPreachingReportNotification(usersIds: string[]): Promise<void> {
        try {
            const headings = {
                en: 'Delivery of report',
                es: 'Entrega de informe'
            }

            const contents = {
                en: "It's the end of the month! Please don't forget to turn in your report!",
                es: '¡Ya es fin de mes! Por favor que no se te olvide entregar tu informe'
            }

            await this.sendNotification(headings, contents, usersIds);
        } 
        catch (error) {
            throw error;
        }
    }
}