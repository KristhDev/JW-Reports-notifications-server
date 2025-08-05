import { addColors, createLogger, format, Logform, Logger, LoggerOptions as WinstonLoggerOptions, transports as WinstonTransports } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import timestampColorize from 'winston-timestamp-colorize';

import { env } from '@config/env';

import { LoggerAdapterContract, TimeAdapterContract } from '@domain/contracts/adapters';

import { LoggerOptions } from '@infrastructure/interfaces';

export class LoggerAdapter implements LoggerAdapterContract {
    private readonly colorLevels = {
        error: 'red',
        warn: 'yellow',
        info: 'cyan',
        success: 'green',
        http: 'magenta',
        verbose: 'cyan',
        debug: 'white',
        silly: 'grey'
    }

    private readonly customLevels = {
        colors: this.colorLevels,
        levels: {
            error: 0,
            warn: 1,
            success: 2,
            info: 3,
            http: 4,
            verbose: 5,
            debug: 6,
            silly: 7
        }
    }

    private readonly logger: Logger;
    private readonly logtail: Logtail;

    private readonly options: LoggerOptions;
    private readonly defaultOptions: LoggerOptions = {
        logsDir: './logs',
        logsFileName: `jw-reports-notifications-server-${ this.loggerFormatDate(new Date()) }`,
        renderLogsInConsole: true,
        uploadLogsToService: false,
        writeLogsInFile: true,
    }

    constructor(
        private readonly timeAdapter: TimeAdapterContract,
        options?: LoggerOptions
    ) {
        this.options = { ...this.defaultOptions, ...options };
        addColors(this.customLevels.colors);

        this.logtail = new Logtail(env.LOGTAIL_TOKEN);
        this.logger = this.generateWinstonLogger();
    }

    /**
     * Formats the given date into a string with the format 'dd-mm-yyyy'.
     *
     * @param {Date} date - The date to be formatted.
     * @return {string} The formatted date string.
     */
    private loggerFormatDate (date: Date): string {
        return this.timeAdapter.format(date, 'DD-MM-YYYY');
    }

    /**
     * A Winston format that converts log levels to uppercase.
     *
     * @return {Logform.Format} The log entry with the level converted to uppercase.
     */
    private levelFormat(): Logform.Format {
        return format(info => {
            info.level = info.level.toUpperCase();
            return info;
        })();
    }

    /**
     * A Winston format that formats the log message.
     *
     * @return {Logform.Format} The formatted log message.
     */
    private messageFormat(): Logform.Format { 
        return format.printf(
            (info) => `[${ info.level }] ${ info.timestamp } ${ info.message }`
        );
    }

    /**
     * Creates a format for winston logger that includes level, timestamp, colorization, and message.
     *
     * @return {Logform.Format} The winston format object.
     */
    private consoleLoggerFormat (): Logform.Format {
        return format.combine(
            this.levelFormat(),
            format.timestamp({ format: 'HH:mm:ss' }),
            timestampColorize({ color: 'gray' }),
            format.colorize(), 
            this.messageFormat()
        );
    }

    /**
     * Returns a Winston format that combines the level, timestamp, and message
     * formats for file logging.
     *
     * @return {Logform.Format} The combined Winston format.
     */
    private fileLoggerFormat (): Logform.Format {
        return format.combine(
            this.levelFormat(),
            format.timestamp({ format: 'HH:mm:ss' }),
            this.messageFormat()
        );
    }

    /**
     * Creates a Winston logger instance with the specified options.
     *
     * @return {Logger} The Winston logger instance.
     */
    private generateWinstonLogger(): Logger {
        const transports: WinstonLoggerOptions['transports'] = [];

        if (this.options.renderLogsInConsole) {
            transports.push(new WinstonTransports.Console({
                format: this.consoleLoggerFormat()
            }));
        }

        if (this.options.uploadLogsToService) {
            transports.push(new LogtailTransport(this.logtail));
        }

        if (this.options.writeLogsInFile) {
            transports.push(new WinstonTransports.File({
                filename: `${ this.options.logsDir }/${ this.options.logsFileName }.log`,
                format: this.fileLoggerFormat()
            }));
        }

        return createLogger({
            levels: this.customLevels.levels,
            transports
        });
    }

    /**
     * Logs an informational message.
     *
     * @param {string} message - The message to be logged.
     * @return {void} This function does not return a value.
     */
    public info(message: string): void {
        this.logger.info(message);
        if (this.options.uploadLogsToService) this.logtail.flush();
    }

    /**
     * Logs a success message.
     *
     * @param {string} message - The success message to log.
     * @return {void} This function does not return a value.
     */
    public success(message: string): void {
        this.logger.log('success', message);
        if (this.options.uploadLogsToService) this.logtail.flush();
    }

    
    /**
     * Logs an error message.
     *
     * @param {string} message - The error message to be logged.
     * @return {void} 
     */
    public error(message: string): void {
        this.logger.error(message);
        if (this.options.uploadLogsToService) this.logtail.flush();
    }
}