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
## CSS
### 📌 CSS --
    🔹 tanda `--` digunakan untuk menunjukan bahwa ini adalah CCS Variabel sebagai penanda agar browser tahu kalau ini adalah CCS Variabel. Jadi CSS Variabel atau Custom Property, Selalu di awali dengan `--`.
##

### 🧩 Flexbox
    📌 1. Mengatur arah elemen anak
        🔹  flex-row: anak-anak elemen sejajar horizontal (default)
        🔹  flex-col: anak-anak elemen sejajar vertikal

    📌 2. Mengatur bagaimana elemen "mengisi ruang"
        🔹  flex-1: elemen mengisi sisa ruang
        🔹  flex-none: elemen tidak bisa tumbuh

    📌 3. Mengatur posisi dalam kontainer
        🔹  justify-start | center | end | between | around → posisi horizontal
        🔹  items-start | center | end | stretch → posisi vertikal
###

## VS Code
### 📌 Emmet Shorthand di VS Code untuk <div> dengan class 
        🔹 Menulis div.my-class akan menghasilkan:
            <div class="my-class"></div>

        🔹 Kamu bisa langsung menulis .my-class tanpa div, hasilnya tetap sama:
            <div class="my-class"></div>

        🔹 Untuk multiple class:
            div.container.row → <div class="container row"></div>

        🔹 Untuk menambahkan id sekaligus:
            div#main.container → <div id="main" class="container"></div>

        🔹 Tekan Tab (atau Enter tergantung setting) untuk ekspansi otomatis.
###
##
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

## 3. Pembuatan TotalBalanceBox dengan AnimatedCounter
✅ TotalBalanceBox awalnya menggunakan CountUp langsung
    🔹 CountUp memakai useRef() yang hanya bisa dijalankan di Client Component.
    🔹 Di Next.js (App Router), file di dalam app/ secara default adalah Server Component, sehingga muncul error:
    🔸 "useRef only works in Client Components."

✅ Solusi: Ekstrak CountUp ke dalam komponen Client bernama AnimatedCounter
    🔹 Tambahkan "use client" di atas file AnimatedCounter.tsx untuk memastikan ini adalah Client Component.
    🔹 AnimatedCounter bisa digunakan dengan bebas di dalam komponen Server (seperti TotalBalanceBox) karena sudah di-enkapsulasi.
    🔹 Cara pemakaian tetap sama: <AnimatedCounter end={value} />
✅ Keuntungan memisahkan ke AnimatedCounter
    🔹 Tidak perlu menjadikan seluruh TotalBalanceBox sebagai Client Component.
    🔹 Menjaga performa dan efisiensi Next.js karena hanya bagian yang butuh client yang diubah.
    🔹 Komponen jadi lebih modular dan reusable.
##

## 4. Layouting Sidebar
✅ <main className="flex h-screen w-full font-inter">
    🔹 Digunakan untuk membungkus layout utama halaman (umumnya bagian sidebar + konten).
    🔹 Elemen main ini akan membentang penuh layar baik secara tinggi maupun lebar.

✅ flex
    🔹 Mengaktifkan Flexbox, menyusun anak elemen (SIDEBAR, {children}) secara horizontal (default arah row).
    🔹 Cocok untuk layout dua kolom: sidebar di kiri, konten di kanan.

✅ h-screen
    🔹 Menetapkan tinggi elemen sebesar tinggi viewport (100vh).
    🔹 Membuat tampilan menyesuaikan layar penuh.

✅ w-full
    🔹 Menetapkan lebar elemen penuh (100% dari parent-nya).
##

## 📌 cn(...inputs: ClassValue[])
✅ Fungsi cn digunakan untuk menggabungkan class Tailwind dengan cara yang dinamis dan rapi.
    🔹 ...inputs
      ➡️ Disebut Rest Parameter
      ➡️ Artinya: menerima banyak argumen dan menggabungkannya jadi satu array bernama inputs

    🔹 ClassValue[]
      ➡️ Tipe dari setiap argumen di inputs, disediakan oleh library clsx
      ➡️ Bisa berupa: 
            • string → contoh: "p-4"
            • object → contoh: { 'bg-red-500': isActive }
            • false, null, undefined → akan diabaikan otomatis
            • Array dari semua tipe di atas

    🔹 clsx(inputs)
      ➡️ Menggabungkan semua class menjadi satu string
      ➡️ Contoh: clsx("p-2", "p-4") → "p-2 p-4"

    🔹 twMerge(...)
      ➡️ Menyelesaikan konflik class Tailwind
      ➡️ Contoh: twMerge("p-2 p-4") → "p-4"

ℹ️ cn sangat berguna saat kamu ingin memberi class secara kondisional:
```tsx
    cn("sidebar-link", {
    "bg-bank-gradient": isActive,
    })
```
 

##
# 