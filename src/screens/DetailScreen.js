import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { AppContext } from '../context/Context';

const DetailScreen = ({ route }) => {
  const { book } = route.params;
  const { dispatch } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://openlibrary.org${book.key}.json`)
      .then((res) => res.json())
      .then((hasil) => {
        setData(hasil);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [book.key]);

  const simpanFavorit = () => {
    dispatch({ type: 'ADD_FAVORITE', payload: book });
    Alert.alert('Berhasil', 'Buku telah masuk ke daftar favorit');
  };

  const gbr = book.cover_i || book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_i || book.cover_id}-L.jpg`
    : `undefined`;

    const subjekBuku = 
    (book.subject && book.subject.length > 0) ? book.subject.slice(0, 3).join(', ') : 
  (book.subjects && book.subjects.length > 0) ? book.subjects.slice(0, 3).join(', ') :
  (data?.subjects && data.subjects.length > 0) ? data.subjects.slice(0, 3).join(', ') : 
  'General';
  const deskripsi = () => {
    if (!data?.description) return 'Tidak ada deskripsi.';
    return typeof data.description === 'string' ? data.description : data.description.value;
  };

  if (loading) {
    return (
      <View style={styles.tengah}>
        <ActivityIndicator size="large" color="#e91e63" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.bg}>
      <View style={styles.areaGbr}>
        <Image source={{ uri: gbr }} style={styles.img} />
      </View>

      <View style={styles.box}>
        <Text style={styles.judul}>{book.title}</Text>
        <Text style={styles.author}>Author: {book.author_name?.join(', ') || 'Anonim'}</Text>
        <Text style={styles.txtInfo}>Genre: {subjekBuku}</Text>
        <View style={styles.garis} />

        <Text style={styles.sub}>Sinopsis:</Text>
        <Text style={styles.txt}>{deskripsi()}</Text>

        <Text style={styles.txtInfo}>Terbit: {book.first_publish_year || '-'}</Text>

        <TouchableOpacity style={styles.tombol} onPress={simpanFavorit}>
          <Text style={styles.txtTombol}>Tambah Favorit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#fff' },
  tengah: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  areaGbr: { padding: 20, alignItems: 'center', backgroundColor: '#f0f0f0' },
  img: { width: 150, height: 220, borderRadius: 5 },
  box: { padding: 20 },
  judul: { fontSize: 20, fontWeight: 'bold' },
  author: { fontSize: 14, color: '#555', marginTop: 5 },
  garis: { height: 1, backgroundColor: '#eee', marginVertical: 15 },
  sub: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  txt: { fontSize: 14, color: '#333', lineHeight: 20, marginBottom: 15 },
  txtInfo: { fontSize: 14, marginBottom: 20, color: '#666' },
  tombol: { backgroundColor: '#e91e63', padding: 15, borderRadius: 8, alignItems: 'center' },
  txtTombol: { color: '#fff', fontWeight: 'bold' },
});

export default DetailScreen;