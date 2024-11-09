import { SearchRequest } from "src/payload/request/search.request";
import { ListProductResponse } from "src/payload/response/search.response";
import { ProductServiceInterface } from "../interface.product.service";
import { Injectable } from "@nestjs/common";
import { Product } from "src/database/entities/product.entity";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { StringUtils } from "src/utils/StringUtils";
import { ProductToProductResponse } from "src/converter/ProductToProductResponse";
import { ProductResponse } from "src/payload/response/product.response";
import { CreateProductRequest } from "src/payload/request/create.product.request";
import { CreateProductRequestToProduct } from "src/converter/CreateProductRequestToProduct";
import { RelatedImageImpl } from "src/modules/related-image/service/impl/impl.related-image.service";
import { RelatedImage } from "src/database/entities/related-image.entity";
import { Category } from "src/database/entities/category.entity";
import { CategoryServiceImpl } from "src/modules/category/service/impl/impl.category.service";
@Injectable()
export class ProductServiceImpl implements ProductServiceInterface{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository : Repository<Product>,
        @InjectEntityManager()
        private readonly entityManager : EntityManager,
        private readonly productMapper : ProductToProductResponse,
        private readonly createProduct : CreateProductRequestToProduct,
        private readonly relatedImageService: RelatedImageImpl,
        private readonly productToProductResponse : ProductToProductResponse,
        private readonly categoryService : CategoryServiceImpl,
    ){}
    private joinTable(searchRequest : SearchRequest,sql : string[]) : void{
        const category = searchRequest.categoryName;
        if(StringUtils.check(category)){
            sql.push("INNER JOIN category c ON p.category_id = c.id");
        }
    }
    private querySpecial(searchRequest : SearchRequest, where : string[]) : void{
        const category = searchRequest.categoryName;
        if(StringUtils.check(category)){
            where.push("AND c.name LIKE '%" + category + "%'");
        }
    }
    private queryNormal(searchRequest : SearchRequest, where : string[]): void{
        const name = searchRequest.key;
        if(name){
            where.push("AND p.name LIKE '%" + name + "%'");
        }
    }
    async findAllProductsDisplayForCustomer(searchRequest: SearchRequest): Promise<ListProductResponse> {
        const limit =4;
        const noPage = searchRequest.noPage ? searchRequest.noPage :1;
        const offSet = (noPage -1)*limit;
        const sql = ["SELECT p.* FROM product p"];
        const where = ["WHERE 1=1"];
        this.joinTable(searchRequest,sql);
        this.queryNormal(searchRequest,where);
        this.querySpecial(searchRequest,where);
        where.push("AND p.status = 1");
        sql.push(...where);

        //tinh offset --> tinh tong so san pham -> total page
        const countSql =  `
            SELECT COUNT (*) AS total_count
            FROM(
                ${sql.join(" ")}
            ) AS filtered_products;
        `;
        const totalProductsResult = await this.entityManager.query(countSql);
        const totalProducts = totalProductsResult[0]?.total_count ?? 0;
        const totalPages = Math.ceil(totalProducts/limit);
        //truy van lay danh sach product theo trang
        const finalSql = `${sql.join(" ")} LIMIT ${limit} OFFSET ${offSet}`;
        console.log(finalSql);
        //thuc hien truy van
        const result = await this.entityManager.query(finalSql);
        //xu ly chuyen sang Object
        const categoryId = result[0].category_id;
        const categoryName = await this.categoryService.getCategoryById2(categoryId);
        //xu ly anh lien quan
        const realtedImages = await this.relatedImageService.getListRelatedProductImage(result[0].id);
        // console.log(result);
        //ep kieu mang result sang object Product
        const listProduct : Product[] = result.map(item => {
            const newProduct = new Product();
            newProduct.id = item.id;
            newProduct.name = item.name;
            newProduct.price = item.price;
            newProduct.mainImage = item.main_image;
            newProduct.status = item.status;
            newProduct.description =item.description;
            newProduct.category = categoryName;
            newProduct.relatedImage = realtedImages;
            return newProduct;
        });
        console.log(listProduct);
        //tra ve danh sach san pham
        const listProductResponse = listProduct.map(product =>{
           return  this.productToProductResponse.productToProductResponse(product);
        });
        const resultFinal = new ListProductResponse();
        resultFinal.sportswearResponseList = listProductResponse;
        resultFinal.currentPage = noPage;
        resultFinal.totalPage = totalPages;
        return resultFinal;
    
    }
    async saveProduct(product : Product) : Promise<Product>{
        return await this.productRepository.save(product);
    }
    async addProductByAdmin(createProductRequest: CreateProductRequest): Promise<Product> {
        const entityProduct =  await this.createProduct.createProductRequestConvertProduct(createProductRequest);
        const resultProduct = await this.productRepository.save(entityProduct);
        if(createProductRequest.id != null){
            const listRelateImage = await this.relatedImageService.getListRelatedProductImage(createProductRequest.id);
            await this.relatedImageService.deleteRelatedProductImage(listRelateImage);
        }
        const related_photo = createProductRequest.list_of_related_sportswear_images;
        if(related_photo != null){
            related_photo.map((image) =>{
                const relatedImage = new RelatedImage();
                relatedImage.relatedImage = image;
                relatedImage.product = resultProduct;
                this.relatedImageService.saveRelatedProductImage(relatedImage);
            })
        }
        const finalProduct = await this.productRepository.save(resultProduct);
        return finalProduct;
    }
    async getProductById(id: number): Promise<Product> {
        return this.productRepository.findOne({
            where : { id : id},
            relations: ['category']
        })
    }
    async getProductsToCount() :Promise<number>{
        const query = `
            SELECT COUNT(*)
            FROM product;
        `
        const result = await this.entityManager.query(query);
        return result[0];
    }
}