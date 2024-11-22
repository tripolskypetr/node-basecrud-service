const baseServices = {
    loggerService: Symbol('loggerService'),
    errorService: Symbol('errorService'),
    appwriteService: Symbol('appwriteService'),
};

const dbServices = {
    todo1DbService: Symbol('todo1DbService'),
    todo2DbService: Symbol('todo2DbService'),
    todo3DbService: Symbol('todo3DbService'),
}

export const TYPES = {
    ...baseServices,
    ...dbServices,
};

export default TYPES;
