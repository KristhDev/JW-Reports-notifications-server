import dotenv from 'dotenv';
import { addColors, createLogger, format, transports, Logform } from 'winston';
import timestampColorize from 'winston-timestamp-colorize';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';

dotenv.config();

/**
 * An object that contains color codes for different log levels.
 */
const colorLevels = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    success: 'green',
    http: 'magenta',
    verbose: 'cyan',
    debug: 'white',
    silly: 'grey'
}

/**
 * An object that defines custom log levels with their respective levels and colors.
 */
const customLevels = {
    colors: colorLevels,
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

addColors(customLevels.colors);

class Logger {
    public static logtial = new Logtail(process.env.LOGTAIL_TOKEN!);

    /**
     * A Winston format that converts log levels to uppercase.
     *
     * @param {object} info - The log entry.
     * @return {Logform.Format} The log entry with the level converted to uppercase.
     */
    private static levelFormat(): Logform.Format {
        return format(info => {
            info.level = info.level.toUpperCase();
            return info;
        })();
    }

    /**
     * A Winston format that formats the log message.
     *
     * @param {object} info - The log entry.
     * @return {Logform.Format} The formatted log message.
     */
    private static messageFormat(): Logform.Format { 
        return format.printf(
            (info) => `[${ info.level }] ${ info.timestamp } ${ info.message }`
        );
    }

    /**
     * Creates a format for winston logger that includes level, timestamp, colorization, and message.
     *
     * @return {Logform.Format} The winston format object.
     */
    private static consoleLoggerFormat (): Logform.Format {
        return format.combine(
            Logger.levelFormat(),
            format.timestamp({ format: 'HH:mm:ss' }),
            timestampColorize({ color: 'gray' }),
            format.colorize(), 
            Logger.messageFormat()
        );
    }

    /**
     * Returns a Winston format that combines the level, timestamp, and message
     * formats for file logging.
     *
     * @return {Logform.Format} The combined Winston format.
     */
    private static fileLoggerFormat (): Logform.Format {
        return format.combine(
            Logger.levelFormat(),
            format.timestamp({ format: 'HH:mm:ss' }),
            Logger.messageFormat()
        );
    }

    /**
     * A winston logger object that logs messages to the console and a log file.
     */
    private static log = createLogger({
        levels: customLevels.levels,
        transports: [
            new transports.Console({
                format: Logger.consoleLoggerFormat()
            }),
            new LogtailTransport(Logger.logtial, {
                format: Logger.fileLoggerFormat()
            })
        ],
    });

    /**
     * Logs an informational message.
     *
     * @param {string} message - The message to be logged.
     * @return {Promise<void>} This function does not return a value.
     */
    public static async info(message: string): Promise<void> {
        Logger.log.info(message);
        await Logger.logtial.flush();
    }

    /**
     * Logs a success message.
     *
     * @param {string} message - The success message to log.
     * @return {Promise<void>} This function does not return a value.
     */
    public static async success(message: string): Promise<void> {
        try {
            Logger.log.log('success', message);
            await Logger.logtial.flush();
        } 
        catch (error) {
            throw error;
        }
    }

    /**
     * Logs an error message.
     *
     * @param {string} message - The error message to be logged.
     * @return {Promise<void>} This function does not return a value.
     */
    public static async error(message: string): Promise<void> {
        Logger.log.error(message);
        await Logger.logtial.flush();
    }
}

export default Logger;