import { analyzeSymptoms, hydrationFrequencyPerDay } from '../services/ai';

describe('AI rules', () => {
  test('urgent when fever >= 48h', () => {
    const res = analyzeSymptoms({ fever: true, durationHours: 48 });
    expect(res.severity).toBe('urgent');
    expect(res.orientation).toBe('go_to_clinic');
  });

  test('hydration frequency hot vs normal', () => {
    expect(hydrationFrequencyPerDay(true)).toBeGreaterThan(hydrationFrequencyPerDay(false));
  });
});
