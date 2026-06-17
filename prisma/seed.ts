import { Role, HazardClass, UnitOfMeasure, TransactionType, POStatus, AlertType, AlertStatus } from '@prisma/client';
import { addDays, subDays } from 'date-fns';
import { db as prisma } from '../lib/db';

// Pre-hashed password for "password123" using bcrypt round 10
const DEFAULT_PASSWORD_HASH = '$2b$10$TOlELoTTqbsMfXTnmkEU/O2IYlu7ryCzr0DTCXr8paHmWoj9DynuO'; 

async function main() {
  console.log('Starting DB seed...');

  // 1. Create Users (1 per role)
  console.log('Creating users...');
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'superadmin@innonsh.com' },
      update: {},
      create: { name: 'Super Admin', email: 'superadmin@innonsh.com', passwordHash: DEFAULT_PASSWORD_HASH, role: Role.SUPER_ADMIN },
    }),
    prisma.user.upsert({
      where: { email: 'admin@innonsh.com' },
      update: {},
      create: { name: 'Admin User', email: 'admin@innonsh.com', passwordHash: DEFAULT_PASSWORD_HASH, role: Role.ADMIN },
    }),
    prisma.user.upsert({
      where: { email: 'manager@innonsh.com' },
      update: {},
      create: { name: 'Lab Manager', email: 'manager@innonsh.com', passwordHash: DEFAULT_PASSWORD_HASH, role: Role.MANAGER },
    }),
  ]);

  // 2. Create Suppliers
  console.log('Creating suppliers...');
  const suppliers = await Promise.all([
    prisma.supplier.create({
      data: { name: 'ChemSupply Inc', contactPerson: 'Alice Smith', email: 'alice@chemsupply.com', phone: '+1234567890', address: '123 Chem Lane', gstNumber: 'GST12345' }
    }),
    prisma.supplier.create({
      data: { name: 'Global Labs', contactPerson: 'Bob Johnson', email: 'bob@globallabs.com', phone: '+0987654321', address: '456 Lab Blvd', gstNumber: 'GST67890' }
    }),
    prisma.supplier.create({
      data: { name: 'SafeChem Distributors', contactPerson: 'Charlie Brown', email: 'charlie@safechem.com', phone: '+1122334455', address: '789 Safe St', gstNumber: 'GST54321' }
    })
  ]);

  // 3. Create Warehouse Locations
  console.log('Creating warehouse locations...');
  const locations = await Promise.all([
    prisma.warehouseLocation.upsert({
      where: { code: 'ZONE-A-FLAM' },
      update: {},
      create: { code: 'ZONE-A-FLAM', zone: 'A', rack: '01', shelf: '01', maxCapacity: 1000, compatibleHazardClasses: [HazardClass.FLAMMABLE] },
    }),
    prisma.warehouseLocation.upsert({
      where: { code: 'ZONE-B-ACID' },
      update: {},
      create: { code: 'ZONE-B-ACID', zone: 'B', rack: '02', shelf: '03', maxCapacity: 500, compatibleHazardClasses: [HazardClass.CORROSIVE, HazardClass.TOXIC] },
    }),
    prisma.warehouseLocation.upsert({
      where: { code: 'ZONE-C-GEN' },
      update: {},
      create: { code: 'ZONE-C-GEN', zone: 'C', rack: '01', shelf: '01', maxCapacity: 2000, compatibleHazardClasses: [HazardClass.NON_HAZARDOUS, HazardClass.OXIDIZER] },
    }),
  ]);

  // 4. Create Chemicals
  console.log('Creating chemicals...');
  const chemicalsData = [
    { name: 'Acetone', casNumber: '67-64-1', category: 'Solvent', hazardClass: HazardClass.FLAMMABLE, unitOfMeasure: UnitOfMeasure.L, reorderLevel: 50, storageCondition: 'Cool, well-ventilated' },
    { name: 'Sulfuric Acid', casNumber: '7664-93-9', category: 'Acid', hazardClass: HazardClass.CORROSIVE, unitOfMeasure: UnitOfMeasure.L, reorderLevel: 20, storageCondition: 'Store away from water and bases' },
    { name: 'Sodium Cyanide', casNumber: '143-33-9', category: 'Salt', hazardClass: HazardClass.TOXIC, unitOfMeasure: UnitOfMeasure.KG, reorderLevel: 5, storageCondition: 'Locked cabinet, dry' },
    { name: 'Hydrogen Peroxide 30%', casNumber: '7722-84-1', category: 'Oxidizer', hazardClass: HazardClass.OXIDIZER, unitOfMeasure: UnitOfMeasure.L, reorderLevel: 15, storageCondition: 'Cool, dark place' },
    { name: 'Picric Acid', casNumber: '88-89-1', category: 'Explosive', hazardClass: HazardClass.EXPLOSIVE, unitOfMeasure: UnitOfMeasure.G, reorderLevel: 500, storageCondition: 'Keep wet with >30% water' },
    { name: 'Nitrogen (Cylinder)', casNumber: '7727-37-9', category: 'Gas', hazardClass: HazardClass.COMPRESSED_GAS, unitOfMeasure: UnitOfMeasure.UNIT, reorderLevel: 10, storageCondition: 'Secure cylinder upright' },
    { name: 'Sodium Chloride', casNumber: '7647-14-5', category: 'Salt', hazardClass: HazardClass.NON_HAZARDOUS, unitOfMeasure: UnitOfMeasure.KG, reorderLevel: 100, storageCondition: 'Dry place' },
    { name: 'Ethanol', casNumber: '64-17-5', category: 'Solvent', hazardClass: HazardClass.FLAMMABLE, unitOfMeasure: UnitOfMeasure.L, reorderLevel: 40, storageCondition: 'Flammable cabinet' },
    { name: 'Hydrochloric Acid', casNumber: '7647-01-0', category: 'Acid', hazardClass: HazardClass.CORROSIVE, unitOfMeasure: UnitOfMeasure.L, reorderLevel: 25, storageCondition: 'Acid cabinet' },
    { name: 'Methanol', casNumber: '67-56-1', category: 'Solvent', hazardClass: HazardClass.TOXIC, unitOfMeasure: UnitOfMeasure.L, reorderLevel: 30, storageCondition: 'Flammable cabinet' },
  ];

  const chemicals = [];
  for (const data of chemicalsData) {
    const chem = await prisma.chemical.create({ data });
    chemicals.push(chem);
  }

  // 5. Create Batches (Mix of expired, expiring soon, and fresh)
  console.log('Creating batches...');
  const today = new Date();
  const batchData = [
    // Expired
    { chemicalId: chemicals[0].id, batchNumber: 'B-ACE-001', manufactureDate: subDays(today, 800), expiryDate: subDays(today, 10), quantityReceived: 100, quantityRemaining: 15, supplierId: suppliers[0].id, warehouseLocationId: locations[0].id, costPerUnit: 15.5 },
    { chemicalId: chemicals[1].id, batchNumber: 'B-SUL-001', manufactureDate: subDays(today, 400), expiryDate: subDays(today, 5), quantityReceived: 50, quantityRemaining: 5, supplierId: suppliers[1].id, warehouseLocationId: locations[1].id, costPerUnit: 25.0 },
    // Expiring Soon (< 30 days)
    { chemicalId: chemicals[2].id, batchNumber: 'B-SOD-001', manufactureDate: subDays(today, 300), expiryDate: addDays(today, 15), quantityReceived: 20, quantityRemaining: 18, supplierId: suppliers[2].id, warehouseLocationId: locations[1].id, costPerUnit: 150.0 },
    { chemicalId: chemicals[3].id, batchNumber: 'B-HYD-001', manufactureDate: subDays(today, 150), expiryDate: addDays(today, 25), quantityReceived: 40, quantityRemaining: 30, supplierId: suppliers[0].id, warehouseLocationId: locations[2].id, costPerUnit: 45.0 },
    // Fresh (> 90 days)
    { chemicalId: chemicals[0].id, batchNumber: 'B-ACE-002', manufactureDate: subDays(today, 30), expiryDate: addDays(today, 700), quantityReceived: 200, quantityRemaining: 200, supplierId: suppliers[0].id, warehouseLocationId: locations[0].id, costPerUnit: 16.0 },
    { chemicalId: chemicals[1].id, batchNumber: 'B-SUL-002', manufactureDate: subDays(today, 10), expiryDate: addDays(today, 355), quantityReceived: 100, quantityRemaining: 100, supplierId: suppliers[1].id, warehouseLocationId: locations[1].id, costPerUnit: 26.5 },
    { chemicalId: chemicals[4].id, batchNumber: 'B-PIC-001', manufactureDate: subDays(today, 50), expiryDate: addDays(today, 300), quantityReceived: 1000, quantityRemaining: 1000, supplierId: suppliers[2].id, warehouseLocationId: locations[0].id, costPerUnit: 5.0 },
    { chemicalId: chemicals[5].id, batchNumber: 'B-NIT-001', manufactureDate: subDays(today, 5), expiryDate: addDays(today, 1000), quantityReceived: 20, quantityRemaining: 20, supplierId: suppliers[1].id, warehouseLocationId: locations[2].id, costPerUnit: 200.0 },
    { chemicalId: chemicals[6].id, batchNumber: 'B-NACL-001', manufactureDate: subDays(today, 100), expiryDate: addDays(today, 1500), quantityReceived: 500, quantityRemaining: 450, supplierId: suppliers[0].id, warehouseLocationId: locations[2].id, costPerUnit: 2.5 },
    { chemicalId: chemicals[7].id, batchNumber: 'B-ETH-001', manufactureDate: subDays(today, 60), expiryDate: addDays(today, 600), quantityReceived: 100, quantityRemaining: 80, supplierId: suppliers[0].id, warehouseLocationId: locations[0].id, costPerUnit: 12.0 },
    { chemicalId: chemicals[8].id, batchNumber: 'B-HCL-001', manufactureDate: subDays(today, 20), expiryDate: addDays(today, 345), quantityReceived: 50, quantityRemaining: 50, supplierId: suppliers[1].id, warehouseLocationId: locations[1].id, costPerUnit: 18.0 },
    { chemicalId: chemicals[9].id, batchNumber: 'B-MET-001', manufactureDate: subDays(today, 40), expiryDate: addDays(today, 400), quantityReceived: 80, quantityRemaining: 75, supplierId: suppliers[2].id, warehouseLocationId: locations[1].id, costPerUnit: 14.5 },
    // Low Stock scenario (Acetone has reorderLevel 50, let's make total remaining < 50 across batches)
    // Actually, Acetone has 15 + 200 = 215 remaining. Let's make a new chemical with low stock.
    { chemicalId: chemicals[7].id, batchNumber: 'B-ETH-002', manufactureDate: subDays(today, 10), expiryDate: addDays(today, 700), quantityReceived: 5, quantityRemaining: 5, supplierId: suppliers[0].id, warehouseLocationId: locations[0].id, costPerUnit: 12.0 }, // Total Ethanol: 80 + 5 = 85 (Reorder: 40, so not low)
  ];

  for (const data of batchData) {
    await prisma.batch.create({ data });
  }

  // 6. Create Initial Transactions
  console.log('Creating transactions...');
  const batches = await prisma.batch.findMany();
  for (const batch of batches) {
    // Stock IN
    await prisma.transaction.create({
      data: {
        batchId: batch.id,
        type: TransactionType.STOCK_IN,
        quantity: batch.quantityReceived,
        performedById: users[1].id, // Admin staff
        reason: 'Initial Receiving',
        timestamp: subDays(today, 5)
      }
    });

    // Stock OUT (if quantityRemaining < quantityReceived)
    if (batch.quantityRemaining < batch.quantityReceived) {
      await prisma.transaction.create({
        data: {
          batchId: batch.id,
          type: TransactionType.STOCK_OUT,
          quantity: batch.quantityReceived - batch.quantityRemaining,
          performedById: users[2].id, // Manager
          reason: 'Lab Usage',
          timestamp: subDays(today, 1)
        }
      });
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
