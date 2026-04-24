import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  RefreshControl 
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchBooks = async () => {
    try {
      setError(false);
      const response = await fetch('https://openlibrary.org/search.json?q=fiction&limit=10');
      const json = await response.json();
      setBooks(json.docs);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Memuat Data Buku...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Gagal memuat data. Periksa internet!</Text>
        <TouchableOpacity style={styles.button} onPress={fetchBooks}>
          <Text style={styles.buttonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.bookItem} 
            onPress={() => navigation.navigate('DetailScreen', { book: item })}
          >
            <Image 
              source={{ 
                uri: item.cover_i 
                  ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` 
                  : 'https://via.placeholder.com/150' 
              }} 
              style={styles.cover} 
            />
            <View style={styles.info}>
              <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.author}>
                {item.author_name ? item.author_name[0] : 'Unknown Author'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listPadding: { paddingTop: 10, paddingBottom: 20 },
  bookItem: { 
    flexDirection: 'row', 
    marginHorizontal: 15,
    marginBottom: 12, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 12, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cover: { width: 60, height: 90, borderRadius: 6 },
  info: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  bookTitle: { fontWeight: 'bold', fontSize: 16, color: '#2C3E50' },
  author: { fontSize: 14, color: '#7F8C8D', marginTop: 4 },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});