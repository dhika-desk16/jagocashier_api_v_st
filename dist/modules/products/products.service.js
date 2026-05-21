"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const response_helper_1 = require("../../common/dto/response.helper");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        return this.prisma.$transaction(async (tx) => {
            const { categoryId, sku, barcode, ...payload } = createProductDto;
            const category = await tx.productCategory.findFirst({
                where: {
                    id: categoryId,
                    isActive: true,
                },
            });
            if (!category) {
                throw new common_1.NotFoundException('Product category not found or inactive');
            }
            const existingSku = await tx.product.findUnique({
                where: { sku },
            });
            if (existingSku) {
                throw new common_1.ConflictException('SKU already exists');
            }
            if (barcode) {
                const existingBarcode = await tx.product.findUnique({
                    where: { barcode },
                });
                if (existingBarcode) {
                    throw new common_1.ConflictException('Barcode already exists');
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
            return (0, response_helper_1.createResponse)(product);
        });
    }
    async findAll(page, limit) {
        if (limit === 'all') {
            const data = await this.prisma.product.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return (0, response_helper_1.createResponse)({
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
        return (0, response_helper_1.createResponse)({
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
        return (0, response_helper_1.createResponse)(productCategories);
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
        return (0, response_helper_1.createResponse)(categories);
    }
    async findByCategory(categoryId) {
        const products = await this.prisma.product.findMany({
            where: { categoryId },
        });
        let productCategory = null;
        if (categoryId) {
            productCategory = await this.prisma.productCategory.findUnique({
                where: { id: categoryId },
            });
        }
        return (0, response_helper_1.createResponse)({ productCategory, data: products });
    }
    async findProductsByName(name) {
        const products = await this.prisma.product.findMany({
            where: {
                name: { contains: name, mode: 'insensitive' },
            },
        });
        return (0, response_helper_1.createResponse)(products);
    }
    async findProductBySKU(sku) {
        const product = await this.prisma.product.findUnique({ where: { sku } });
        return (0, response_helper_1.createResponse)(product);
    }
    async findProductByBarcode(barcode) {
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
        return (0, response_helper_1.createResponse)(product);
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
        return (0, response_helper_1.createResponse)(categories);
    }
    async findVariantProduct(productId) {
        const productVariants = await this.prisma.productVariant.findUnique({
            where: { id: productId },
        });
        let product = null;
        if (productId) {
            product = await this.prisma.product.findUnique({
                where: { id: productId },
            });
        }
        return (0, response_helper_1.createResponse)({ product, productVariants });
    }
    findOne(id) {
        return `This action returns a #${id} product`;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map