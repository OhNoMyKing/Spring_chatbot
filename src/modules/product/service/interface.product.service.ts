import { Product } from "src/database/entities/product.entity";
import { CreateProductRequest } from "src/payload/request/create.product.request";
import { SearchRequest } from "src/payload/request/search.request";
import { ListProductResponse } from "src/payload/response/search.response";

export interface ProductServiceInterface{
    findAllProductsDisplayForCustomer(searchRequest : SearchRequest) : Promise<ListProductResponse>,
    addProductByAdmin(createProductRequest : CreateProductRequest) : Promise<Product>,
    getProductById(id : number) : Promise<Product>,
    getProductsToCount() : Promise<number>
}