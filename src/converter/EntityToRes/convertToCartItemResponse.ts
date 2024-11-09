import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemResponse } from "src/payload/response/cartitem.response";
import { ConvertToCartItemResponse } from "./CartItemToCartItemResponse";

@Module({
    imports: [
        TypeOrmModule.forFeature([CartItemResponse]),

    ],
    providers: [ConvertToCartItemResponse],
    exports: [ConvertToCartItemResponse]
})
export class ConvertCartItemResponseModule{

}