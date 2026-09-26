# B0MBER Softgen — Company Profile + Admin Dashboard

Company profile software house (B0MBER Softgen) dengan halaman publik satu-halaman
plus dashboard admin untuk mengelola kontennya.

Dibangun dengan **React 19 + Vite 8 + Tailwind CSS v4 + React Router 7 + framer-motion**.

## Menjalankan

```bash
npm install
npm run dev      # server development  → http://localhost:5173
npm run build    # build produksi       → dist/
npm run preview  # pratinjau hasil build
npm run lint     # ESLint
```

## Akun demo

| Email                     | Password   |
| ------------------------- | ---------- |
| `admin@bombersoftgen.com` | `admin123` |

Login di `/login` → dashboard di `/admin`. Halaman login juga menyediakan tombol
**"Isi otomatis"** untuk mengisi kredensial demo. Password bisa diganti di
`/admin/settings`.

> **Catatan keamanan:** tidak ada backend pada proyek ini. Akun, sesi login, dan
> seluruh data disimpan di `localStorage` browser dan tidak aman untuk produksi.
> Struktur sudah dipisah supaya mudah diganti: semua akses data lewat
> `src/lib/store.js` dan autentikasi lewat `src/lib/auth.js`.

## Struktur

```
src/
├── App.jsx                 # definisi route + scroll manager
├── index.css               # design token Tailwind v4 (warna brand, font, shadow)
├── Layouts/MainLayout.jsx  # kerangka halaman publik
├── pages/
│   ├── Home.jsx About.jsx Services.jsx Contact.jsx   # bagian-bagian landing page
│   ├── Login.jsx           # form login admin
│   ├── NotFound.jsx
│   └── admin/              # AdminLayout + Overview, Projects, Services, Team,
│                           # Messages, Settings (semua CRUD)
├── components/
│   ├── admin/ContentManager.jsx   # engine CRUD generik (list + form + hapus + urut)
│   ├── ui/                        # Button, Field, Modal, Toast, Reveal, Section
│   ├── Navbar/Footer/AuthButton   # kerangka situs
│   └── Card/ProjectCard/TeamCard/Timeline/ContactCard
└── lib/
    ├── store.js            # data demo + CRUD + hook useStore()
    ├── auth.js             # login/logout/sesi + hook useAuth()
    └── utils.js            # cn(), formatDate()
```

## Fitur dashboard

- **Ringkasan** — jumlah proyek/layanan/tim, pesan belum dibaca, pesan terbaru.
- **Proyek, Layanan, Tim** — tambah, edit, hapus, dan ubah urutan tampil.
- **Pesan** — inbox dari form kontak: baca, tandai belum dibaca, balas via email, hapus.
- **Pengaturan** — konten situs (nama, tagline, deskripsi, kontak, sosmed), akun admin,
  dan reset data demo.

Semua perubahan langsung terlihat di halaman publik karena keduanya membaca
sumber data yang sama (`store.js`).

## Catatan

- Data demo bisa direset dari **Pengaturan → Reset data demo**.
- Gambar proyek/tim diambil dari preset bawaan atau URL eksternal (belum ada upload file).
- Form kontak tidak mengirim email; pesan tersimpan di inbox dashboard.
