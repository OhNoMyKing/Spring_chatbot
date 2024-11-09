import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart-item.entity";
import { CartService } from "src/modules/cart/cart.service";
import { ProductServiceImpl } from "src/modules/product/service/impl/implement.product.service";
import { CartItemRequest } from "src/payload/request/cartitem.request";

@Injectable()
export class CartItemRequestToCartItem{
    constructor(
        private readonly productService : ProductServiceImpl
    ){};
    async ConvertToCartItem(cartItemRequest : CartItemRequest) : Promise<CartItem>{
        const cartItem = new CartItem();
        //tu product id cua request lay ra product 
        const product =  await this.productService.getProductById(cartItemRequest.sportswear_id);
        cartItem.product =  product;
        //convert cac thuoc tinh khac 
        cartItem.quantity = cartItemRequest.quantity;
        cartItem.gender = "hi";
        cartItem.size = cartItemRequest.size;
        return cartItem;
    }
}