import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './modules/roles/roles.module';
import { StoresModule } from './modules/stores/stores.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module';
import { TaxesModule } from './modules/taxes/taxes.module';
import { CustomersModule } from './modules/customers/customers.module';
import { StoreSettingsModule } from './modules/store-settings/store-settings.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { LoyaltyPointsModule } from './modules/loyalty-points/loyalty-points.module';
import { ProductVariantsModule } from './modules/product-variants/product-variants.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { ShiftsModule } from './modules/shifts/shifts.module';
import { PromotionProductsModule } from './modules/promotion-products/promotion-products.module';
import { StockAdjustmentsModule } from './modules/stock-adjustments/stock-adjustments.module';
import { StockTransfersModule } from './modules/stock-transfers/stock-transfers.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { TransactionItemsModule } from './modules/transaction-items/transaction-items.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReceiptsModule } from './modules/receipts/receipts.module';
import { LoyaltyTransactionsModule } from './modules/loyalty-transactions/loyalty-transactions.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    RolesModule,
    StoresModule,
    ProductCategoriesModule,
    PaymentMethodsModule,
    TaxesModule,
    CustomersModule,
    StoreSettingsModule,
    UsersModule,
    ProductsModule,
    PromotionsModule,
    LoyaltyPointsModule,
    ProductVariantsModule,
    InventoryModule,
    ShiftsModule,
    PromotionProductsModule,
    StockAdjustmentsModule,
    StockTransfersModule,
    TransactionsModule,
    TransactionItemsModule,
    PaymentsModule,
    ReceiptsModule,
    LoyaltyTransactionsModule,
    AuthModule,
    PrismaModule,
    ThrottlerModule.forRoot([
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
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
