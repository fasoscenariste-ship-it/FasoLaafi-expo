import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useProfile, useStore } from '../state/store';
import { scheduleDailyCoreReminders } from '../services/reminders';

export default function RemindersScreen() {
  const profile = useProfile();
  const setProfile = useStore(s => s.setProfile);
  const [morning, setMorning] = useState(profile?.reminderHours.morning ?? '07:00');
  const [midday, setMidday] = useState(profile?.reminderHours.midday ?? '12:00');
  const [evening, setEvening] = useState(profile?.reminderHours.evening ?? '20:00');

  const save = async () => {
    if (!profile) return;
    const updated = { ...profile, reminderHours: { morning, midday, evening } };
    await setProfile(updated);
    await scheduleDailyCoreReminders(updated);
    Alert.alert('OK', 'Rappels mis à jour');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heures des rappels</Text>
      <LabeledTime label="Matin" value={morning} onChange={setMorning} />
      <LabeledTime label="Midi" value={midday} onChange={setMidday} />
      <LabeledTime label="Soir" value={evening} onChange={setEvening} />
      <TouchableOpacity onPress={save} style={styles.btn}><Text style={styles.btnText}>Enregistrer</Text></TouchableOpacity>
    </View>
  );
}

function LabeledTime({ label, value, onChange }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} onChangeText={onChange} style={styles.input} placeholder="HH:MM" placeholderTextColor="#9ca3af" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  label: { color: '#9ca3af' },
  input: { backgroundColor: '#111827', color: '#fff', padding: 10, borderRadius: 10, width: 120, textAlign: 'center' },
  btn: { marginTop: 16, backgroundColor: '#16a34a', padding: 14, borderRadius: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' }
});
