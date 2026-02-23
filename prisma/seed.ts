import { PrismaClient } from '../generated/prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  try {
    await seedRoles();
    await seedStores();
    await seedStoreSettings();
    await seedUsers();
    await seedProductCategories();
    await seedProducts();
    await seedProductVariants();
    await seedInventory();
    await seedCustomers();
    await seedLoyaltyPoints();
    await seedPaymentMethods();
    await seedTaxes();
    await seedPromotions();

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error;
  }
}

async function seedRoles() {
  const count = await prisma.role.count();

  if (count > 0) {
    console.log('  Roles already seeded');
    return;
  }

  const roles = [
    {
      name: 'Super Admin',
      description: 'Full system access',
      permissions: {
        all: true,
        users: { create: true, read: true, update: true, delete: true },
        stores: { create: true, read: true, update: true, delete: true },
        products: { create: true, read: true, update: true, delete: true },
        transactions: { create: true, read: true, update: true, delete: true },
        reports: { view: true, export: true },
      },
    },
    {
      name: 'Store Manager',
      description: 'Manage store operations',
      permissions: {
        users: { create: true, read: true, update: true, delete: false },
        products: { create: true, read: true, update: true, delete: false },
        transactions: { create: true, read: true, update: true, delete: false },
        inventory: { create: true, read: true, update: true, delete: false },
        reports: { view: true, export: true },
      },
    },
    {
      name: 'Cashier',
      description: 'Handle sales transactions',
      permissions: {
        transactions: {
          create: true,
          read: true,
          update: false,
          delete: false,
        },
        products: { create: false, read: true, update: false, delete: false },
        customers: { create: true, read: true, update: true, delete: false },
      },
    },
    {
      name: 'Stock Clerk',
      description: 'Manage inventory',
      permissions: {
        inventory: { create: true, read: true, update: true, delete: false },
        products: { create: false, read: true, update: false, delete: false },
      },
    },
  ];

  await prisma.role.createMany({ data: roles });
  console.log(' Roles seeded');
}

async function seedStores() {
  const count = await prisma.store.count();

  if (count > 0) {
    console.log('  Stores already seeded');
    return;
  }

  const stores = [
    {
      code: 'STR001',
      name: 'Main Store - Surabaya',
      address: 'Jl. Raya Darmo No. 123',
      city: 'Surabaya',
      phone: '031-1234567',
      email: 'main@posstore.com',
      isActive: true,
    },
    {
      code: 'STR002',
      name: 'Branch Store - Jakarta',
      address: 'Jl. Sudirman No. 456',
      city: 'Jakarta',
      phone: '021-9876543',
      email: 'jakarta@posstore.com',
      isActive: true,
    },
    {
      code: 'STR003',
      name: 'Branch Store - Bandung',
      address: 'Jl. Braga No. 789',
      city: 'Bandung',
      phone: '022-5555555',
      email: 'bandung@posstore.com',
      isActive: true,
    },
  ];

  await prisma.store.createMany({ data: stores });
  console.log(' Stores seeded');
}

async function seedStoreSettings() {
  const count = await prisma.storeSetting.count();

  if (count > 0) {
    console.log('  Store Settings already seeded');
    return;
  }

  const stores = await prisma.store.findMany();

  const settings = stores.map((store) => ({
    storeId: store.id,
    taxRate: 11.0,
    currency: 'IDR',
    timezone: 'Asia/Jakarta',
    printerConfig: {
      name: 'Epson TM-T82',
      port: 'USB001',
      paperWidth: 80,
    },
    receiptTemplate: {
      header: 'Thank you for shopping with us!',
      footer: 'Please come again',
      showLogo: true,
    },
  }));

  await prisma.storeSetting.createMany({ data: settings });
  console.log(' Store Settings seeded');
}

