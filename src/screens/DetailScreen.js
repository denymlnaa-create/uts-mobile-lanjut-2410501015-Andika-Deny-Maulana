import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert 
} from 'react-native';
import { AppContext } from '../context/Context';

const DetailScreen = ({ route }) => {
  const { book } = route.params;
  const { dispatch } = useContext(AppContext);

  const handleAddToFavorite = () => {
    dispatch({ type: 'ADD_FAVORITE', payload: book });
    Alert.alert('Berhasil', `Buku "${book.title}" sudah masuk daftar favorit kamu!`);
  };

  const coverUrl = book.cover_i 
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` 
    : undefined

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: coverUrl }} style={styles.image} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Oleh: {book.author_name?.join(', ') || 'Anonim'}</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Tahun Terbit</Text>
          <Text style={styles.value}>{book.first_publish_year || '-'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Bahasa</Text>
          <Text style={styles.value}>{book.language?.slice(0, 3).join(', ').toUpperCase() || '-'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Jumlah Edisi</Text>
          <Text style={styles.value}>{book.edition_count || '0'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Penerbit Pertama</Text>
          <Text style={styles.value}>{book.publisher ? book.publisher[0] : '-'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Subjek Utama</Text>
          <Text style={styles.value} numberOfLines={1}>
            {book.subject ? book.subject[0] : '-'}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.favButton} 
          onPress={handleAddToFavorite}
        >
          <Text style={styles.favButtonText}>Tambah ke Favorit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'right',
    marginLeft: 20,
  },
  favButton: {
    backgroundColor: '#e91e63',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  favButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;