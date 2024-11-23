import { resolveDocuments } from 'functools-kit';
import { factory } from 'di-factory';

import { CC_APPWRITE_DATABASE_ID } from '../config/params';

import AppwriteService from '../services/base/AppwriteService';
import LoggerService from '../services/base/LoggerService';

import { inject } from '../core/di';

import listDocuments from '../utils/listDocuments';

import TYPES from '../config/types';

export const BaseCrud = factory(
  class {
    protected readonly appwriteService = inject<AppwriteService>(TYPES.appwriteService);
    protected readonly loggerService = inject<LoggerService>(TYPES.loggerService);

    constructor(public name: string, public collectionId: string) {}

    protected async findAll() {
        this.loggerService.log(`${this.name} findAll`);
        return await resolveDocuments(listDocuments(this.collectionId));
    };

    protected async findById(id: string) {
        this.loggerService.log(`${this.name} findById`, { id });
        return await this.appwriteService.databases.getDocument(
            CC_APPWRITE_DATABASE_ID,
            this.collectionId,
            id,
        );
    };

    protected async create(dto: unknown) {
        this.loggerService.log(`${this.name} create`, { dto });
        return await this.appwriteService.databases.createDocument(
            CC_APPWRITE_DATABASE_ID,
            this.collectionId,
            this.appwriteService.createId(),
            dto,
        );
    };

    protected async update(id: string, dto: unknown) {
        this.loggerService.log(`${this.name} update`, { id, dto });
        return await this.appwriteService.databases.updateDocument(
            CC_APPWRITE_DATABASE_ID,
            this.collectionId,
            id,
            dto,
        );
    };

    protected async remove(id: string) {
        this.loggerService.log(`${this.name} remove`, { id });
        return await this.appwriteService.databases.deleteDocument(
            CC_APPWRITE_DATABASE_ID,
            this.collectionId,
            id,
        );
    };
  }
);

export type TBaseCrud = InstanceType<ReturnType<typeof BaseCrud>>;

export default BaseCrud;
