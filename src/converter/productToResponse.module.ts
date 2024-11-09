import { Module } from "@nestjs/common";
import { ProductToProductResponse } from "./ProductToProductResponse";
import { ModelMapperConfigModule } from "src/config/model-mapper.config";
import { CreateProductRequestToProduct } from "./CreateProductRequestToProduct";
import { CategoryModule } from "src/modules/category/category.module";
import { RelatedImageModule } from "src/modules/related-image/related-image.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { ProductModule } from "src/modules/product/product.module";
import { CartItemRequestToCartItem } from "./cart/CartItemRequestToCartItem";

@Module({
    
    imports:[
        TypeOrmModule.forFeature([RelatedImageModule,Product]),
        ModelMapperConfigModule,CategoryModule,RelatedImageModule],
    providers: [ProductToProductResponse,CreateProductRequestToProduct],
    exports: [ProductToProductResponse,CreateProductRequestToProduct]
})
export class ProductToResponseModule{

}