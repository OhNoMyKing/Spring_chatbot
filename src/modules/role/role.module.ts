import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "src/database/entities/role.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([Role])
    ]
})
export class RoleModule{
}