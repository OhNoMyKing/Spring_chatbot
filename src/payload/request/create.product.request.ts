
export class CreateProductRequest{
    id: number;
    name: string;
    price: number;
    main_image: string;
    description: string;
    categoryName: string;
    status: number;
    list_of_related_sportswear_images: string[];
}