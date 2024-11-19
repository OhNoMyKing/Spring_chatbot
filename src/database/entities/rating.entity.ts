import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity('rating')
export class Rating{
    @PrimaryGeneratedColumn({name : 'id'})
    id: number;
    @ManyToOne(() => User, (user) => user.rating)
    @JoinColumn({name : 'user_id'})
    user : User;
    @ManyToOne(()=>Product,(product) => product.rating)
    @JoinColumn({name : 'product_id'})
    product : Product;
    @Column({name : 'rating'})
    rating : number;
}