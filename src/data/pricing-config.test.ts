import { describe, it, expect } from 'vitest';
import { getDeliveryPricing, JABODETABEK_CITIES } from './pricing-config';

describe('pricing-config', () => {
    describe('getDeliveryPricing', () => {
        it('should return jabodetabek pricing for Jabodetabek cities', () => {
            const city = JABODETABEK_CITIES[0];
            const pricing = getDeliveryPricing(city, 'MOTOR');
            expect(pricing.express).toBe(34900);
            expect(pricing.reguler).toBe(24900);
        });

        it('should return default pricing for non-Jabodetabek cities', () => {
            const pricing = getDeliveryPricing('Bandung', 'MOTOR');
            expect(pricing.express).toBe(29900);
            expect(pricing.reguler).toBe(19900);
        });

        it('should handle case-insensitive vehicle types', () => {
            const pricing = getDeliveryPricing('Jakarta', 'motor');
            expect(pricing.express).toBe(29900);
        });

        it('should fallback to MOTOR for unknown vehicle types', () => {
            const pricing = getDeliveryPricing('Jakarta', 'SPESIAL');
            expect(pricing.express).toBe(29900);
        });

        it('should return MOBIL pricing correctly for default region', () => {
            const pricing = getDeliveryPricing('Jakarta', 'MOBIL');
            expect(pricing.express).toBe(59900);
            expect(pricing.reguler).toBe(49900);
        });

        it('should return MOBIL pricing correctly for Jabodetabek region', () => {
            const pricing = getDeliveryPricing(JABODETABEK_CITIES[1], 'MOBIL');
            expect(pricing.express).toBe(69900);
            expect(pricing.reguler).toBe(59900);
        });
    });
});
