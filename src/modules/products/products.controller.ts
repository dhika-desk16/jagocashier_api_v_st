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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PermissionGuard } from 'src/common/permissions/permission.guard';
import { RequirePermissions } from 'src/common/permissions/permissions.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('products.create')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('products.read')
  findAll(
    @Query('id') categoryId?: string,
    @Query('name') name?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    if (categoryId) {
      return this.productsService.findByCategory(+categoryId);
    }
    if (name) {
      return this.productsService.findProductsByName(name);
    }
    if (page && limit) {
      return this.productsService.findAll(page, limit);
    }
    return this.productsService.findAll();
  }

  @Get('sku')
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('products.read')
  findProductBySku(@Query('sku') sku: string) {
    if (sku) {
      return this.productsService.findProductBySKU(sku);
    }
    return this.productsService.findAll();
  }

  @Get('barcode')
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('products.read')
  findProductsByBarcode(@Query('barcode') barcode: string) {
    if (barcode) {
      return this.productsService.findProductByBarcode(barcode);
    }
    return this.productsService.findAll();
  }

  @Get('all/categories')
  @Throttle({ long: {} })
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions('products.read')
  findProductWithCategory() {
    return this.productsService.findAllWithCategory();
  }

  @Get('all/categories/no-cache')
  @Throttle({ long: {} })
  findProductWithCategoryNoCache() {
    return this.productsService.findAllWithCategoryNoCache();
  }

  @Get('all/category/variants')
  @Throttle({ long: {} })
  findVariantProduct(@Query('id') productId: string) {
    if (productId) {
      return this.productsService.findVariantProduct(+productId);
    }
    return this.productsService.findAll();
  }

  @Get(':id')
  @Throttle({ long: {} })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @Throttle({ long: {} })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @Throttle({ long: {} })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
