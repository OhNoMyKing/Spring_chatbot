import { Body, Controller, Get, Param, Query } from "@nestjs/common";
import { Cart } from "src/database/entities/cart.entity";
import { CartItemRequest } from "src/payload/request/cartitem.request";
import { View } from "typeorm";
import { CartService } from "./cart.service";
import { CartResponse } from "src/payload/response/cart.response";

@Controller()
export class CartController{
    constructor(
        private readonly cartService : CartService
    ){}
    @Get('/api/customer/cart')
    async getCartByCustomer(@Query('noPage') noPage : number) : Promise<CartResponse>{
        if(!noPage){
            noPage = 1;
        }
        const result = await  this.cartService.getCartByUser(noPage);
        return result;
    }
    @Get('/api/customer/increase-quantity/:id')
    async increaseQuantityById(@Param('id')id : number){
        await this.cartService.increaseProduct(id);
    }
    //
    @Get('/api/customer/decrease-quantity/:id')
    async decreaseQuantityById(@Param('id')id : number){
        await this.cartService.decreaseQuantityById(id);
    }
    @Get('/api/customer/delete-cart-item/:id')
    async deleteCartItemById(@Param('id') id : number){
        await this.cartService.deleteCartItemById(id);
    }
}