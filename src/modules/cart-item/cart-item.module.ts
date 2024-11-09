import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemRequestToCartItem } from "src/converter/cart/CartItemRequestToCartItem";
import { CartItem } from "src/database/entities/cart-item.entity";
import { CartModule } from "../cart/cart.module";
import { CartItemRequestToEntity } from "src/converter/cart/CartItemRequestToEntity.module";
import { CartItemController } from "./cart-item.controller";
import { CartItemServiceImpl } from "./service/impl/cart-item.service.impl";

@Module({
    imports:[
        TypeOrmModule.forFeature([CartItem]),
        CartItemRequestToEntity,
        forwardRef(()=>CartModule)
    ],
    controllers: [CartItemController],
    providers: [CartItemServiceImpl],
    exports : [CartItemServiceImpl]
})
export class CartItemModule{

}