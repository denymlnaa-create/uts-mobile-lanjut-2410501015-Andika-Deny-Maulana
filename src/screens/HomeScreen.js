import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, 
  StyleSheet, 
  RefreshControl,
  ScrollView 
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [trending, setTrending] = useState([]);
  const [subjectBooks, setSubjectBooks] = useState([]);
  const [activeSubject, setActiveSubject] = useState('fiction');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
      setLoading(true);
      setError(false);
      const [resTrending, resSubject] = await Promise.all([
        fetch('https://openlibrary.org/trending/daily.json?limit=10', { signal: controller.signal }),
        fetch(`https://openlibrary.org/subjects/${activeSubject}.json?limit=15`, { signal: controller.signal })
      ]);
      
      const dataTrending = await resTrending.json();
      const dataSubject = await resSubject.json();
      
      clearTimeout(timeoutId);

      const normalizedTrending = dataTrending.works.map(book => ({
        ...book,
        author_name: book.author_name || ['Anonim'],
        cover_i: book.cover_i
      }));

      const normalizedSubject = dataSubject.works.map(book => ({
        ...book,
        author_name: book.authors ? [book.authors[0].name] : ['Anonim'],
        cover_i: book.cover_id
      }));
      setTrending(normalizedTrending);
      setSubjectBooks(normalizedSubject);
    } catch (err) {
      console.log("Error fetching data:",err.name);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeSubject]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Gagal memuat data.</Text>
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.buttonText}>Coba Lagi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.header}>Trending </Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={trending}
          keyExtractor={(item) => `trending-${item.key}`}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.trendingCard}
              onPress={() => navigation.navigate('DetailScreen', { book: item })}
            >
              <Image 
                source={{ uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` }} 
                style={styles.trendingCover} 
              />
              <Text style={styles.trendingTitle} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          )}
          style={styles.horizontalList}
        />

        <Text style={styles.header}>Genres</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipRow}>
          {['Fiction', 'History', 'Romance', 'Science', 'Mystery'].map((s) => (
            <TouchableOpacity 
              key={s} 
              style={[styles.chip, activeSubject === s.toLowerCase() && styles.activeChip]} 
              onPress={() => setActiveSubject(s.toLowerCase())}
            >
              <Text style={[styles.chipTxt, activeSubject === s.toLowerCase() && styles.activeChipTxt]}>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.verticalList}>
          {subjectBooks.map((item) => (
            <TouchableOpacity 
              key={item.key} 
              style={styles.bookItem} 
              onPress={() => navigation.navigate('DetailScreen', { book: item })}
            >
              <Image 
                source={{ uri: `https://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg` }} 
                style={styles.cover} 
              />
              <View style={styles.info}>
                <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.author}>{item.authors?.[0]?.name || 'Anonim'}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 18, fontWeight: 'bold', margin: 15, color: '#2C3E50' },
  horizontalList: { paddingLeft: 15, marginBottom: 10 },
  trendingCard: { marginRight: 15, width: 100 },
  trendingCover: { width: 100, height: 150, borderRadius: 8 },
  trendingTitle: { fontSize: 12, marginTop: 5, fontWeight: '500' },
  chipRow: { paddingLeft: 15, marginBottom: 15 },
  chip: { paddingHorizontal: 15, paddingVertical: 8, backgroundColor: '#ddd', borderRadius: 20, marginRight: 10 },
  activeChip: { backgroundColor: '#4CAF50' },
  chipTxt: { fontSize: 13, color: '#333' },
  activeChipTxt: { color: '#fff', fontWeight: 'bold' },
  verticalList: { paddingHorizontal: 15 },
  bookItem: { flexDirection: 'row', marginBottom: 12, backgroundColor: '#fff', borderRadius: 10, padding: 12, elevation: 2 },
  cover: { width: 50, height: 75, borderRadius: 4 },
  info: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  bookTitle: { fontWeight: 'bold', fontSize: 15 },
  author: { fontSize: 13, color: '#7F8C8D', marginTop: 4 },
  button: { marginTop: 20, backgroundColor: '#4CAF50', padding: 10, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});