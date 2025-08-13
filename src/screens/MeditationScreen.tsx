import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { speak, stopSpeak } from '../services/tts';
import meditations from '../services/content/meditations.json';

export default function MeditationScreen() {
  const med = meditations.items[0];
  const [playing, setPlaying] = useState(false);

  const start = () => { speak(med.text); setPlaying(true); };
  const stop = () => { stopSpeak(); setPlaying(false); };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{med.title}</Text>
      <Text style={styles.text}>{med.text}</Text>
      {!playing ? (
        <TouchableOpacity onPress={start} style={styles.btn}><Text style={styles.btnText}>Écouter</Text></TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={stop} style={[styles.btn, { backgroundColor: '#ef4444' }]}><Text style={styles.btnText}>Arrêter</Text></TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, gap: 12 },
  title: { color:'#fff', fontSize: 20, fontWeight: '700' },
  text: { color:'#e5e7eb' },
  btn: { backgroundColor: '#16a34a', padding: 12, borderRadius: 12, alignItems: 'center' },
  btnText: { color:'#fff', fontWeight: '700' }
});
