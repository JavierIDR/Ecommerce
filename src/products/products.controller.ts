import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  getProducts(
    @Query("page")page: string, @Query("limit") limit: string
  ) {
    return this.productsService.getProducts(
      Number(page), Number(limit)
    );
  }

  @Get("seeder")
  addProducts() {
    return this.productsService.addProducts();
  }
}
