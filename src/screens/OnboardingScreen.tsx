import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useStore } from '../state/store';
import { Profile } from '../utils/types';
import { useTranslation } from 'react-i18next';

export default function OnboardingScreen({ navigation }: any) {
  const setProfile = useStore(s => s.setProfile);
  const [name, setName] = useState('Ami');
  const [age, setAge] = useState('25');
  const [env, setEnv] = useState<'rural' | 'urban'>('urban');
  const [lang, setLang] = useState<'fr' | 'en' | 'wo' | 'bm' | 'ff' | 'yo' | 'fon'>('fr');
  const { t, i18n } = useTranslation();

  const save = async () => {
    const p: Profile = {
      name,
      age: parseInt(age, 10) || 25,
      sex: 'F',
      environment: env,
      concerns: ['stress', 'hygiène'],
      language: lang,
      reminderHours: { morning: '07:00', midday: '12:00', evening: '20:00' }
    };
    await setProfile(p);
    i18n.changeLanguage(lang);
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('welcome')}</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Nom" placeholderTextColor="#9ca3af" style={styles.input} />
      <TextInput value={age} onChangeText={setAge} placeholder="Âge" keyboardType="number-pad" placeholderTextColor="#9ca3af" style={styles.input} />
      <View style={styles.row}>
        <TouchableOpacity onPress={() => setEnv('urban')} style={[styles.pill, env==='urban'&&styles.pillOn]}><Text style={styles.pillText}>Urbain</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setEnv('rural')} style={[styles.pill, env==='rural'&&styles.pillOn]}><Text style={styles.pillText}>Rural</Text></TouchableOpacity>
      </View>
      <Text style={styles.label}>{t('choose_language')}</Text>
      <View style={styles.rowWrap}>
        {(['fr','en','wo','bm','ff','yo','fon'] as const).map(code => (
          <TouchableOpacity key={code} onPress={() => setLang(code)} style={[styles.pill, lang===code&&styles.pillOn]}>
            <Text style={styles.pillText}>{code.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={save} style={styles.btn}><Text style={styles.btnText}>{t('start')}</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', marginTop: 24 },
  input: { backgroundColor: '#111827', color: '#fff', padding: 12, borderRadius: 12 },
  label: { color: '#9ca3af', marginTop: 8 },
  row: { flexDirection: 'row', gap: 8 },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#111827' },
  pillOn: { backgroundColor: '#16a34a' },
  pillText: { color: '#fff' },
  btn: { marginTop: 18, backgroundColor: '#16a34a', padding: 14, borderRadius: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' }
});
