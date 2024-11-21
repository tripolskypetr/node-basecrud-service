import TYPES from "./config/types";
import "./config/provide";
import { inject, init } from "./core/di";
import LoggerService from "./services/base/LoggerService";
import ErrorService from "./services/base/ErrorService";
import OlxClientSesssionService, { TOlxClientSesssionService } from './services/client/OlxClientSesssionService';
import AppwriteService from "./services/base/AppwriteService";
import OlxPublishService from "./services/function/OlxPublishService";

const baseServices = {
    loggerService: inject<LoggerService>(TYPES.loggerService),
    errorService: inject<ErrorService>(TYPES.errorService),
    appwriteService: inject<AppwriteService>(TYPES.appwriteService),
};

const clientServices = {
    olxClientSesssionService: inject<TOlxClientSesssionService>(TYPES.olxClientSesssionService),
};

const functionServices = {
    olxPublishService: inject<OlxPublishService>(TYPES.olxPublishService),
};

init();

export const ioc = {
    ...baseServices,
    ...clientServices,
    ...functionServices,
};

globalThis.ioc = ioc;

export { OlxClientSesssionService };
