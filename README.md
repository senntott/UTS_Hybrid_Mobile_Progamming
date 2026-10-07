# SIMOBILE — Aplikasi Kasir Toko

SIMOBILE adalah aplikasi kasir sederhana untuk **Toko Makmur Jaya** yang dibuat menggunakan **Ionic dan Angular**. Aplikasi ini digunakan untuk mengelola data produk, keranjang belanja, serta mencatat dan melihat riwayat transaksi.
Project ini menggunakan **LocalStorage** sebagai penyimpanan data sehingga belum membutuhkan database atau server/API.

## Fitur
### Dashboard

- Menampilkan jumlah produk.
- Menampilkan jumlah transaksi hari ini.
- Menampilkan produk terlaris hari ini.

### Manajemen Produk

- Melihat daftar produk.
- Mencari produk berdasarkan nama atau kategori.
- Melihat detail produk.
- Menambahkan produk baru.
- Mengedit produk.
- Menghapus produk.
- Menampilkan stok produk.
- Menampilkan harga beli dan harga jual.
- Menghitung perkiraan keuntungan per produk.
- Menampilkan gambar produk.

### Keranjang

- Menambahkan produk ke keranjang.
- Menampilkan jumlah barang dalam keranjang.
- Mengubah jumlah produk.
- Menghapus produk dari keranjang.
- Menghitung total harga.
- Melakukan checkout.
- Mengecek ketersediaan stok sebelum checkout.

### Transaksi

- Menyimpan transaksi setelah checkout.
- Menampilkan riwayat transaksi.
- Menampilkan tanggal dan waktu transaksi.
- Menampilkan total transaksi.
- Melihat detail setiap transaksi.
- Stok produk otomatis berkurang setelah transaksi berhasil.

### Pengaturan dan Informasi

- Mengubah tampilan antara mode terang dan mode gelap.
- Halaman profil.
- Halaman tentang aplikasi.
- Menu navigasi tambahan.
- Fitur logout tersedia sebagai tampilan, tetapi belum terhubung dengan sistem login.

## Teknologi

Project ini dibuat menggunakan:

- **Ionic Framework**
- **Angular**
- **TypeScript**
- **HTML**
- **SCSS**
- **RxJS**
- **Capacitor**
- **LocalStorage**

## Struktur Project

Struktur utama aplikasi:

```text
simobile/
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── cart/
│   │   ├── models/
│   │   ├── product-detail/
│   │   ├── product-form/
│   │   ├── profile/
│   │   ├── services/
│   │   ├── settings/
│   │   ├── tab1/
│   │   ├── tab2/
│   │   ├── tab3/
│   │   ├── tabs/
│   │   └── transaction-detail/
│   │
│   ├── environments/
│   ├── global.scss
│   ├── index.html
│   └── main.ts
│
├── angular.json
├── capacitor.config.ts
├── ionic.config.json
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Penjelasan Folder

### `models/`

Berisi interface yang digunakan untuk menentukan struktur data aplikasi.

Contohnya:

- `product.ts` — struktur data produk.
- `cart-item.ts` — struktur data item dalam keranjang.
- `transaction.ts` — struktur data transaksi.

### `services/`

Berisi service yang menangani pengelolaan data aplikasi.

- `product.ts` — mengelola data produk.
- `cart.ts` — mengelola keranjang.
- `transaction.ts` — mengelola transaksi.

### `tab1/`

Berisi halaman **Dashboard**.

Dashboard menampilkan ringkasan seperti jumlah produk, transaksi hari ini, dan produk terlaris.

### `tab2/`

Berisi halaman **Produk**.

Halaman ini digunakan untuk melihat, mencari, menambahkan, mengedit, menghapus, dan memasukkan produk ke keranjang.

### `tab3/`

Berisi halaman **Riwayat Transaksi**.

Halaman ini menampilkan seluruh transaksi yang telah dilakukan.

### `cart/`

Berisi halaman **Keranjang** untuk mengatur produk sebelum melakukan checkout.

### `product-detail/`

Digunakan untuk menampilkan informasi detail suatu produk.

### `product-form/`

Digunakan untuk menambahkan produk baru maupun mengedit produk yang sudah ada.

Form juga memiliki validasi untuk beberapa input seperti nama produk, kategori, harga, dan stok.

### `transaction-detail/`

Digunakan untuk melihat detail dari transaksi tertentu.

### `settings/`

Berisi pengaturan tampilan aplikasi, termasuk **Dark Mode**.

### `about/`

Berisi informasi mengenai aplikasi SIMOBILE.

## Penyimpanan Data

SIMOBILE tidak menggunakan database atau API eksternal.

Data disimpan menggunakan **LocalStorage** pada browser.

Key yang digunakan:

```text
simobile-products
simobile-cart
simobile-transactions
```

### Produk

Data produk disimpan pada:

```text
simobile-products
```

Data yang disimpan meliputi:

```text
id
name
category
buyPrice
sellPrice
stock
image
```

### Keranjang

Data keranjang disimpan pada:

```text
simobile-cart
```

Data meliputi:

```text
productId
name
price
qty
image
```

### Transaksi

Data transaksi disimpan pada:

```text
simobile-transactions
```

Data transaksi meliputi:

```text
id
date
items
total
```

## Alur Checkout

Alur transaksi pada aplikasi:

```text
Pilih Produk
     ↓
