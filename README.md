# Faso Laafi – Expo (React Native + TypeScript)

**Slogan**: « Bien-être africain, au rythme de ton quotidien »

MVP prêt à compiler : rappels santé intelligents, conseils traditionnels+modernes, boost du matin, méditation du soir (TTS), communauté locale (offline-first), i18n FR + langues régionales, mode hors ligne par défaut.

## Installation

1. Installe Node 18+ et Expo CLI.
2. Décompresse le projet puis :
   ```bash
   npm install
   npm run start
   ```
3. Pour Android (recommandé) :
   ```bash
   npm run android
   ```

> Remarques :
> - Les notifications locales utilisent `expo-notifications`. Sur Android 13+, accepte la permission lors du premier lancement.
> - La météo utilise Open-Meteo (sans clé). Si hors-ligne ou sans permission, rappels par défaut.
> - La synthèse vocale (TTS) fonctionne hors-ligne selon le moteur du téléphone (via `expo-speech`).

## Structure

- `src/services/ai.ts` : règles « IA légère » (symptômes → conseils, adaptation hydratation à la chaleur).
- `src/services/reminders.ts` : planification quotidienne (hydratation, hygiène, boost, méditation).
- `src/services/content/*.json` : remèdes, exercices, méditations (datasets offline).
- `src/screens/*` : écrans principaux.
- `src/i18n/*` : localisation (FR + langues locales de base).
- `src/state/store.ts` : état global (Zustand).
- `src/services/weather.ts` : météo simple avec fallback.

## Tests

```bash
npm test
```

## À brancher ensuite (interfaces prêtes)

- **STT (reconnaissance vocale)** : ajouter `react-native-voice` (EAS Build) ou passer côté serveur.
- **Wearables** : pont Google Fit/Health Connect → recommandé via plugin Expo.
- **Mobile Money** : créer un écran produit et brancher les SDK/URLs Orange Money & MTN MoMo (sandbox) avec un backend.
- **Modèles IA** : remplacer les règles par un modèle tiny (on-device) ou API, avec cache offline.

## Licence

MIT
