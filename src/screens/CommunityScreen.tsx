import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { addPost, getFeed, FeedPost } from '../services/storage';

export default function CommunityScreen() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [text, setText] = useState('');

  const load = async () => setPosts(await getFeed());
  useEffect(() => { load(); }, []);

  const send = async () => {
    if (!text.trim()) return;
    const p: FeedPost = {
      id: String(Date.now()),
      author: 'Moi',
      region: 'Cercle Ouaga',
      text: text.trim(),
      createdAt: Date.now(),
      likes: 0
    };
    await addPost(p);
    setText('');
    await load();
  };

  return (
    <View style={styles.container}>
      <View style={styles.composer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Partage ton astuce santé..."
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
        <TouchableOpacity onPress={send} style={styles.btn}><Text style={styles.btnText}>Publier</Text></TouchableOpacity>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(it)=>it.id}
        renderItem={({item})=> (
          <View style={styles.post}>
            <Text style={styles.author}>{item.author} • {item.region}</Text>
            <Text style={styles.body}>{item.text}</Text>
            <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
        ItemSeparatorComponent={()=> <View style={{height:8}}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12 },
  composer: { flexDirection: 'row', gap: 8 },
  input: { flex:1, backgroundColor:'#111827', color:'#fff', padding: 12, borderRadius: 12 },
  btn: { backgroundColor:'#16a34a', padding: 12, borderRadius:12, justifyContent:'center' },
  btnText: { color:'#fff', fontWeight:'700' },
  post: { backgroundColor:'#111827', padding: 12, borderRadius: 12 },
  author: { color:'#9ca3af' },
  body: { color:'#e5e7eb', marginTop: 4 },
  time: { color:'#6b7280', marginTop: 6, fontSize: 12 }
});
