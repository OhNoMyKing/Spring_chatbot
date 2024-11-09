import { LargeNumberLike } from "crypto";

export class ProductResponse{
    id : number;
    name : string;
    price : number;
    description : string;
    main_image : string;
    status : number;
    list_of_related_sportswear_images : string[];
    categoryName : string;
}