import * as Speech from 'expo-speech';

export function speak(text: string, lang: string = 'fr-FR') {
  Speech.stop();
  Speech.speak(text, { language: lang, pitch: 1.0 });
}

export function stopSpeak() {
  Speech.stop();
}
