import { CartItem } from "src/database/entities/cart-item.entity";
import { Cart } from "src/database/entities/cart.entity";
import { CartItemRequest } from "src/payload/request/cartitem.request";

export interface CartItemServiceInterface{
     addToCartItem(cartItemRequest : CartItemRequest),
     getListCartItemByCart(cartEntity : Cart),
     increaseQuantityById(id : number),
     deleteCartItemById(id:number)
}