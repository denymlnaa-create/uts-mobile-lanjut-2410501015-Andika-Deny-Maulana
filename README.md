UTS Pemrograman Mobile Lanjut

Nama    : Andika Deny Maulana
NIM     : 2410501015
Kelas   : B
Tema    : Tema C (BookShelf)


Tech Stack
- Framework        : React Native (Expo SDK 54)
- Navigation       : React Navigation (Native Stack & Bottom Tabs)
- State Management : Context API + useReducer
- HTTP Client      : Fetch API
- API Sumber       : Open Library API (https://openlibrary.org/developers/api)
- Library Utama    : 
  - `@react-navigation/native` & `stack` & `bottom-tabs`
  - `react-native-gesture-handler`
  - `react-native-screens`


Cara Install dan Run
- Clone Repository
  git clone [https://github.com/denymlnaa-create/uts-mobile-lanjut-2410501015-Andika-Deny-Maulana.git]
- Install Node Module :
  npm install
- Jalankan Project :
  npx expo start
- Scan QR Code melalui aplikasi Expo Go di smartphone

Screenshots

Home Screen
![Home](./Screenshots/HomeScreen.jpeg)

Search Screen
![Search](./Screenshots/SearchScreen.jpeg)

Detail Screen
![Detail](./Screenshots/DetailScreen.jpeg)

Favorite Screen
![Favorite](./Screenshots/FavoriteScreen.jpeg)

About Screen
![About](./Screenshots/AboutScreen.jpeg)


Link Video :
[text](https://drive.google.com/drive/folders/1cjJ3Ol3muXvMTPKhd-mSEP3izyJ9Kwa7)


State Management & Justifikasi
Saya memilih menggunakan Context API + useReducer untuk mengelola data buku favorit secara global

Justifikasi :
Pusat Logika: Menggunakan useReducer agar aksi tambah/hapus favorit terpusat di satu fungsi, sehingga aliran data lebih teratur dan mudah dilacak.

Bebas Prop Drilling: Context API memungkinkan data favorit diakses langsung oleh DetailScreen dan FavoriteScreen tanpa perlu oper-oper data lewat komponen perantara.

Ringan & Native: Solusi ini merupakan fitur bawaan React, sehingga aplikasi tetap ringan dan efisien tanpa perlu instalasi library luar seperti Redux.


Daftar referensi
- React Navigation: https://reactnavigation.org/docs/getting-started
- Open Library API Documentation: https://openlibrary.org/developers/api


Refleksi
Saat mengerjakan project UTS BookShelf ini, jujur saya dapet banyak banget pengalaman baru yang lumayan menantang, terutama soal gimana nge-handle aplikasi mobile pakai React Native. Kesulitan paling berasa itu pas bagian narik data dari API Open Library. Ternyata data yang dikirim tiap endpoint itu nggak selalu sama strukturnya. Saya sempet nemu bug yang bikin pusing di halaman detail; kalau bukunya diklik dari daftar trending, info genrenya cuma muncul tanda strip (-). Akhirnya saya akalin pakai teknik data normalization dan nambahin nilai cadangan 'General'.

Selain itu, ada juga bug yang lumayan mengganggu di Favorite Screen, di mana gambar cover buku sempet nggak muncul pas sudah disimpan. Ternyata ini karena perbedaan penamaan properti ID cover antara data dari hasil pencarian dan data trending. Saya harus benerin logika pemanggilan URL gambarnya supaya bisa nanganin berbagai kondisi properti gambar yang berbeda.

Di dalam pengerjaan projek ini saya belajar kalai pakai Context API dan useReducer itu jauh lebih enak buat ngelola data global kayak fitur favorit. Kode jadi nggak berantakan karena nggak perlu oper-oper data antar komponen (prop drilling), dan logikanya jadi lebih terpusat.