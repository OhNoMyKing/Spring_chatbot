export class ProductDetailDto{
    id: number;
    image_url: string;
}

export class ProductCountAndDetailsResponseDto{
    count : number;
    products : ProductDetailDto[];
}