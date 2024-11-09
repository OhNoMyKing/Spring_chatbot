import { Injectable } from "@nestjs/common";
import { CartItem } from "src/database/entities/cart-item.entity";
import { CartItemServiceImpl } from "src/modules/cart-item/service/impl/cart-item.service.impl";
import { CartService } from "src/modules/cart/cart.service";
import { CartItemResponse } from "src/payload/response/cartitem.response";
@Injectable()
export class ConvertToCartItemResponse{
    constructor(
    ){}
    CartItemToCartItemResponse(cartItem : CartItem){
        const cartItemResponse = new CartItemResponse();
        cartItemResponse.id = cartItem.id;
        cartItemResponse.image = cartItem.product.mainImage;
        cartItemResponse.price = cartItem.product.price;
        cartItemResponse.quantity = cartItem.quantity;
        cartItemResponse.size = cartItem.size;
        cartItemResponse.sportswear_name = cartItem.product.name;
        cartItemResponse.totalAmount = (cartItem.quantity * cartItem.product.price);
        return cartItemResponse;
    }
}