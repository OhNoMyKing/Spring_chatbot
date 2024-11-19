import { Module } from "@nestjs/common";
import { ProductModule } from "../product/product.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rating } from "src/database/entities/rating.entity";
import { Product } from "src/database/entities/product.entity";
import { RatingService } from "./service/rating.service";
import { RecommendationController } from "./controller/rating.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Rating,Product]),
        ProductModule
    ],
    providers:[RatingService],
    controllers: [RecommendationController],
    exports: [RatingService]
})
export class RatingModule{

}