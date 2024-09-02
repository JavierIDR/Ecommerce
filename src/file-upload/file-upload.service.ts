import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Products) 
    private readonly productsRepository : Repository<Products>,
  ) {}

  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if(!product) {
      throw new NotFoundException(`No se encontró el producto`);
    }

    const response = await this.fileUploadRepository.uploadImage(file);
    if(!response) {
      throw new NotFoundException(`No se pudo subir la imagen`);
    }

    try {
      await this.productsRepository.update(productId, { 
        imgUrl: response.secure_url,
      });

    const updatedProduct = await this.productsRepository.findOneBy({ id: productId });
      if (!updatedProduct) {
        throw new InternalServerErrorException(`Error al obtener el producto actualizado`);
      }

      return updatedProduct;
    } catch (error) {
      throw new InternalServerErrorException(`Error al actualizar la imagen del producto`);
    }
  }
}
