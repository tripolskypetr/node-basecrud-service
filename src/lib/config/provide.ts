import { provide } from '../core/di';

import TYPES from './types';

import LoggerService from '../services/base/LoggerService';
import ErrorService from '../services/base/ErrorService';
import OlxClientSesssionService from '../services/client/OlxClientSesssionService';
import AppwriteService from '../services/base/AppwriteService';
import OlxPublishService from '../services/function/OlxPublishService';

{
    provide(TYPES.loggerService, () => new LoggerService());
    provide(TYPES.errorService, () => new ErrorService());
    provide(TYPES.appwriteService, () => new AppwriteService());
}

{
    provide(TYPES.olxClientSesssionService, () => new OlxClientSesssionService());
}

{
    provide(TYPES.olxPublishService, () => new OlxPublishService());
}
