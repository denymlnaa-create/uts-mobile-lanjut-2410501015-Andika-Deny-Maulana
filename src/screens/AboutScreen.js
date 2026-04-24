import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil Pengembang</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Nama: Andika Deny Maulana</Text>
        <Text style={styles.info}>NIM: 2410501015</Text>
        <Text style={styles.info}>Prodi: D3 Sistem Informasi</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
});