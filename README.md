<div align="center">
  <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWRhNTFhMjI5YTg4NDNjNWEzNmNjMWJkNjJiZjM1YmI3ODU4YWM4YiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/2IudUHdI075HL02Pkk/giphy.gif" alt="Nexus AI Banner" width="600"/>

  # 🚀 NEXUS AI - DeepAI Reverse Engineering 🚀
  
  **Ultimate Unofficial Client & API Server for DeepAI**
  <br>
  *Bypassing Token Limitations, Unlocking Premium Models, & Image Upload Support!*

  [![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg?style=for-the-badge&logo=node.js)](#)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](#)
  [![Status](https://img.shields.io/badge/Status-Fully%20Weaponized-red.svg?style=for-the-badge)](#)
</div>

---

## 🔮 Tentang Proyek Ini
**NEXUS AI** (berkas utama: `dp.js`) adalah sebuah skrip *reverse-engineering* tingkat lanjut dari platform DeepAI. Skrip ini membongkar algoritma enkripsi klien *DeepAI*, sehingga Anda dapat menggunakan layanan Generator Gambar *High-Definition* dan mengobrol dengan model AI tingkat Premium secara **gratis tanpa batas (Bypass API-Key)**.

Skrip ini memiliki dua peran utama:
1. **CLI Interaktif** yang elegan dengan efek mesin tik dan *spinner*.
2. **REST API Server** untuk mengintegrasikan model-model canggih ini ke aplikasi atau *bot* milik Anda sendiri.

---

## 🌟 Fitur-Fitur Epik yang Baru Diperbarui

| Fitur | Deskripsi | Status |
| :--- | :--- | :---: |
| 🔑 **Auto Token Generator** | Hasil *reverse-engineering* dari fungsi `generateIslandKey` milik DeepAI. Skrip ini menghasilkan kunci enkripsi unik di setiap *request* yang membuat Anda terdeteksi sebagai pengguna web organik. | 🟢 Aktif |
| 🎨 **HD Text-to-Image** | Hasilkan gambar beresolusi tinggi langsung dari Terminal atau via API. Dukungan *Negative Prompt* disertakan. | 🟢 Aktif |
| 💬 **Premium Neural Chat** | Akses ke 10 model AI Premium dunia secara percuma (tanpa batas *request*!). | 🟢 Aktif |
| 👁️ **Vision / Image Upload** | Integrasi *upload* gambar ke AI! Cukup panggil tag `[image] path/file` maka AI akan menganalisis visual Anda. | 🟢 Aktif |
| 🌐 **REST API Server** | Ingin bikin *bot* WhatsApp/Telegram? Jalankan skrip ini sebagai server lokal (`localhost:3000`) dan tembak lewat JSON. | 🟢 Aktif |
| ✨ **Sleek CLI Animations** | Menghilangkan *header* ASCII jadul, diganti dengan *spinner* animasi dan *typewriter effect* super elegan. Tahan banting anti-*crash* pada *non-TTY shell*. | 🟢 Aktif |

---

## 🧠 Katalog Model Kecerdasan Buatan (AI)
Berikut adalah daftar model yang sukses dibongkar untuk digunakan tanpa batas. Model dengan tanda **[Vision]** berarti mendukung *input* file berupa gambar!

1. **Standard**
2. **DeepSeek V3.2**
3. **GPT OSS 120B**
4. **Llama 4 Scout** 👁️ `[Vision]`
5. **Llama 3.3 70B Instruct**
6. **Llama 3.1 8B Instant**
7. **Gemini 2.5 Flash Lite** 👁️ `[Vision]`
8. **Gemma 4** 👁️ `[Vision]`
9. **GPT-4.1 Nano**
10. **GPT-5 Nano** 👁️ `[Vision]`

---

## 🚀 Panduan Penggunaan

### 💻 1. Mode CLI Interaktif
Cukup panggil skrip tanpa argumen, dan Anda akan disambut oleh UI elegan.
```bash
node dp.js
```
*Kemudian pilih Modul 1 (Image), Modul 2 (Server API), atau Modul 3 (Chat).*

**Trik Khusus Chat [Vision] 📸:**
Saat berada di dalam Mode Chat, jika Anda memilih model yang mendukung **Vision** (seperti Llama 4 Scout atau Gemini 2.5 Flash Lite), Anda bisa menyuruh AI menganalisis gambar lokal di PC Anda. 
Caranya, awali *prompt* dengan `[image]` dan masukkan lokasi gambar:
```text
USER  > [image] "C:\Users\Saya\Pictures\gambar.png" Tolong jelaskan isi foto ini!
```
*Skrip otomatis akan mengunggah gambar tersebut secara anonim dan menyuntikkannya ke memori AI!*

<br>

### 🌐 2. Mode REST API Server
Jalankan NEXUS AI di latar belakang untuk melayani *request* dari aplikasi lain.
```bash
node dp.js --api
```
Server akan berjalan di `http://localhost:3000`.

#### A. Endpoint Image Generator (POST `/api/generate`)
```json
{
  "prompt": "Cyberpunk city at night, neon lights, 4k",
  "isQuality": true,
  "style": "hd",
  "negativePrompt": "blurry, distorted"
}
```

#### B. Endpoint Chat API (POST `/api/chat`)
```json
{
  "model": "gemini-2.5-flash-lite",
  "messages": [
    { "role": "user", "content": "Hai, siapa kamu?" }
  ]
}
```

#### C. Endpoint Chat + Image (POST `/api/chat`)
*(Pastikan Anda telah mengunggah gambar terlebih dahulu dan mendapatkan UUID dari `/chat_attachments/upload`)*
```json
{
  "model": "gemma-4",
  "messages": [
    { 
      "role": "user", 
      "content": "Jelaskan gambar ini", 
      "attachment_uuids": ["df99118c-8bdb-4bd9-8bb5-f783e27db59a"]
    }
  ]
}
```

---

<div align="center">
  <i>"Hackers become a little stinkier every time they hack."</i><br>
  <b>Dibuat untuk tujuan Riset Edukasi & Pengujian. Use Responsibly.</b>
  <br><br>
  
  <h3>Created with 💻 & 🔥 by <b>lanncodex</b></h3>
  <img src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" width="250" alt="Lanncodex Hacker GIF">
</div>
