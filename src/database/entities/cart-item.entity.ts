import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Product } from "./product.entity";

@Entity({name : 'cart_item'})
export class CartItem{
    @PrimaryGeneratedColumn({name: 'id'})
    id : number;
    @Column({name : 'quantity'})
    quantity : number;
    @Column({name : 'size'})
    size: string;
    @Column({name : 'gender'})
    gender: string;
    @ManyToOne(()=>Cart, (cart) => cart.cartItem)
    @JoinColumn({name : 'cart_id'})
    cart : Cart;
    @ManyToOne(()=> Product, (product) => product.cartItem)
    @JoinColumn({
        name : 'product_id'
    })
    product : Product;
}