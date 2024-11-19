import { Controller, Get, Param } from "@nestjs/common";
import { RatingService } from "../service/rating.service";
import { Product } from "src/database/entities/product.entity";
@Controller('recommendations')
export class RecommendationController{
    constructor(
        private ratingService : RatingService
    ){};
    @Get(':userId')
    async getRecommendations(@Param('userId') userId : number) : Promise<Product[]>{
        return this.ratingService.recommendProducts(userId);
    }
}