import { RelatedImage } from "src/database/entities/related-image.entity";
import { RelatedImageInterface } from "../interface.related-image.service";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RelatedImageImpl implements RelatedImageInterface{
    constructor(
        @InjectRepository(RelatedImage)
        private readonly relatedImageRepository : Repository<RelatedImage>
    ){};
    async getListRelatedProductImage(productId: number): Promise<RelatedImage[]> {
        const listRelatedImage = await this.relatedImageRepository.find({
            where : {product : {id : productId}},
            relations: ['product'],
        });
        return listRelatedImage;
    }

    //xoa danh sach relatedImage 
    async deleteRelatedProductImage(listRelatedImage: RelatedImage[]) : Promise<void>{
        await this.relatedImageRepository.remove(listRelatedImage);
    }
    //luu 
    async saveRelatedProductImage(relatedImage: RelatedImage): Promise<RelatedImage> {
        console.log(relatedImage);
        const related_image = await this.relatedImageRepository.save(relatedImage);
        return related_image;
    }
}