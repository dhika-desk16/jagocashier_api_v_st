import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createResponse } from 'src/common/dto/response.helper';
import { Product, ProductCategory } from 'generated/prisma';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto) {
    return this.prisma.$transaction(async (tx) => {
      const { categoryId, sku, barcode, ...payload } = createProductDto;

      const category = await tx.productCategory.findFirst({
        where: {
          id: categoryId,
          isActive: true,
        },
      });

      if (!category) {
        throw new NotFoundException('Product category not found or inactive');
      }

      const existingSku = await tx.product.findUnique({
        where: { sku },
      });

      if (existingSku) {
        throw new ConflictException('SKU already exists');
      }

      if (barcode) {
        const existingBarcode = await tx.product.findUnique({
          where: { barcode },
        });

        if (existingBarcode) {
          throw new ConflictException('Barcode already exists');
        }
      }

      const product = await tx.product.create({
        data: {
          sku,
          barcode,
          categoryId,
          ...payload,
        },
      });

      return createResponse(product);
    });
  }

  async findAll(page?: number, limit?: number | 'all') {
    if (limit === 'all') {
      const data = await this.prisma.product.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      return createResponse({
        data,
        meta: {
          total: data.length,
          mode: 'all',
        },
      });
    }

    const take = Math.min(Number(limit) || 10, 100);
    const currentPage = Math.max(Number(page) || 1, 1);
    const skip = (currentPage - 1) * take;

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count(),
    ]);

    const totalPages = Math.ceil(total / take);

    return createResponse({
      data,
      meta: {
        total,
        page: currentPage,
        limit: take,
        totalPages,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
      },
    });
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
