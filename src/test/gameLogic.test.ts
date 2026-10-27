import { describe, it, expect } from 'vitest';
import { ScoreSchema, ProgressSchema } from '../../server/src/validation/schemas';

describe('Mini-Game Logic & Schema Validation', () => {
  it('should validate valid game scores', () => {
    const valid = ScoreSchema.safeParse({ gameType: 'catch-hearts', score: 18 });
    expect(valid.success).toBe(true);
  });

  it('should reject negative scores', () => {
    const invalid = ScoreSchema.safeParse({ gameType: 'catch-hearts', score: -5 });
    expect(invalid.success).toBe(false);
  });

  it('should reject missing or empty gameType', () => {
    const invalid = ScoreSchema.safeParse({ gameType: '', score: 10 });
    expect(invalid.success).toBe(false);
  });

  it('should accept progress updates', () => {
    const valid = ProgressSchema.safeParse({ completed: true });
    expect(valid.success).toBe(true);
  });
});
