import { UAParser } from 'ua-parser-js';

/* Contracts */
import { UserAgentAdapterContract } from '@domain/contracts/adapters';

/* Interfaces */
import { UserAgentParsed } from '@infrastructure/interfaces';

export class UserAgentAdapter implements UserAgentAdapterContract {

    /**
     * Parses the user agent string.
     *
     * @param {string} userAgent The user agent string to parse.
     * @returns {UserAgentParsed} The parsed user agent.
     */
    public parse(userAgent: string): UserAgentParsed {
        const uaParsed = UAParser(userAgent);

        const browser = uaParsed.browser.toString();
        const os = uaParsed.os.toString();
        const device = uaParsed.device.toString();

        const data: UserAgentParsed = {
            browser: browser !== 'undefined' ? browser : undefined,
            device: device !== 'undefined' ? device : undefined,
            os: os !== 'undefined' ? os : undefined,
            userAgent: uaParsed.ua
        }

        return data;
    }
}