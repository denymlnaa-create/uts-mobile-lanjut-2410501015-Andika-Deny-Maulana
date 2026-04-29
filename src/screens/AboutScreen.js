import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.main}> 
      <Text style={styles.title}>Profil</Text>
      
      <View style={styles.content}>
        <Image 
          source={require('../../assets/profil.png')} 
          style={styles.img} 
        />
        
        <View style={styles.box}>
          <Text style={styles.txt}>Nama: Andika Deny Maulana</Text>
          <Text style={styles.txt}>NIM: 2410501015</Text>
          <Text style={styles.txt}>Kelas:B</Text>
          <Text style={styles.txt}>Tema: BookShelf</Text>
          <Text style={styles.txt}>API: openlibrary.org</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#eee',
    paddingTop: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  content: {
    alignItems: 'center',
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  txt: {
    fontSize: 16,
    marginVertical: 4,
  },
});