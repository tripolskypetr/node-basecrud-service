import { errorData } from 'functools-kit';
import fs from "fs";

export class ErrorService {

    public handleGlobalError = (error: Error) => {
        fs.appendFileSync('./error.txt', JSON.stringify(errorData(error), null, 2));
        process.exit(-1);
    };

    protected init = () => {
        process.on('uncaughtException', (err) => {
            console.log(err);
            this.handleGlobalError(err);
        });
        process.on('unhandledRejection', (error) => {
            throw error;
        });
    }

}

export default ErrorService;
