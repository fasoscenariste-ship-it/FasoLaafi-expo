import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useProfile, useStore } from '../state/store';
import i18n from '../i18n/i18n';

export default function SettingsScreen() {
  const profile = useProfile();
  const setProfile = useStore(s => s.setProfile);

  const setLang = async (lng: any) => {
    if (!profile) return;
    await setProfile({ ...profile, language: lng });
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Langue</Text>
      <View style={styles.row}>
        {(['fr','en','wo','bm','ff','yo','fon'] as const).map(code => (
          <TouchableOpacity key={code} onPress={()=>setLang(code)} style={[styles.pill, profile?.language===code && styles.pillOn]}>
            <Text style={styles.pillText}>{code.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sub}>Mode hors ligne</Text>
      <Text style={styles.help}>Les contenus clés (remèdes, exercices, méditations) sont inclus dans l’application et fonctionnent sans connexion. La météo et la géolocalisation adaptent les rappels si disponibles.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, gap: 12 },
  title: { color:'#fff', fontSize: 18, fontWeight:'700' },
  row: { flexDirection:'row', flexWrap:'wrap', gap: 8 },
  pill: { paddingVertical:10, paddingHorizontal:14, borderRadius:999, backgroundColor:'#111827' },
  pillOn: { backgroundColor:'#16a34a' },
  pillText: { color:'#fff' },
  sub: { color:'#9ca3af', marginTop: 16, fontWeight:'700' },
  help: { color:'#e5e7eb' }
});
