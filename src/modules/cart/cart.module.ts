import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/database/entities/cart.entity";
import { CartService } from "./cart.service";
import { CartController } from "./cart.controller";
import { CartItemModule } from "../cart-item/cart-item.module";
import { ConvertToCartItemResponse } from "src/converter/EntityToRes/CartItemToCartItemResponse";
import { ConvertCartItemResponseModule } from "src/converter/EntityToRes/convertToCartItemResponse";

@Module({
    imports: [
        TypeOrmModule.forFeature([Cart]),
        forwardRef(() => CartItemModule),
        ConvertCartItemResponseModule
    ],
    controllers: [CartController],
    providers: [CartService],
    exports: [CartService]
})
export class CartModule{

}