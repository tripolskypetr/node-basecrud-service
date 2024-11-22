import TYPES from "./config/types";
import "./config/provide";
import { inject, init } from "./core/di";
import LoggerService from "./services/base/LoggerService";
import ErrorService from "./services/base/ErrorService";
import AppwriteService from "./services/base/AppwriteService";
import Todo1DbService from "./services/db/Todo1DbService";
import Todo2DbService from "./services/db/Todo2DbService";
import Todo3DbService from "./services/db/Todo3DbService";

const baseServices = {
    loggerService: inject<LoggerService>(TYPES.loggerService),
    errorService: inject<ErrorService>(TYPES.errorService),
    appwriteService: inject<AppwriteService>(TYPES.appwriteService),
};

const dbServices = {
    todo1DbService: inject<Todo1DbService>(TYPES.todo1DbService),
    todo2DbService: inject<Todo2DbService>(TYPES.todo2DbService),
    todo3DbService: inject<Todo3DbService>(TYPES.todo3DbService),
};

init();

export const ioc = {
    ...baseServices,
    ...dbServices,
};

globalThis.ioc = ioc;
