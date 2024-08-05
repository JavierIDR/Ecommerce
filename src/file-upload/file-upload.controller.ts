import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}
  
  @ApiBearerAuth()
  @Post("uploadImage/:id")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  uploadImage(
    @Param("id") productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000, 
            message: "El archivo no debe superar los 200KB",
          }),
          new FileTypeValidator({
            fileType: /(.jpg|.jpeg|.png|.webp)/,
          })
          ]
        })
    ) file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
