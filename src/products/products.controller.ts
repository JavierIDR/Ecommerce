import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/users/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
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

  @Get(':id')
  getProduct(@Param('id') id: string) {}
  
  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(@Param('id') id: string, @Body() product: any) {}

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {}
}
