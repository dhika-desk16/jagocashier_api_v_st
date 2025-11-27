import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';
import { Product, ProductCategory } from 'generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    const products = await this.prisma.product.findMany();

    return createResponse(products);
  }

  async findAllCategory() {
    const productCategories = await this.prisma.productCategory.findMany();
    return createResponse(productCategories);
  }

  async findAllWithCategory() {
    const categories = await this.prisma.productCategory.findMany({
      where: { isActive: true },
      include: {
        products: {
          orderBy: { id: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });
    return createResponse(categories);
  }

  async findByCategory(categoryId: number) {
    const products = await this.prisma.product.findMany({
      where: { categoryId },
    });

    let productCategory: ProductCategory | null = null;
    if (categoryId) {
      productCategory = await this.prisma.productCategory.findUnique({
        where: { id: categoryId },
      });
    }
    return createResponse({ productCategory, data: products });
  }

  async findProductsByName(name: string) {
    const products = await this.prisma.product.findMany({
      where: {
        name: { contains: name, mode: 'insensitive' },
      },
    });
    return createResponse(products);
  }

  async findProductBySKU(sku: string) {
    const product = await this.prisma.product.findUnique({ where: { sku } });
    return createResponse(product);
  }

  async findProductByBarcode(barcode: string) {
    const product = await this.prisma.product.findFirst({
      where: { barcode },
      include: {
        promotionProducts: {
          include: {
            promotion: true,
          },
        },
      },
    });
    return createResponse(product);
  }

  async findAllWithCategoryNoCache() {
    const categories = await this.prisma.productCategory.findMany({
      where: { isActive: true },
      include: {
        products: {
          orderBy: { id: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });

    return createResponse(categories);
  }

  async findVariantProduct(productId: number) {
    const productVariants = await this.prisma.productVariant.findUnique({
      where: { id: productId },
    });

    let product: Product | null = null;
    if (productId) {
      product = await this.prisma.product.findUnique({
        where: { id: productId },
      });
    }

    return createResponse({ product, productVariants });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
