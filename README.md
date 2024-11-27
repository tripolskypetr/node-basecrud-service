# node-basecrud-service

> The generic repository pattern implementation for NodeJS, aka `BaseCRUD`

## Code sample

**BaseCrud.ts**

```typescript

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
```

**TodoDbService.ts**

```typescript
export class TodoDbService extends BaseCrud("todoDbService", CC_APPWRITE_TODO_COLLECTION_ID) {

    public findAll = async () => {
        return <ITodoRow[]> await super.findAll();
    };

    public findById = async (id: string) => {
        return <ITodoRow> await super.findById(id);
    };

    public create = async (dto: ITodoDto) => {
        return <ITodoRow> await super.create(dto);
    };

    public update = async (id: string, dto: ITodoDto) => {
        return <ITodoRow> await super.update(id, dto);
    };

    public remove = async (id: string) => {
        return <ITodoRow> await super.remove(id);
    };
};

export default TodoDbService;

```
