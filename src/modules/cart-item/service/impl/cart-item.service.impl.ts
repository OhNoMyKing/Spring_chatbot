import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CartItemServiceInterface } from "../cart-item.service.interface";
import { CartItem } from "src/database/entities/cart-item.entity";
import { CartItemRequestToCartItem } from "src/converter/cart/CartItemRequestToCartItem";
import { CartItemRequest } from "src/payload/request/cartitem.request";
import { CartService } from "src/modules/cart/cart.service";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/database/entities/cart.entity";
@Injectable()
export class CartItemServiceImpl implements CartItemServiceInterface{
    constructor(
        private readonly convertToCartItem : CartItemRequestToCartItem,
        @Inject(forwardRef(() => CartService))
        private readonly cartService : CartService,
        @InjectRepository(CartItem)
        private readonly cartItemRepository : Repository<CartItem>
    ){}
    async addToCartItem(cartItemRequest : CartItemRequest){
        const cartItemEntity = await this.convertToCartItem.ConvertToCartItem(cartItemRequest);
        //tim cart (tu token -> user -> cart) cua header gui len
        const cartId = 1;//gia su cartId la 1;
        const cartEntity = await this.cartService.findCartById(cartId);
        cartItemEntity.cart = cartEntity;
        return this.cartItemRepository.save(cartItemEntity);
    }
    async getListCartItemByCart(cartEntity: Cart) {
        const listCartItem = await this.cartItemRepository.find({
            where : {
                cart : {id : cartEntity.id}
            },
            relations : ['cart','product']
        })
        return listCartItem;
    }
    //
    async increaseQuantityById(id: number) {
        const cartItemEntity = await this.cartItemRepository.findOne({
            where :{
                id : id
            }
        });
        cartItemEntity.quantity += 1;
        this.cartItemRepository.save(cartItemEntity);
    }
    async decreaseQuantityById(id : number){
        const cartItemEntity = await this.cartItemRepository.findOne({
            where : {
                id : id
            }
        });
        cartItemEntity.quantity -= 1;
        if(cartItemEntity.quantity ===0){
            this.deleteCartItemById(id);
        }
        this.cartItemRepository.save(cartItemEntity);
    }
    async deleteCartItemById(id: number) {
        const item = await this.cartItemRepository.findOne({
            where : {id : id}
        });
        if(!item){
            throw new NotFoundException('Cart item not found');
        }
        await this.cartItemRepository.delete(id);
    }
}