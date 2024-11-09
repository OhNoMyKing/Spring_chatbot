import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RelatedImage } from "./related-image.entity";
import { Category } from "./category.entity";
import { Cart } from "./cart.entity";
import { CartItem } from "./cart-item.entity";


@Entity({name : 'product'})
export class Product{
    @PrimaryGeneratedColumn({name: 'id'})
    id :number;
    @Column({name : 'name', type: 'varchar', length: 255})
    name : string;
    @Column({name : 'price'})
    price : number;
    @Column({name : 'description'})
    description : string;
    @Column({name : 'main_image', type: 'text'})
    mainImage : string;
    @Column({name : 'status', type :'int'})
    status : number;
    @OneToMany(() => RelatedImage, (relatedImage) => relatedImage.product)
    relatedImage : RelatedImage[];
    @ManyToOne(() => Category, (category) => category.product )
    @JoinColumn({
        name: 'category_id'
    })
    category : Category;
    //relationships
    //cartItem
    @OneToMany(()=> CartItem, (cartItem) => cartItem.product)
    cartItem : CartItem[];
    //
    // @OneToMany(() => Ratings, (ratings) => ratings.product)
    // ratings : Ratings[];
}