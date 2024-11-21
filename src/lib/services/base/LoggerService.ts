import { createLogger } from 'pinolog';

export class LoggerService {

    private _logger = createLogger("olx-publisher.log");

    public log = (...args: any[]) => {
        this._logger.log(...args);
    }

}

export default LoggerService
