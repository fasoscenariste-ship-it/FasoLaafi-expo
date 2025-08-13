/**
 * Lightweight, on-device rules mimicking AI personalization.
 * In production you may swap with a tiny model or remote inference.
 */

export type SymptomInput = {
  fever?: boolean;
  headache?: boolean;
  fatigue?: boolean;
  stomach?: boolean;
  durationHours?: number;
};

export type Advice = {
  severity: 'info' | 'watch' | 'urgent';
  title: string;
  points: string[];
  orientation?: 'go_to_clinic' | 'home_care';
};

export function analyzeSymptoms(s: SymptomInput): Advice {
  const points: string[] = [];
  let severity: Advice['severity'] = 'info';
  let orientation: Advice['orientation'] = 'home_care';

  if (s.fever && (s.durationHours ?? 0) >= 48) {
    severity = 'urgent';
    orientation = 'go_to_clinic';
    points.push('Fièvre prolongée : possible paludisme — consultez rapidement.');
  }
  if (s.headache && s.fever) {
    points.push('Buvez de l’eau, reposez-vous à l’ombre, surveillez les frissons.');
  }
  if (s.stomach) {
    points.push('Infusion de gingembre pour la digestion, évitez les aliments gras.');
  }
  if (s.fatigue && !s.fever) {
    points.push('Feuilles de moringa en tisane peuvent aider contre la fatigue.');
  }
  if (points.length === 0) {
    points.push('Repos, hydratation et repas léger. Surveillez l’évolution.');
  }
  return {
    severity,
    title: severity === 'urgent' ? 'Alerte santé' : 'Conseil bien-être',
    points,
    orientation
  };
}

export function hydrationFrequencyPerDay(isHot: boolean): number {
  return isHot ? 8 : 5;
}
