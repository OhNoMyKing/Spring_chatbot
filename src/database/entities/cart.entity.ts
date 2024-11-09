import { Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { CartItem } from "./cart-item.entity";

@Entity({name: 'cart'})
export class Cart{
    @PrimaryGeneratedColumn({name : 'id'})
    id : number;
    @ManyToOne(() => User, (user) => user.cart)
    @JoinColumn({
        name : 'user_id'
    })
    user : User;
    //relationships 
    //products
    @OneToMany(()=> CartItem, (cartItem) => cartItem.cart)
    cartItem : CartItem[];

    //
    
}