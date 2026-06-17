import { db } from './db';
import { Batch } from '@prisma/client';

/**
 * Returns batches sorted by First-Expiry-First-Out (FEFO) logic.
 * It fetches all batches for a specific chemical that have quantityRemaining > 0,
 * and sorts them ascending by expiryDate.
 *
 * @param chemicalId The ID of the chemical
 * @param requiredQuantity The total quantity needed (optional, for validation or limiting)
 * @returns An array of batches ordered by nearest expiry date first
 */
export async function getBatchesFEFO(chemicalId: string, requiredQuantity?: number): Promise<Batch[]> {
  const batches = await db.batch.findMany({
    where: {
      chemicalId,
      quantityRemaining: {
        gt: 0,
      },
    },
    orderBy: {
      expiryDate: 'asc',
    },
  });

  if (requiredQuantity) {
    const totalAvailable = batches.reduce((sum, batch) => sum + batch.quantityRemaining, 0);
    if (totalAvailable < requiredQuantity) {
      throw new Error(`Insufficient stock. Required: ${requiredQuantity}, Available: ${totalAvailable}`);
    }
  }

  return batches;
}

/**
 * Calculates the exact quantity to deduct from each batch based on FEFO
 * to satisfy a required total quantity.
 *
 * @param chemicalId The ID of the chemical
 * @param requiredQuantity The total quantity needed
 * @returns Array of deductions: { batchId, quantityToDeduct }
 */
export async function calculateFEFODeductions(chemicalId: string, requiredQuantity: number) {
  const batches = await getBatchesFEFO(chemicalId, requiredQuantity);
  
  const deductions: { batchId: string; quantityToDeduct: number }[] = [];
  let remainingNeeded = requiredQuantity;

  for (const batch of batches) {
    if (remainingNeeded <= 0) break;

    const quantityToTake = Math.min(batch.quantityRemaining, remainingNeeded);
    deductions.push({
      batchId: batch.id,
      quantityToDeduct: quantityToTake,
    });

    remainingNeeded -= quantityToTake;
  }

  return deductions;
}
