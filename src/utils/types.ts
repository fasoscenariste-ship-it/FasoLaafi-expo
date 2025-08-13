export type EnvironmentType = 'rural' | 'urban';
export type Concern = 'paludisme' | 'stress' | 'hygiène' | 'nutrition';

export type Profile = {
  name: string;
  age: number;
  sex: 'M' | 'F' | 'O';
  environment: EnvironmentType;
  concerns: Concern[];
  language: 'fr' | 'en' | 'wo' | 'bm' | 'ff' | 'yo' | 'fon';
  reminderHours: {
    morning: string; // '07:00'
    midday: string;  // '12:00'
    evening: string; // '20:00'
  };
};
