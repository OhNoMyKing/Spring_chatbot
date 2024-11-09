import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RelatedImage } from "src/database/entities/related-image.entity";
import { RelatedImageImpl } from "./service/impl/impl.related-image.service";
import { Product } from "src/database/entities/product.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([RelatedImage,Product])
    ],
    providers: [RelatedImageImpl],
    exports: [RelatedImageImpl],
})
export class RelatedImageModule{

}