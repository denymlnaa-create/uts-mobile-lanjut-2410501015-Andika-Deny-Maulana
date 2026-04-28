import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { AppContext } from '../context/Context'; 

export default function FavoriteScreen() {
  const { state, dispatch } = useContext(AppContext);

  const handleRemove = (key) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: key });
  };

  if (state.favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Belum ada buku favorit.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.favorites}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ 
                uri: item.cover_i 
                  ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
                  : `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`
              }}
              style={styles.cover}
            />
            <View style={styles.info}>
              <View>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.author}>{item.author_name?.[0] || 'Unknown Author'}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.removeBtn} 
                onPress={() => handleRemove(item.key)}
              >
                <Text style={styles.removeBtnText}>Hapus dari Favorit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, padding: 12, elevation: 3 },
  cover: { width: 60, height: 90, borderRadius: 6, backgroundColor: '#eee' },
  info: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
  title: { fontSize: 15, fontWeight: 'bold', color: '#2C3E50' },
  author: { fontSize: 13, color: '#7F8C8D' },
  removeBtn: { alignSelf: 'flex-start', paddingVertical: 4 },
  removeBtnText: { color: '#E91E63', fontWeight: '600', fontSize: 12 }
});