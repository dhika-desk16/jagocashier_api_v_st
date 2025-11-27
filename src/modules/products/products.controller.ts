import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query('id') categoryId?: string, @Query('name') name?: string) {
    if (categoryId) {
      return this.productsService.findByCategory(+categoryId);
    }
    if (name) {
      return this.productsService.findProductsByName(name);
    }
    return this.productsService.findAll();
  }
  @Get('sku')
  findProductBySku(@Query('sku') sku: string) {
    if (sku) {
      return this.productsService.findProductBySKU(sku);
    }
    return this.productsService.findAll();
  }
  @Get('barcode')
  findProductsByBarcode(@Query('barcode') barcode: string) {
    if (barcode) {
      return this.productsService.findProductByBarcode(barcode);
    }
    return this.productsService.findAll();
  }

  @Get('all/categories')
  findProductWithCategory() {
    return this.productsService.findAllWithCategory();
  }

  @Get('all/categories/no-cache')
  findProductWithCategoryNoCache() {
    return this.productsService.findAllWithCategoryNoCache();
  }

  @Get('all/category/variants')
  findVariantProduct(@Query('id') productId: string) {
    if (productId) {
      return this.productsService.findVariantProduct(+productId);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
