import { RoleEnum } from "src/enum/role.enum";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Entity({name: 'role'})
export class Role{
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;
    @Column({type: 'enum', enum: RoleEnum, name: 'role_name'})
    name: RoleEnum;
    @Column({nullable: true, name: 'role_description'})
    description: string;
    @ManyToMany(() => User, (user)=> user.role)
    user : User[];
}