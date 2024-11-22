import { 
    CC_APPWRITE_TODO_COLLECTION_ID,
} from "../../config/params";

import { ITodoDto, ITodoRow } from '../../model/Todo.model';

import BaseCrud from "../../common/BaseCrud";

export class Todo1DbService extends BaseCrud("todo1DbService", CC_APPWRITE_TODO_COLLECTION_ID) {

    public findAll = async () => {
        this.loggerService.log("todo1DbService findAll wrapper");
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

export default Todo1DbService;
