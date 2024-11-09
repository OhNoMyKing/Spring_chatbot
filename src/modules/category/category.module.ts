import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category.entity";
import { CategoryServiceImpl } from "./service/impl/impl.category.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Category])
    ],
    providers: [CategoryServiceImpl],
    exports: [CategoryServiceImpl]
})
export class CategoryModule{

}