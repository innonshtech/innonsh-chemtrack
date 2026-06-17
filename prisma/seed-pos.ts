import { Role, HazardClass, UnitOfMeasure, TransactionType, POStatus, AlertType, AlertStatus } from '@prisma/client';
import { addDays, subDays } from 'date-fns';
import { db as prisma } from '../lib/db';

async function main() {
  console.log('Starting PO seed...');

  const users = await prisma.user.findMany();
  const suppliers = await prisma.supplier.findMany();
  const chemicals = await prisma.chemical.findMany();

  if (users.length === 0 || suppliers.length === 0 || chemicals.length === 0) {
    console.log('Missing prerequisite data. Please run the main seed script first.');
    return;
  }

  const today = new Date();

  const poData = [
    {
      supplierId: suppliers[0].id,
      status: POStatus.RECEIVED,
      expectedDelivery: subDays(today, 10),
      createdById: users[1].id,
      createdAt: subDays(today, 20),
      items: [
        { chemicalId: chemicals[0].id, quantity: 200, unitPrice: 15.0 }, // Acetone
        { chemicalId: chemicals[7].id, quantity: 100, unitPrice: 12.0 }  // Ethanol
      ]
    },
    {
      supplierId: suppliers[1].id,
      status: POStatus.ORDERED,
      expectedDelivery: addDays(today, 5),
      createdById: users[2].id,
      createdAt: subDays(today, 2),
      items: [
        { chemicalId: chemicals[1].id, quantity: 50, unitPrice: 26.0 }, // Sulfuric Acid
        { chemicalId: chemicals[8].id, quantity: 50, unitPrice: 18.5 }  // HCl
      ]
    },
    {
      supplierId: suppliers[2].id,
      status: POStatus.PENDING_APPROVAL,
      expectedDelivery: addDays(today, 15),
      createdById: users[2].id,
      createdAt: subDays(today, 1),
      items: [
        { chemicalId: chemicals[2].id, quantity: 10, unitPrice: 160.0 }, // Sodium Cyanide
        { chemicalId: chemicals[4].id, quantity: 1000, unitPrice: 5.5 }  // Picric Acid
      ]
    },
    {
      supplierId: suppliers[0].id,
      status: POStatus.DRAFT,
      expectedDelivery: addDays(today, 30),
      createdById: users[2].id,
      createdAt: today,
      items: [
        { chemicalId: chemicals[6].id, quantity: 500, unitPrice: 2.5 } // Sodium Chloride
      ]
    },
    {
      supplierId: suppliers[1].id,
      status: POStatus.CANCELLED,
      expectedDelivery: subDays(today, 5),
      createdById: users[1].id,
      createdAt: subDays(today, 15),
      items: [
        { chemicalId: chemicals[5].id, quantity: 5, unitPrice: 210.0 } // Nitrogen
      ]
    }
  ];

  for (const data of poData) {
    const totalAmount = data.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    await prisma.purchaseOrder.create({
      data: {
        supplierId: data.supplierId,
        status: data.status,
        totalAmount,
        expectedDelivery: data.expectedDelivery,
        createdById: data.createdById,
        createdAt: data.createdAt,
        items: {
          create: data.items
        }
      }
    });
  }

  console.log('PO Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
