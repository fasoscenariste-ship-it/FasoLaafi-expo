import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { analyzeSymptoms, SymptomInput } from '../services/ai';
import remediesData from '../services/content/remedies.json';

export default function AdviceScreen() {
  const [sym, setSym] = useState<SymptomInput>({});
  const [result, setResult] = useState<any>(null);

  const run = () => setResult(analyzeSymptoms(sym));

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Décris tes symptômes</Text>
      <Row label="Fièvre" value={!!sym.fever} onValueChange={(v: boolean) => setSym(s => ({ ...s, fever: v }))} />
      <Row label="Mal de tête" value={!!sym.headache} onValueChange={(v: boolean) => setSym(s => ({ ...s, headache: v }))} />
      <Row label="Fatigue" value={!!sym.fatigue} onValueChange={(v: boolean) => setSym(s => ({ ...s, fatigue: v }))} />
      <Row label="Estomac / digestion" value={!!sym.stomach} onValueChange={(v: boolean) => setSym(s => ({ ...s, stomach: v }))} />
      <View style={styles.row}>
        <Text style={styles.label}>Durée (heures)</Text>
        <TextInput placeholder="ex: 24" placeholderTextColor="#9ca3af" keyboardType="number-pad" style={styles.input}
          onChangeText={(txt)=> setSym(s => ({ ...s, durationHours: parseInt(txt||'0',10) }))} />
      </View>
      <TouchableOpacity onPress={run} style={styles.btn}><Text style={styles.btnText}>Obtenir des conseils</Text></TouchableOpacity>

      {result && (
        <View style={styles.panel}>
          <Text style={[styles.resTitle, result.severity==='urgent' && { color: '#ef4444' }]}>{result.title}</Text>
          {result.points.map((p: string, i: number) => <Text key={i} style={styles.point}>• {p}</Text>)}
          {result.orientation === 'go_to_clinic' && <Text style={styles.warning}>Si les symptômes persistent, rendez-vous au centre de santé le plus proche.</Text>}
          <Text style={styles.subtitle}>Remèdes traditionnels suggérés</Text>
          {remediesData.items.slice(0,3).map(item => (
            <View key={item.id} style={{ marginBottom: 8 }}>
              <Text style={styles.remedyName}>{item.name}</Text>
              <Text style={styles.remedyDetail}>Usage: {item.uses.join(', ')}</Text>
              <Text style={styles.remedyDetail}>Préparation: {item.howto}</Text>
              <Text style={styles.remedyDetail}>Culture: {item.culture}</Text>
              <Text style={styles.remedyCaution}>Précaution: {item.caution}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function Row({ label, value, onValueChange }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#9ca3af' },
  input: { backgroundColor: '#111827', color: '#fff', padding: 10, borderRadius: 10, width: 120, textAlign: 'center' },
  btn: { backgroundColor: '#16a34a', padding: 12, borderRadius: 12, alignItems: 'center', marginVertical: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
  panel: { backgroundColor: '#111827', padding: 12, borderRadius: 12, marginTop: 8 },
  resTitle: { color: '#f3f4f6', fontSize: 16, fontWeight: '700', marginBottom: 6 },
  point: { color: '#e5e7eb', marginBottom: 4 },
  warning: { color: '#fde68a', marginTop: 8 },
  subtitle: { color: '#9ca3af', marginTop: 12, fontWeight: '700' },
  remedyName: { color: '#10b981', fontWeight: '700' },
  remedyDetail: { color: '#e5e7eb' },
  remedyCaution: { color: '#fca5a5' }
});
