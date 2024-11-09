import { RelatedImage } from "src/database/entities/related-image.entity";

export interface RelatedImageInterface{
    getListRelatedProductImage(productId : number) : Promise<RelatedImage[]>,
    deleteRelatedProductImage(listRelatedImage : RelatedImage[]) : Promise<void>,
    saveRelatedProductImage(relatedImage : RelatedImage) : Promise<RelatedImage>
}