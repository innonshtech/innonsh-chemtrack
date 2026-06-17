import { AlertType, AlertStatus } from '@prisma/client';
import { subDays, subHours, subMinutes } from 'date-fns';
import { db as prisma } from '../lib/db';

async function main() {
  console.log('Starting Alert seed...');

  const chemicals = await prisma.chemical.findMany();
  const batches = await prisma.batch.findMany();

  if (chemicals.length === 0 || batches.length === 0) {
    console.log('Missing prerequisite data. Please run the main seed script first.');
    return;
  }

  const today = new Date();

  const alertData = [
    {
      type: AlertType.HAZARD_VIOLATION,
      status: AlertStatus.ACTIVE,
      chemicalId: chemicals[0].id, // Acetone
      batchId: batches[0].id,
      message: 'FLAMMABLE material (Acetone) detected in Zone B which is rated only for CORROSIVE/TOXIC. Immediate relocation required.',
      createdAt: subMinutes(today, 15)
    },
    {
      type: AlertType.EXPIRED,
      status: AlertStatus.ACTIVE,
      chemicalId: chemicals[1].id, // Sulfuric Acid
      batchId: batches[1].id,
      message: 'Batch B-SUL-001 has passed its expiration date. Quarantine and schedule for safe disposal.',
      createdAt: subDays(today, 2)
    },
    {
      type: AlertType.LOW_STOCK,
      status: AlertStatus.ACTIVE,
      chemicalId: chemicals[2].id, // Sodium Cyanide
      message: 'Sodium Cyanide stock (18 KG) has fallen near critical reorder level (5 KG). Review upcoming allocations.',
      createdAt: subHours(today, 5)
    },
    {
      type: AlertType.EXPIRY_WARNING,
      status: AlertStatus.ACTIVE,
      chemicalId: chemicals[3].id, // Hydrogen Peroxide
      batchId: batches[3].id,
      message: 'Batch B-HYD-001 will expire in 25 days. Ensure FEFO compliance for upcoming usage.',
      createdAt: subDays(today, 1)
    },
    {
      type: AlertType.HAZARD_VIOLATION,
      status: AlertStatus.RESOLVED,
      chemicalId: chemicals[4].id, // Picric Acid
      batchId: batches[6].id,
      message: 'Secondary containment missing for explosive material. Resolved by Lab Manager.',
      createdAt: subDays(today, 5)
    },
    {
      type: AlertType.LOW_STOCK,
      status: AlertStatus.DISMISSED,
      chemicalId: chemicals[7].id, // Ethanol
      message: 'Ethanol stock dropping. Dismissed: Replenishment already inbound on PO-9A8B7C.',
      createdAt: subDays(today, 8)
    }
  ];

  for (const data of alertData) {
    await prisma.alert.create({ data });
  }

  console.log('Alert Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
