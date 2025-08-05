import { UserAgentParsed } from '@infrastructure/interfaces';

export abstract class UserAgentAdapterContract {    
    public abstract parse(userAgent: string): UserAgentParsed;
}
