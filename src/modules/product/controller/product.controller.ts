import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SearchRequest } from "src/payload/request/search.request";
import { ProductServiceImpl } from "../service/impl/implement.product.service";
import { CreateProductRequest } from "src/payload/request/create.product.request";
import { ProductToProductResponse } from "src/converter/ProductToProductResponse";
import { RelatedImage } from "src/database/entities/related-image.entity";
import { RelatedImageImpl } from "src/modules/related-image/service/impl/impl.related-image.service";
import { ProductCountAndDetailsResponseDto } from "src/payload/response/product.response.dto";
import { Product } from "src/database/entities/product.entity";

@Controller()
export class ProductController{
    constructor(
        private readonly productService : ProductServiceImpl,
        private readonly productToResponse : ProductToProductResponse,
        private readonly relatedImageService : RelatedImageImpl
    ){}
    @Get('api/web/search')
    async getProductByCustomer(@Body() search : SearchRequest){
        return this.productService.findAllProductsDisplayForCustomer(search);
    }
    @Post('/api/admin/add-product')
    async addProductByAdmin(@Body() createProductRequest : CreateProductRequest){
        return this.productService.addProductByAdmin(createProductRequest);
    }
    @Get("/api/web/detail/:id")
    async getProductDetailsById(@Param('id') id:number){
        const prodcutEntity = await this.productService.getProductById(id);
        const relatedImage = await this.relatedImageService.getListRelatedProductImage(id);
        if(relatedImage){
            prodcutEntity.relatedImage = relatedImage;
        }
        const productResponse = await this.productToResponse.productToProductResponse(prodcutEntity);
        console.log(productResponse);
        return productResponse;
    }
    @Get('/products/count-and-details')
    async getProductCountAndDetails() : Promise<ProductCountAndDetailsResponseDto>{
        const count =  await this.productService.getProductsToCount();
        console.log(count);
        const products = await  this.productService.getRemainingProducts();
        const productCountAndDetailsResponseDto = new ProductCountAndDetailsResponseDto();
        productCountAndDetailsResponseDto.count = count;
        productCountAndDetailsResponseDto.products = products;
        return productCountAndDetailsResponseDto;
    }
    @Get('/products/shirt/:shirtNumber')
    async getProductByInformation(@Param('shirtNumber') shirtNumber : number) : Promise<Product[]>{
        const productList = await this.productService.findProductByInfo(shirtNumber);
        return productList;
    }
}