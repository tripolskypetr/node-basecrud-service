import { provide } from '../core/di';

import TYPES from './types';

import LoggerService from '../services/base/LoggerService';
import ErrorService from '../services/base/ErrorService';
import AppwriteService from '../services/base/AppwriteService';
import Todo1DbService from '../services/db/Todo1DbService';
import Todo2DbService from '../services/db/Todo2DbService';
import Todo3DbService from '../services/db/Todo3DbService';

{
    provide(TYPES.loggerService, () => new LoggerService());
    provide(TYPES.errorService, () => new ErrorService());
    provide(TYPES.appwriteService, () => new AppwriteService());
}

{
    provide(TYPES.todo1DbService, () => new Todo1DbService());
    provide(TYPES.todo2DbService, () => new Todo2DbService());
    provide(TYPES.todo3DbService, () => new Todo3DbService());
}