async function seedUsers() {
  const count = await prisma.user.count();

  if (count > 0) {
    console.log('  Users already seeded');
    return;
  }

  const roles = await prisma.role.findMany();
  const stores = await prisma.store.findMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const users = [
    {
      username: 'superadmin',
      password: hashedPassword,
      fullName: 'Super Admin',
      email: 'admin@posstore.com',
      phone: '081234567890',
      roleId: roles.find((r) => r.name === 'Super Admin')!.id,
      storeId: stores[0].id,
      isActive: true,
    },
    {
      username: 'manager1',
      password: hashedPassword,
      fullName: 'John Manager',
      email: 'john@posstore.com',
      phone: '081234567891',
      roleId: roles.find((r) => r.name === 'Store Manager')!.id,
      storeId: stores[0].id,
      isActive: true,
    },
    {
      username: 'cashier1',
      password: hashedPassword,
      fullName: 'Jane Cashier',
      email: 'jane@posstore.com',
      phone: '081234567892',
      roleId: roles.find((r) => r.name === 'Cashier')!.id,
      storeId: stores[0].id,
      isActive: true,
    },
    {
      username: 'cashier2',
      password: hashedPassword,
      fullName: 'Bob Cashier',
      email: 'bob@posstore.com',
      phone: '081234567893',
      roleId: roles.find((r) => r.name === 'Cashier')!.id,
      storeId: stores[1].id,
      isActive: true,
    },
    {
      username: 'stock1',
      password: hashedPassword,
      fullName: 'Alice Stock',
      email: 'alice@posstore.com',
      phone: '081234567894',
      roleId: roles.find((r) => r.name === 'Stock Clerk')!.id,
      storeId: stores[0].id,
      isActive: true,
    },
  ];

  await prisma.user.createMany({ data: users });
  console.log(' Users seeded');
}

async function seedProductCategories() {
  const count = await prisma.productCategory.count();

  if (count > 0) {
    console.log('  Product Categories already seeded');
    return;
  }

  const categories = [
    {
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      isActive: true,
    },
    {
      name: 'Clothing',
      description: 'Apparel and fashion items',
      isActive: true,
    },
    {
      name: 'Food & Beverage',
      description: 'Food and drink products',
      isActive: true,
    },
    { name: 'Books', description: 'Books and publications', isActive: true },
    {
      name: 'Home & Living',
      description: 'Home decor and living essentials',
      isActive: true,
    },
  ];

  // Create parent categories
  const createdCategories = await Promise.all(
    categories.map((cat) => prisma.productCategory.create({ data: cat })),
  );

  // Add subcategories
  const subcategories = [
    {
      name: 'Smartphones',
      description: 'Mobile phones',
      parentId: createdCategories[0].id,
      isActive: true,
    },
    {
      name: 'Laptops',
      description: 'Portable computers',
      parentId: createdCategories[0].id,
      isActive: true,
    },
    {
      name: 'Men Clothing',
      description: 'Clothing for men',
      parentId: createdCategories[1].id,
      isActive: true,
    },
    {
      name: 'Women Clothing',
      description: 'Clothing for women',
      parentId: createdCategories[1].id,
      isActive: true,
    },
    {
      name: 'Snacks',
      description: 'Snack foods',
      parentId: createdCategories[2].id,
      isActive: true,
    },
    {
      name: 'Beverages',
      description: 'Drinks and beverages',
      parentId: createdCategories[2].id,
      isActive: true,
    },
  ];

  await prisma.productCategory.createMany({ data: subcategories });
  console.log(' Product Categories seeded');
}

async function seedProducts() {
  const count = await prisma.product.count();

  if (count > 0) {
    console.log('  Products already seeded');
    return;
  }

  const categories = await prisma.productCategory.findMany();

  const electronicsCategory = categories.find((c) => c.name === 'Smartphones');
  const clothingCategory = categories.find((c) => c.name === 'Men Clothing');
  const foodCategory = categories.find((c) => c.name === 'Snacks');

  const products = [
    {
      sku: 'PHONE-001',
      name: 'Samsung Galaxy S23',
      description: 'Latest Samsung flagship smartphone',
      categoryId: electronicsCategory!.id,
      basePrice: 12999000,
      costPrice: 10000000,
      barcode: '8801234567890',
      isActive: true,
      trackInventory: true,
    },
    {
      sku: 'PHONE-002',
      name: 'iPhone 15 Pro',
      description: 'Apple iPhone 15 Pro',
      categoryId: electronicsCategory!.id,
      basePrice: 18999000,
      costPrice: 15000000,
      barcode: '0194252701938',
      isActive: true,
      trackInventory: true,
    },
    {
      sku: 'SHIRT-001',
      name: 'Polo Shirt Blue',
      description: 'Classic blue polo shirt',
      categoryId: clothingCategory!.id,
      basePrice: 199000,
      costPrice: 100000,
      barcode: '1234567890123',
      isActive: true,
      trackInventory: true,
    },
    {
      sku: 'SHIRT-002',
      name: 'T-Shirt White',
      description: 'Plain white cotton t-shirt',
      categoryId: clothingCategory!.id,
      basePrice: 99000,
      costPrice: 50000,
      barcode: '1234567890124',
      isActive: true,
      trackInventory: true,
    },
    {
      sku: 'SNACK-001',
      name: 'Potato Chips Original',
      description: 'Crispy potato chips',
      categoryId: foodCategory!.id,
      basePrice: 15000,
      costPrice: 8000,
      barcode: '8992761123456',
      isActive: true,
      trackInventory: true,
    },
    {
      sku: 'SNACK-002',
      name: 'Chocolate Bar',
      description: 'Milk chocolate bar',
      categoryId: foodCategory!.id,
      basePrice: 12000,
      costPrice: 7000,
      barcode: '8992761123457',
      isActive: true,
      trackInventory: true,
    },
  ];

  await prisma.product.createMany({ data: products });
  console.log(' Products seeded');
}

