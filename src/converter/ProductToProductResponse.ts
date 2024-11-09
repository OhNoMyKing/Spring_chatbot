import { Inject, Injectable } from "@nestjs/common";
import {ModelMapper} from 'model-mapper'
import { Product } from "src/database/entities/product.entity";
import { ProductResponse } from "src/payload/response/product.response";
@Injectable()
export class ProductToProductResponse{
    constructor(@Inject('ModelMapper') private readonly modelMapper : ModelMapper){}
    public productToProductResponse(product : Product) : ProductResponse{
        //su dung modelmapper de anh xa
        //anh xa bang tay
        const productResponse = new ProductResponse();
        productResponse.id = product.id;
        productResponse.name = product.name;
        productResponse.price = product.price;
        productResponse.status = product.status;
        productResponse.description = product.description;
        productResponse.main_image = product.mainImage;
        //xu ly related_image va category
        const relatedImageProduct = product.relatedImage;
        // console.log(relatedImageProduct);
        const related_photo = relatedImageProduct.map((item) =>{
            return item.relatedImage;
        });
        productResponse.list_of_related_sportswear_images = related_photo;
        productResponse.categoryName = product.category.name;
        return productResponse;
    }
}