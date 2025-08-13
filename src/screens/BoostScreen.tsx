import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import exercises from '../services/content/exercises.json';

export default function BoostScreen() {
  const [sec, setSec] = useState(0);
  const ex = exercises.items[0];

  useEffect(() => {
    let timer: any;
    if (sec > 0) {
      timer = setTimeout(() => setSec(sec - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [sec]);

  const start = () => setSec(ex.durationMin * 60);

  const mins = Math.floor(sec / 60);
  const rem = sec % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ex.name}</Text>
      <Text style={styles.text}>{ex.about}</Text>
      <Text style={styles.timer}>{mins}:{rem.toString().padStart(2,'0')}</Text>
      <TouchableOpacity onPress={start} style={styles.btn}><Text style={styles.btnText}>Lancer</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, alignItems: 'center', justifyContent: 'center', gap: 12 },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  text: { color: '#e5e7eb', textAlign: 'center' },
  timer: { color: '#10b981', fontSize: 48, fontWeight: '800', letterSpacing: 2 },
  btn: { backgroundColor: '#16a34a', padding: 12, borderRadius: 12 },
  btnText: { color: '#fff', fontWeight: '700' }
});
