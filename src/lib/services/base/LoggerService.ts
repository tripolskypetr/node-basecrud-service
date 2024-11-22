import { createLogger } from 'pinolog';

export class LoggerService {

    private _logger = createLogger("basecrud.log");

    public log = (...args: any[]) => {
        this._logger.log(...args);
    }

}

export default LoggerService
