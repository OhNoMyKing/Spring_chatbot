import { CartItemResponse } from "./cartitem.response";

export class CartResponse{
    cartItemResponseList : CartItemResponse[];
    totalQuantity : number;
    totalAmount : number;
    currentPage: number;
    totalPage: number
}