"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const roles_module_1 = require("./modules/roles/roles.module");
const stores_module_1 = require("./modules/stores/stores.module");
const product_categories_module_1 = require("./modules/product-categories/product-categories.module");
const payment_methods_module_1 = require("./modules/payment-methods/payment-methods.module");
const taxes_module_1 = require("./modules/taxes/taxes.module");
const customers_module_1 = require("./modules/customers/customers.module");
const store_settings_module_1 = require("./modules/store-settings/store-settings.module");
const users_module_1 = require("./modules/users/users.module");
const products_module_1 = require("./modules/products/products.module");
const promotions_module_1 = require("./modules/promotions/promotions.module");
const loyalty_points_module_1 = require("./modules/loyalty-points/loyalty-points.module");
const product_variants_module_1 = require("./modules/product-variants/product-variants.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const shifts_module_1 = require("./modules/shifts/shifts.module");
const promotion_products_module_1 = require("./modules/promotion-products/promotion-products.module");
const stock_adjustments_module_1 = require("./modules/stock-adjustments/stock-adjustments.module");
const stock_transfers_module_1 = require("./modules/stock-transfers/stock-transfers.module");
const transactions_module_1 = require("./modules/transactions/transactions.module");
const transaction_items_module_1 = require("./modules/transaction-items/transaction-items.module");
const payments_module_1 = require("./modules/payments/payments.module");
const receipts_module_1 = require("./modules/receipts/receipts.module");
const loyalty_transactions_module_1 = require("./modules/loyalty-transactions/loyalty-transactions.module");
const auth_module_1 = require("./modules/auth/auth.module");
const prisma_module_1 = require("./prisma/prisma.module");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            roles_module_1.RolesModule,
            stores_module_1.StoresModule,
            product_categories_module_1.ProductCategoriesModule,
            payment_methods_module_1.PaymentMethodsModule,
            taxes_module_1.TaxesModule,
            customers_module_1.CustomersModule,
            store_settings_module_1.StoreSettingsModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            promotions_module_1.PromotionsModule,
            loyalty_points_module_1.LoyaltyPointsModule,
            product_variants_module_1.ProductVariantsModule,
            inventory_module_1.InventoryModule,
            shifts_module_1.ShiftsModule,
            promotion_products_module_1.PromotionProductsModule,
            stock_adjustments_module_1.StockAdjustmentsModule,
            stock_transfers_module_1.StockTransfersModule,
            transactions_module_1.TransactionsModule,
            transaction_items_module_1.TransactionItemsModule,
            payments_module_1.PaymentsModule,
            receipts_module_1.ReceiptsModule,
            loyalty_transactions_module_1.LoyaltyTransactionsModule,
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'short',
                    ttl: 1000,
                    limit: 3,
                },
                {
                    name: 'medium',
                    ttl: 10000,
                    limit: 20,
                },
                {
                    name: 'long',
                    ttl: 60000,
                    limit: 100,
                },
            ]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map