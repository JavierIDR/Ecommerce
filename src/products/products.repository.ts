import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/entities/categories.entity";
import { Products } from "src/entities/products.entity";
import { Repository } from "typeorm";
import * as data from "../utils/data.json";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products) private productsRepository : Repository<Products>,
    @InjectRepository(Categories) private categoriesRepository : Repository<Categories>, 
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    let products = await this.productsRepository.find({
      relations: {
        category: true,
      },
    });
    const start = (page - 1) * limit;
    const end = start + limit;
    products = products.slice(start, end);
    return products;
  }

  async getProductById(id: string) {
    const product = await this.productsRepository.findOneBy({ id });
    if(!product) { 
      return `No se encontro el producto con id ${id}`;
    }
    return product;  
  }
  
  async addProducts() {
    const categories = await this.categoriesRepository.find();
    data?.map(async (element) => {
      const category = categories.find((category) => category.name === element.category);
      
      const product = new Products();
      product.name = element.name;
      product.description = element.description;
      product.price = element.price;
      product.imgUrl = element.imgUrl;
      product.stock = element.stock;
      product.category = category;
    
      await this.productsRepository
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values(product)
      .orUpdate(["description", "price", "imgUrl", "stock"], ["name"])
      .execute();
    });
    return "Productos agregados";
  }

  async updateProduct(id: string, product: Products) {
    await this.productsRepository.update(id, product);
    const updatedProduct = await this.productsRepository.findOneBy({ id });
    return updatedProduct;
}

  async deleteProduct(id: string) {
    await this.productsRepository.delete(id);
    return `Se elimino el producto con id ${id}`;
  }

}