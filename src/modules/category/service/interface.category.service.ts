import { Category } from "src/database/entities/category.entity";

export interface CategoryServiceInterface{
    getCategoryByName(name : string) : Promise<Category>;
    getCategoryById(id : number) : Promise<{name : string}>;
    getCategoryById2(id : number) : Promise<Category>;
}