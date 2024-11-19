import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/database/entities/product.entity";
import { Rating } from "src/database/entities/rating.entity";
import { Repository } from "typeorm";

@Injectable()
export class RatingService {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository : Repository<Rating>,
        @InjectRepository(Product)
        private readonly productRepository : Repository<Product>
    ){};
    // Phương thức để tính toán các sản phẩm gợi ý cho người dùng
    async recommendProducts(userId: number): Promise<Product[]> {
    // Lấy tất cả các rating của người dùng
        const userRatings = await this.ratingRepository.find({ where: { user: { id: userId } }, relations: ['product'] });

        // Tính toán các sản phẩm gợi ý
        const predictedRatings = await this.calculatePredictions(userRatings);

        // Chọn ra 5 sản phẩm có điểm gợi ý cao nhất
        const recommendedProducts = Object.entries(predictedRatings)
        .sort(([, ratingA], [, ratingB]) => ratingB - ratingA)
        .slice(0, 5)
        .map(([productId]) => productId);

        return this.productRepository.findByIds(recommendedProducts);
    }

  // Phương thức tính toán dự đoán điểm số cho các sản phẩm chưa được đánh giá
    private async calculatePredictions(userRatings: Rating[]): Promise<Record<string, number>> {
        const diff: Record<number, Record<number, number>> = {};
        const freq: Record<number, Record<number, number>> = {};
        const predictedRatings: Record<number, number> = {};

        // Tính toán sự khác biệt giữa các sản phẩm đã được đánh giá
        for (const rating1 of userRatings) {
        for (const rating2 of userRatings) {
            if (rating1.product.id !== rating2.product.id) {
            if (!diff[rating1.product.id]) {
                diff[rating1.product.id] = {};
                freq[rating1.product.id] = {};
            }

            const observedDiff = rating1.rating - rating2.rating;
            diff[rating1.product.id][rating2.product.id] = (diff[rating1.product.id][rating2.product.id] || 0) + observedDiff;
            freq[rating1.product.id][rating2.product.id] = (freq[rating1.product.id][rating2.product.id] || 0) + 1;
            }
        }
        }

        // Chuẩn hóa sự khác biệt
        for (const product1Id in diff) {
        for (const product2Id in diff[product1Id]) {
            const totalDiff = diff[product1Id][product2Id];
            const count = freq[product1Id][product2Id];
            diff[product1Id][product2Id] = totalDiff / count;
        }
        }

        // Dự đoán điểm số cho các sản phẩm chưa được đánh giá
        for (const product of userRatings.map((rating) => rating.product)) {
        const otherProducts = await this.productRepository.find();

        for (const otherProduct of otherProducts) {
            if (!userRatings.some((rating) => rating.product.id === otherProduct.id)) {
            let predictedRating = 0;
            let totalCount = 0;

            for (const rating of userRatings) {
                if (diff[rating.product.id] && diff[rating.product.id][otherProduct.id]) {
                const weight = freq[rating.product.id][otherProduct.id];
                predictedRating += (rating.rating + diff[rating.product.id][otherProduct.id]) * weight;
                totalCount += weight;
                }
            }

            if (totalCount > 0) {
                predictedRatings[otherProduct.id] = predictedRating / totalCount;
            }
            }
        }
        }
        console.log(predictedRatings);
        return predictedRatings;
    }
}