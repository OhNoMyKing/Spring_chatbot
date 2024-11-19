import { Product } from "src/database/entities/product.entity";
import { CreateProductRequest } from "src/payload/request/create.product.request";
import { SearchRequest } from "src/payload/request/search.request";
import { ProductDetailDto } from "src/payload/response/product.response.dto";
import { ListProductResponse } from "src/payload/response/search.response";

export interface ProductServiceInterface{
    findAllProductsDisplayForCustomer(searchRequest : SearchRequest) : Promise<ListProductResponse>,
    addProductByAdmin(createProductRequest : CreateProductRequest) : Promise<Product>,
    getProductById(id : number) : Promise<Product>,
    getProductsToCount() : Promise<number>,
    getRemainingProducts() : Promise<ProductDetailDto[]>,
    findProductByInfo(shirtNumber : number) : Promise<Product[]>
}