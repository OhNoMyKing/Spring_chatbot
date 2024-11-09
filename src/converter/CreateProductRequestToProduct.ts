import { Inject, Injectable } from "@nestjs/common";
import {ModelMapper} from 'model-mapper';
import { Product } from "src/database/entities/product.entity";
import { RelatedImage } from "src/database/entities/related-image.entity";
import { CategoryServiceImpl } from "src/modules/category/service/impl/impl.category.service";
import { ProductServiceImpl } from "src/modules/product/service/impl/implement.product.service";
import { RelatedImageImpl } from "src/modules/related-image/service/impl/impl.related-image.service";
import { CreateProductRequest } from "src/payload/request/create.product.request";
@Injectable()
export class CreateProductRequestToProduct{
    constructor(
        @Inject('ModelMapper')
        private readonly modelMapper : ModelMapper,
        private readonly categoryService : CategoryServiceImpl,
        private readonly relatedImageService : RelatedImageImpl){};
    public async createProductRequestConvertProduct(createProductRequest : CreateProductRequest) : Promise<Product>{
        // const productEntity = this.modelMapper.map(createProductRequest,Product);
        const productEntity = new Product();
        // if(createProductRequest.id){
        //     productEntity.id = createProductRequest.id;
        // }
        productEntity.description = createProductRequest.description;
        productEntity.name = createProductRequest.name;
        productEntity.price = createProductRequest.price;
        productEntity.status = createProductRequest.status;
        productEntity.mainImage = createProductRequest.main_image;
        if(!createProductRequest.categoryName){
            createProductRequest.categoryName = "CLB";
        }
        const categoryProduct = await this.categoryService.getCategoryByName(createProductRequest.categoryName);
        productEntity.category = categoryProduct;
        // if(createProductRequest.id != null){
        //     const listRelateImage = await this.relatedImageService.getListRelatedProductImage(createProductRequest.id);
        //     await this.relatedImageService.deleteRelatedProductImage(listRelateImage);
        // }
        // const related_photo = createProductRequest.list_of_related_sportswear_images;
        // if(related_photo != null){
        //     related_photo.map((image) =>{
        //         const relatedImage = new RelatedImage();
        //         relatedImage.relatedImage = image;
        //         relatedImage.product = productEntity;
        //         this.relatedImageService.saveRelatedProductImage(relatedImage);
        //     })
        // }
        return productEntity;
    }
}