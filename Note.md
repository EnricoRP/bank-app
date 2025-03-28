# 🛠 Instalasi awal
Karena video tutorial menggunakan versi yang sudah tidak latest, Gunakan perintah ini untuk instalasi awal:
🔹  `npx create-next-app@14.2.3 ./ --ts --tailwind --eslint`
        Perintah ini akan membuat project next dengan versi 14.2.3, TypeScript, tailwind, eslint.
        TailWind yang terinstall adalah versi 3 secara default karena create-next-app mengandalkan dependency yang stabil dan kompatibel, Sesuai template yang dikunci di versi CLI, maka ia menginstal Tailwind 3.4.x sebagai default
🔹  `npx shadcn@latest init`
        Dia tidak langsung serta merta ambil versi terbaru, Tapi dia cek terlebih dahulu versi tailwind yang di gunakan pada environtment. Karena Tailwind yang digunakan versi 3.x maka dia tidak install shadcn/ui versi 3, karena shadcn/ui v3 wajib Tailwind 4.0+.
🔹  `pnpm add query-string`
🔹  `pnpm add tailwindcss-animate`
    Jika terjadi pesan seperti di bawah
    `WARN Moving @types/node that was installed by a different package manager to "node_modules/.ignored"`
    Hapus folder `node_modules` lalu jalankan perintah `pnpm install`  
#
  
# ⚠️ Global CSS Error
ℹ️ Terjadi karena VS Code tidak mengenali meskipun Tailwind CSS IntelliSense sudah terinstal
    🔹 Buka Settings (Ctrl + ,)
    🔹 Cari css.unknownAtRules
    🔹 Jika ada opsi "Ignore", pastikan @tailwind tidak diabaikan.
#

# ⚠️ Utils Error
ℹ️ Terjadi karena query-string belum terinstall
    🔹 Jalankan `pnpm add tailwindcss-animate add query-string`
    🔹 Jalankan `pnpm add tailwindcss-animate`
# 

# React Short Hand
    instal ES7 React/Redux/GraphQL/React-Native snippets
agar shorthand berfungsi, contoh membuat react arrow function cukup dengan `rafce`.
#

# 🧐 FYI
 📌 CSS
    🔹 tanda `--` digunakan untuk menunjukan bahwa ini adalah CCS Variabel sebagai penanda agar browser tahu kalau ini adalah CCS Variabel. Jadi CSS Variabel atau Custom Property, Selalu di awali dengan `--`.
 
#

# 🧐 FYI Next.JS
## 1. Route Grouping
Route Grouping di Next.js dilakukan dengan membuat folder di dalam folder app. Ini berguna untuk mengorganisir file tanpa mempengaruhi struktur URL.

Contoh Struktur Folder:
```bash
    app/
    │── (auth)/
    │   ├── sign-in/
    │   │   ├── page.tsx
    │   ├── sign-up/
    │   │   ├── page.tsx
    │── layout.tsx
    │── page.tsx
```
Pada contoh di atas:
Folder (auth) hanya digunakan untuk pengelompokan. Folder ini tidak mempengaruhi URL, sehingga rute tetap sesuai dengan nama folder di dalamnya.
##

## 2. Pembuatan Header Box
✅`user={loggedIn?.firstName || 'Guest'}`
    🔹  loggedIn?.firstName
    🔹  Menggunakan optional chaining (?.) untuk mencegah error jika loggedIn adalah null atau undefined.
    🔹  Jika loggedIn ada, maka akan mengambil firstName.
    🔹  Jika loggedIn tidak ada (null atau undefined), ekspresi ini akan menghasilkan undefined tanpa error.

✅`const HeaderBox = ({ type = "title", title, subtext, user}: HeaderBoxProps)`
    🔹  TypeScript adalah Type Safety jadi harus di deklarasikan Type nya.
    🔹  HeaderBoxProps Interface digunakan agar props sesuai dengan template yang telah di tetapkan.
    🔹  Keuntungan menggunakan Interface adalah kita bisa menentukan parameter tersebut optional atau tidak dengan clean code. 
##
# 