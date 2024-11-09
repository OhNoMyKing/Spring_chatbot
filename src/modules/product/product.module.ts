import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { ProductServiceImpl } from "./service/impl/implement.product.service";
import { ProductController } from "./controller/product.controller";
import { ProductToProductResponse } from "src/converter/ProductToProductResponse";
import { ProductToResponseModule } from "src/converter/productToResponse.module";
import { ModelMapperConfigModule } from "src/config/model-mapper.config";
import { RelatedImage } from "src/database/entities/related-image.entity";
import { RelatedImageModule } from "../related-image/related-image.module";
import { CategoryModule } from "../category/category.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product,RelatedImage]),
        ModelMapperConfigModule,
        ProductToResponseModule,
        RelatedImageModule,
        CategoryModule
    ],
    providers: [ProductServiceImpl],
    controllers: [ProductController],
    exports: [ProductServiceImpl]
})
export class ProductModule{

}