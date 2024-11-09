import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItem } from "src/database/entities/cart-item.entity";
import { ProductModule } from "src/modules/product/product.module";
import { CartItemRequestToCartItem } from "./CartItemRequestToCartItem";

@Module({
    imports:[
        TypeOrmModule.forFeature([CartItem]),
        ProductModule,
    ],
    providers: [CartItemRequestToCartItem],
    exports: [CartItemRequestToCartItem]
})
export class CartItemRequestToEntity{

}