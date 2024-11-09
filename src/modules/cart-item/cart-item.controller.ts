import { Body, Controller, Post } from "@nestjs/common";
import { CartItemRequest } from "src/payload/request/cartitem.request";
import { CartItemServiceImpl } from "./service/impl/cart-item.service.impl";
import { MessageResponse } from "src/payload/response/message.response";

@Controller()
export class CartItemController{
    constructor(
        private readonly cartItemService : CartItemServiceImpl,
    ){}
    @Post('/api/customer/add-to-cart')
    async addToCartItem(@Body() cartItemRequest : CartItemRequest){
        const cartItem = await  this.cartItemService.addToCartItem(cartItemRequest);
        if(cartItem){
            return new MessageResponse();
        }
    }
}