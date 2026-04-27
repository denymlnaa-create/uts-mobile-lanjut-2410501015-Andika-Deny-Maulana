import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchBooks = () => {
    if (query.trim() === '') {
      setError('Kolom pencarian tidak boleh kosong');
      return;
    }
    
    if (query.length < 3) {
      setError('Minimal pencarian adalah 3 karakter');
      return;
    }

    setError('');
    setLoading(true);
    fetch(`https://openlibrary.org/search.json?q=${query}`)
      .then((res) => res.json())
      .then((json) => {
        setResults(json.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('DetailScreen', { book: item })}
    >
      <Image 
        source={{ 
          uri: item.cover_i 
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg` 
            : 'undefined' 
        }} 
        style={styles.cover} 
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.author}>{item.author_name?.join(', ') || 'Anonim'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Cari buku..."
        value={query}
        onChangeText={(txt) => {
          setQuery(txt);
          if (txt.length >= 3) setError('');
        }}
        onSubmitEditing={searchBooks}
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TouchableOpacity style={styles.btn} onPress={searchBooks}>
        <Text style={styles.btnText}>Cari</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={!loading && query.length >= 3 ? <Text style={styles.empty}>Hasil tidak ditemukan.</Text> : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 15 },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  btn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5,
  },
  btnText: { color: '#fff', fontWeight: 'bold' },
  card: { flexDirection: 'row', marginBottom: 15, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 8 },
  cover: { width: 60, height: 90, borderRadius: 4 },
  info: { marginLeft: 15, justifyContent: 'center', flex: 1 },
  title: { fontSize: 16, fontWeight: 'bold' },
  author: { fontSize: 14, color: '#666' },
  empty: { textAlign: 'center', marginTop: 20, color: '#999' }
});