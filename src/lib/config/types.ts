const baseServices = {
    loggerService: Symbol('loggerService'),
    errorService: Symbol('errorService'),
    appwriteService: Symbol('appwriteService'),
};

const clientServices = {
    olxClientSesssionService: Symbol('olxClientSesssionService'),
}

const functionServices = {
    olxPublishService: Symbol('olxPublishService'),
}

export const TYPES = {
    ...baseServices,
    ...clientServices,
    ...functionServices,
};

export default TYPES;
