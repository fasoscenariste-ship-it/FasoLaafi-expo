import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useProfile } from '../state/store';
import { useTranslation } from 'react-i18next';

export default function HomeScreen({ navigation }: any) {
  const profile = useProfile();
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>{t('home_title')}{profile?.name ? `, ${profile.name}` : ''}</Text>
      <View style={styles.grid}>
        <Card title={t('reminders')} onPress={() => navigation.navigate('Reminders')} />
        <Card title={t('advice')} onPress={() => navigation.navigate('Advice')} />
        <Card title={t('boost')} onPress={() => navigation.navigate('Boost')} />
        <Card title={t('meditation')} onPress={() => navigation.navigate('Meditation')} />
        <Card title={t('community')} onPress={() => navigation.navigate('Community')} />
        <Card title={t('settings')} onPress={() => navigation.navigate('Settings')} />
      </View>
    </ScrollView>
  );
}

function Card({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { color: '#fff', fontSize: 22, fontWeight: '700', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { width: '48%', backgroundColor: '#111827', padding: 16, borderRadius: 16, height: 100, justifyContent: 'flex-end' },
  cardText: { color: '#fff', fontWeight: '700' }
});
