import { HazardClass } from '@prisma/client';

export class HazardCompatibilityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HazardCompatibilityError';
  }
}

/**
 * Validates if a given hazard class can be stored in a specific warehouse location.
 *
 * @param chemicalHazardClass The hazard class of the chemical to be stored
 * @param locationCompatibleClasses The array of compatible hazard classes for the target location
 * @throws HazardCompatibilityError if the chemical is not compatible with the location
 * @returns true if compatible
 */
export function validateHazardCompatibility(
  chemicalHazardClass: HazardClass,
  locationCompatibleClasses: string[]
): boolean {
  if (!locationCompatibleClasses.includes(chemicalHazardClass)) {
    throw new HazardCompatibilityError(
      `Cannot store ${chemicalHazardClass} in a location that only supports: ${locationCompatibleClasses.join(', ')}.`
    );
  }

  return true;
}
