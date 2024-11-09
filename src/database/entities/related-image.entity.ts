import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({name :'image'})
export class RelatedImage{
    @PrimaryGeneratedColumn({name : 'id'})
    id : number;
    @Column({name : 'related_image', type :'text'})
    relatedImage : string;
    @ManyToOne(() =>Product, (product) => product.relatedImage)
    @JoinColumn({
        name : 'product_id'
    })
    product : Product;
}