async function seedProductVariants() {
  const count = await prisma.productVariant.count();

  if (count > 0) {
    console.log('  Product Variants already seeded');
    return;
  }

  const products = await prisma.product.findMany();

  const phone1 = products.find((p) => p.sku === 'PHONE-001');
  const shirt1 = products.find((p) => p.sku === 'SHIRT-001');

  const variants = [
    {
      productId: phone1!.id,
      name: '128GB',
      type: 'Storage',
      priceAdjustment: 0,
      sku: 'PHONE-001-128',
      isActive: true,
    },
    {
      productId: phone1!.id,
      name: '256GB',
      type: 'Storage',
      priceAdjustment: 2000000,
      sku: 'PHONE-001-256',
      isActive: true,
    },
    {
      productId: shirt1!.id,
      name: 'Small',
      type: 'Size',
      priceAdjustment: 0,
      sku: 'SHIRT-001-S',
      isActive: true,
    },
    {
      productId: shirt1!.id,
      name: 'Medium',
      type: 'Size',
      priceAdjustment: 0,
      sku: 'SHIRT-001-M',
      isActive: true,
    },
    {
      productId: shirt1!.id,
      name: 'Large',
      type: 'Size',
      priceAdjustment: 10000,
      sku: 'SHIRT-001-L',
      isActive: true,
    },
  ];

  await prisma.productVariant.createMany({ data: variants });
  console.log(' Product Variants seeded');
}

async function seedInventory() {
  const count = await prisma.inventory.count();

  if (count > 0) {
    console.log('  Inventory already seeded');
    return;
  }

  const products = await prisma.product.findMany();
  const stores = await prisma.store.findMany();

  const inventory: any[] = [];
  for (const product of products) {
    for (const store of stores) {
      inventory.push({
        productId: product.id,
        storeId: store.id,
        quantity: Math.floor(Math.random() * 100) + 20,
        minimumStock: 10,
        maximumStock: 200,
        averageCost: product.costPrice,
      });
    }
  }

  await prisma.inventory.createMany({ data: inventory });
  console.log('Inventory seeded');
}

async function seedCustomers() {
  const count = await prisma.customer.count();

  if (count > 0) {
    console.log('Customers already seeded');
    return;
  }

  const customers = [
    {
      code: 'CUST-001',
      fullName: 'Ahmad Rizki',
      email: 'ahmad@email.com',
      phone: '081234567801',
      address: 'Jl. Merdeka No. 1, Surabaya',
      birthDate: new Date('1990-05-15'),
      gender: 'Male',
      registeredAt: new Date(),
      isActive: true,
    },
    {
      code: 'CUST-002',
      fullName: 'Siti Nurhaliza',
      email: 'siti@email.com',
      phone: '081234567802',
      address: 'Jl. Pahlawan No. 2, Jakarta',
      birthDate: new Date('1992-08-20'),
      gender: 'Female',
      registeredAt: new Date(),
      isActive: true,
    },
    {
      code: 'CUST-003',
      fullName: 'Budi Santoso',
      email: 'budi@email.com',
      phone: '081234567803',
      address: 'Jl. Sudirman No. 3, Bandung',
      birthDate: new Date('1988-03-10'),
      gender: 'Male',
      registeredAt: new Date(),
      isActive: true,
    },
    {
      code: 'CUST-004',
      fullName: 'Dewi Lestari',
      email: 'dewi@email.com',
      phone: '081234567804',
      address: 'Jl. Veteran No. 4, Surabaya',
      birthDate: new Date('1995-11-25'),
      gender: 'Female',
      registeredAt: new Date(),
      isActive: true,
    },
    {
      code: 'CUST-005',
      fullName: 'Eko Prasetyo',
      email: 'eko@email.com',
      phone: '081234567805',
      address: 'Jl. Diponegoro No. 5, Jakarta',
      birthDate: new Date('1993-07-30'),
      gender: 'Male',
      registeredAt: new Date(),
      isActive: true,
    },
  ];

  await prisma.customer.createMany({ data: customers });
  console.log('Customers seeded');
}

