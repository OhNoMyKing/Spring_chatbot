import { ProductResponse } from "./product.response";

export class ListProductResponse{
    sportswearResponseList : ProductResponse[];
    currentPage : number;
    totalPage : number;
}