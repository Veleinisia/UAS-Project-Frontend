# 🎮 Movie CRUD App with Next.js, TMDB API, and MySQL

Aplikasi ini memungkinkan pengguna menambahkan film ke database hanya dengan memasukkan **ID dari TMDB** (The Movie Database). Data film seperti judul, poster, rating, dan tanggal rilis akan otomatis diambil dari TMDB API, dan disimpan ke **MySQL lokal** menggunakan XAMPP.

---

## 📦 Fitur Utama

✅ Tambah film berdasarkan ID TMDB
✅ Tampilkan daftar semua film yang tersimpan
✅ Edit data film secara manual
✅ Hapus film dari database
✅ Gambar poster langsung dari TMDB

---

## 🛠️ Teknologi yang Digunakan

* [Next.js](https://nextjs.org/) – Fullstack React Framework
* [React.js](https://reactjs.org/) – Library untuk membangun UI
* [TMDB API](https://www.themoviedb.org/documentation/api) – Sumber data film
* [MySQL](https://www.mysql.com/) – Database lokal (pakai XAMPP)
* [mysql2](https://www.npmjs.com/package/mysql2) – Koneksi database
* [Axios](https://axios-http.com/) – HTTP client untuk fetch API

---

## 📁 Struktur Proyek

```
movie-app/
├── components/
│   ├── MovieForm.js         # Form tambah/edit film
│   └── MovieList.js         # Tampilan list film
│
├── lib/
│   └── db.js                # Koneksi ke MySQL lokal
│
├── pages/
│   ├── index.js             # Halaman utama (list film)
│   ├── add.js               # Halaman tambah film via TMDB ID
│   └── edit/[id].js         # Halaman edit film
│
│   └── api/
│       ├── movies/          # API CRUD
│       │   ├── index.js     # GET, POST
│       │   └── [id].js      # GET by ID, PUT, DELETE
│       └── tmdb.js          # Fetch film dari TMDB API
│
├── .env.local               # Konfigurasi rahasia (API Key TMDB)
├── package.json             # Dependensi proyek
├── next.config.js           # Config untuk Next.js
└── README.md                # Dokumentasi proyek ini
```

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repositori

```bash
git clone https://github.com/username/movie-crud-app.git
cd movie-crud-app
```

### 2. Install Semua Dependensi

```bash
npm install
```

### 3. Setup Database di XAMPP

* Buka XAMPP, aktifkan **MySQL**
* Buka `http://localhost/phpmyadmin`
* Buat database bernama: `movie_db`
* Jalankan SQL berikut di tab SQL:

```sql
CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tmdb_id INT NOT NULL,
  title VARCHAR(255),
  overview TEXT,
  poster_path VARCHAR(255),
  release_date DATE,
  vote_average FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Dapatkan API Key dari TMDB

1. Kunjungi [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Daftar dan login akun
3. Masuk ke Settings → API → Create API Key (v3)
4. Simpan API key kamu

### 5. Buat File `.env.local` di Root Folder

```env
TMDB_API_KEY=isi_api_kamu_di_sini
```

> ⚠️ Jangan upload `.env.local` ke GitHub!

### 6. Jalankan Aplikasi

```bash
npm run dev
```

Buka di browser: [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Screenshot Tampilan

📷 Halaman Utama:

* Menampilkan daftar film yang sudah disimpan

📷 Halaman Tambah Film:

* Isi TMDB ID → Klik “Ambil & Simpan” → Data film otomatis masuk ke DB

📷 Halaman Edit:

* Ubah detail film dan simpan kembali

---

## 🧠 Tips Tambahan

* Gunakan ID TMDB valid, misal: `238` untuk *The Godfather*
* Gunakan `console.log()` untuk debug di browser
* Jika ingin deploy ke [Vercel](https://vercel.com/), buat DB online (misal PlanetScale, Supabase)

---

