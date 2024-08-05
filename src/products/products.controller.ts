import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

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

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() product: any) {}

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {}
}
