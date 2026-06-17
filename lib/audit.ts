import { db } from './db';
import { Prisma } from '@prisma/client';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';

interface AuditLogOptions {
  userId: string;
  action: AuditAction;
  entityType: string;
  entityId: string;
  oldValue?: any;
  newValue?: any;
  prismaClient?: Prisma.TransactionClient; // allow passing transaction client
}

/**
 * Wraps an operation with automatic audit logging.
 *
 * @param options Details for the audit log entry
 * @param operation The database operation to execute
 * @returns The result of the operation
 */
export async function withAuditLog<T>(
  options: Omit<AuditLogOptions, 'prismaClient'>,
  operation: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  return await db.$transaction(async (tx) => {
    // 1. Execute the main operation
    const result = await operation(tx);

    // 2. Create the audit log entry in the same transaction
    await tx.auditLog.create({
      data: {
        userId: options.userId,
        action: options.action,
        entityType: options.entityType,
        entityId: options.entityId,
        oldValue: options.oldValue ? JSON.parse(JSON.stringify(options.oldValue)) : null,
        newValue: options.newValue ? JSON.parse(JSON.stringify(options.newValue)) : null,
      },
    });

    return result;
  });
}

/**
 * Creates an audit log entry independently (useful when not wrapping a mutation in a transaction).
 */
export async function createAuditLog(options: AuditLogOptions) {
  const client = options.prismaClient || db;
  return await client.auditLog.create({
    data: {
      userId: options.userId,
      action: options.action,
      entityType: options.entityType,
      entityId: options.entityId,
      oldValue: options.oldValue ? JSON.parse(JSON.stringify(options.oldValue)) : null,
      newValue: options.newValue ? JSON.parse(JSON.stringify(options.newValue)) : null,
    },
  });
}