Tambah ke Keranjang
     ↓
Atur Jumlah Produk
     ↓
Checkout
     ↓
Cek Stok
     ↓
Buat Transaksi
     ↓
Kurangi Stok Produk
     ↓
Kosongkan Keranjang
     ↓
Transaksi Berhasil
```

Setelah checkout berhasil, stok setiap produk akan otomatis dikurangi sesuai jumlah barang yang dibeli.

## Persyaratan

Sebelum menjalankan project, pastikan sudah terinstall:

- Node.js
- npm
- Ionic CLI (opsional jika menggunakan perintah `ionic serve`)

Untuk memastikan Node.js dan npm sudah tersedia:

```bash
node --version
npm --version
```

Jika ingin menggunakan Ionic CLI:

```bash
ionic --version
```

## Instalasi

Clone atau download project terlebih dahulu.

Masuk ke folder project:

```bash
cd simobile
```

Kemudian install seluruh dependency:

1. Download file ZIP project SIMOBILE.
2. Extract file ZIP tersebut.
3.Buka terminal pada folder project SIMOBILE.
4. Pastikan posisi terminal berada di folder yang berisi file package.json.
5. Jalankan perintah berikut satu per satu:
npm install
```

## Menjalankan Project

### Menggunakan Ionic

```bash
ionic serve
<<<<<<< HEAD
```

### Atau menggunakan npm

```bash
npm start
```

Setelah berhasil dijalankan, aplikasi dapat diakses melalui alamat yang ditampilkan oleh Ionic/Angular pada terminal, biasanya:

```text
http://localhost:8100
```

## Build Project

Untuk melakukan build aplikasi:

```bash
npm run build
```

## Testing

Project juga menyediakan konfigurasi untuk menjalankan unit test.

Gunakan:

```bash
npm test
```

## Catatan

- Data aplikasi disimpan di LocalStorage browser.
- Data dapat hilang jika LocalStorage browser dihapus.
- Project belum menggunakan database.
- Project belum menggunakan backend atau API.
- Gambar produk dapat menggunakan URL gambar eksternal.
- Fitur logout belum terhubung dengan sistem autentikasi.
- Project ini dibuat sebagai aplikasi kasir/prototype untuk kebutuhan pembelajaran.

## Identitas Project

**Nama Aplikasi:** SIMOBILE
**Jenis:** Aplikasi Kasir Toko
**Toko:** Toko Makmur Jaya
**Framework:** Ionic + Angular
**Bahasa Pemrograman:** TypeScript
**Penyimpanan:** LocalStorage

>>>>>>> 80625e2bf4a862346c811b8cb8d439f009d7ee5b
