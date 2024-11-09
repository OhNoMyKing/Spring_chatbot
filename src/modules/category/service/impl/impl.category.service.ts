import { Category } from "src/database/entities/category.entity";
import { CategoryServiceInterface } from "../interface.category.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
@Injectable()
export class CategoryServiceImpl implements CategoryServiceInterface{
    constructor(
        @InjectRepository(Category)
        private categoryRepository : Repository<Category>,
        private entityManager : EntityManager
    ){}
    async getCategoryByName(name: string): Promise<Category> {
        const sql = `
            SELECT * FROM category c WHERE c.name = $1
        `
        const value = [name];
        const resultSQL = await this.entityManager.query(sql,value);
        return resultSQL[0];
    }
    async  getCategoryById(id: number): Promise<{name : string}>{
        const sql = `
            SELECT c.name FROM category c WHERE c.id = $1
        `
        const result = await this.entityManager.query(sql,[id]);
        return result[0];
    }
    async getCategoryById2(id : number) : Promise<Category>{
        const result = await this.categoryRepository.findOne({
            where: {id : id}
        });
        return result;
    }
}