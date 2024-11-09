import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/database/entities/cart.entity";
import { CartItemRequest } from "src/payload/request/cartitem.request";
import { CartResponse } from "src/payload/response/cart.response";
import { Repository } from "typeorm";
import { CartItemServiceImpl } from "../cart-item/service/impl/cart-item.service.impl";
import { ConvertToCartItemResponse } from "src/converter/EntityToRes/CartItemToCartItemResponse";

@Injectable()
export class CartService{
    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository : Repository<Cart>,
        @Inject(forwardRef(() => CartItemServiceImpl))
        private readonly cartItemService : CartItemServiceImpl,
        private readonly convertToCartItemResponse : ConvertToCartItemResponse
    ){};
    async findCartById(id : number) : Promise<Cart>{
        const cart =  await this.cartRepository.findOne({where:{
            id : id,
        }});
        return cart;
    }
    async getCartByUser(noPage : number) : Promise<CartResponse>{
        const userId = 1;
        const cartEntity = await this.cartRepository.findOne({
            where:{
                user: {id : userId},
            },
            relations: ['user']
        });
        const listCartItems = await this.cartItemService.getListCartItemByCart(cartEntity);
        //tinh totalPage
        const totalPage = Math.ceil(listCartItems.length / 4);
        const currentPage = noPage;
        let totalAmount = 0;
        let totalQuantity = 0;
        const start = (noPage -1) * 4;
        let end = start +4;
        if (end > listCartItems.length){
            end = listCartItems.length;
        }
        const listCartItem = listCartItems.slice(start,end);
        const listCartItemResponse = listCartItem.map( (cartItem) =>{
            const cartItemResponse =  this.convertToCartItemResponse.CartItemToCartItemResponse(cartItem);
            totalAmount += cartItemResponse.totalAmount;
            totalQuantity += cartItemResponse.quantity;
            return cartItemResponse;
        });
        const cartResponse = new CartResponse();
        cartResponse.cartItemResponseList = listCartItemResponse;
        cartResponse.totalAmount = totalAmount;
        cartResponse.totalQuantity = totalQuantity;
        cartResponse.currentPage = currentPage;
        cartResponse.totalPage = totalPage;
        return cartResponse;
    }
    //
    async increaseProduct(id : number){
        await this.cartItemService.increaseQuantityById(id);
    }
    //
    async decreaseQuantityById(id : number){
        await this.cartItemService.decreaseQuantityById(id);
    }
    //
    async deleteCartItemById(id : number){
        await this.cartItemService.deleteCartItemById(id);
    }
}