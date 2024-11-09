import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name : 'category'})
export class Category{
    @PrimaryGeneratedColumn({name : 'id'})
    id : number;
    @Column({name : 'name'})
    name : string;
    @Column({name : 'style'})
    style: string;
    @OneToMany(() => Product, (product) => product.category)
    product: Product[];
}