async function seedLoyaltyPoints() {
  const count = await prisma.loyaltyPoint.count();

  if (count > 0) {
    console.log('Loyalty Points already seeded');
    return;
  }

  const customers = await prisma.customer.findMany();

  const loyaltyPoints = customers.map((customer) => ({
    customerId: customer.id,
    balance: Math.floor(Math.random() * 1000),
    lifetimePoints: Math.floor(Math.random() * 5000),
    lastEarned: new Date(),
  }));

  await prisma.loyaltyPoint.createMany({ data: loyaltyPoints });
  console.log('Loyalty Points seeded');
}

async function seedPaymentMethods() {
  const count = await prisma.paymentMethod.count();

  if (count > 0) {
    console.log('Payment Methods already seeded');
    return;
  }

  const paymentMethods = [
    {
      name: 'Cash',
      type: 'cash',
      isActive: true,
      configuration: {},
    },
    {
      name: 'Debit Card',
      type: 'card',
      isActive: true,
      configuration: {
        acceptedCards: ['Visa', 'Mastercard', 'Maestro'],
      },
    },
    {
      name: 'Credit Card',
      type: 'card',
      isActive: true,
      configuration: {
        acceptedCards: ['Visa', 'Mastercard', 'American Express'],
        installmentAvailable: true,
      },
    },
    {
      name: 'QRIS',
      type: 'qr_code',
      isActive: true,
      configuration: {
        provider: 'Bank Indonesia',
      },
    },
    {
      name: 'GoPay',
      type: 'e_wallet',
      isActive: true,
      configuration: {
        provider: 'Gojek',
        merchantId: 'MERCHANT123',
      },
    },
    {
      name: 'OVO',
      type: 'e_wallet',
      isActive: true,
      configuration: {
        provider: 'OVO',
        merchantId: 'MERCHANT456',
      },
    },
  ];

  await prisma.paymentMethod.createMany({ data: paymentMethods });
  console.log('Payment Methods seeded');
}

async function seedTaxes() {
  const count = await prisma.tax.count();

  if (count > 0) {
    console.log('  Taxes already seeded');
    return;
  }

  const taxes = [
    {
      name: 'PPN (VAT)',
      rate: 11.0,
      type: 'percentage',
      isActive: true,
      effectiveFrom: new Date('2024-01-01'),
    },
    {
      name: 'Service Tax',
      rate: 5.0,
      type: 'percentage',
      isActive: false,
      effectiveFrom: new Date('2024-01-01'),
    },
  ];

  await prisma.tax.createMany({ data: taxes });
  console.log('Taxes seeded');
}

async function seedPromotions() {
  const count = await prisma.promotion.count();

  if (count > 0) {
    console.log('  Promotions already seeded');
    return;
  }

  const promotions = [
    {
      code: 'NEWYEAR2024',
      name: 'New Year Sale',
      description: 'Get 20% off on all products',
      discountType: 'percentage',
      discountValue: 20,
      minimumPurchase: 100000,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      isActive: true,
      usageLimit: 1000,
      usageCount: 0,
    },
    {
      code: 'FLASH50',
      name: 'Flash Sale',
      description: 'Rp 50,000 off for purchases above Rp 500,000',
      discountType: 'fixed',
      discountValue: 50000,
      minimumPurchase: 500000,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-02-14'),
      isActive: true,
      usageLimit: 500,
      usageCount: 0,
    },
    {
      code: 'MEMBER10',
      name: 'Member Discount',
      description: '10% discount for members',
      discountType: 'percentage',
      discountValue: 10,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      isActive: true,
      usageCount: 0,
    },
  ];

  await prisma.promotion.createMany({ data: promotions });
  console.log('Promotions seeded');
}

main()
  .then(async () => {
    console.log('All done!');
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error('Error:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
