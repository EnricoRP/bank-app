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

### 📌 Positition relative & absolute
    🔹 Misal ada meja (parent container) dan di atasnya ada 2 buku (child element):
        -   Buku 1 (realtive) : di letakan normal di atas meja.
        -   Buku 2 (absolute) : di tumpuk di atas buku 1, tapi posisinya diukur dari pinggir meja (bukan dari buku 1)
        Jadi, Jika meja tidak punya posisi relative, Buku 2 akan mencari meja lain yang lebih tinggi (misal: lantai) sebagai acuan posisinya.

        ```jsx
            <div className="relative"> {/* Parent dengan `relative` */}
                <div className="relative z-10">...</div> {/* Child 1 (normal) */}
                <div className="absolute right-0 top-8 z-0">...</div> {/* Child 2 (absolute) */}
            </div>
        ```
        Child 2 mengambil parent sebagai acuan posisi.
        Child 1 tetap menggunakan relative karena menggunakan z-index. Jika tidak menggunakan relative z-index, posisi elemen bisa kacau. 

        ℹ️ Summary
          🔹 position: relative = penanda wilayah untuk child absolute.
          🔹 position: absolute = elemen melayang yang posisinya di ukur dari parent relative.
          🔹 Selalu gunakan position: relative jika ingin memakai z-index.
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

## 5. cn(...inputs: ClassValue[])
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

## 6. Penjelasan relative dan fill pada Next.js <Image />
✅ <div className="relative size-6">
    🔹 relative digunakan agar posisi elemen anak (child) bisa menggunakan positioning relatif terhadap parent-nya.
    🔹 Dalam konteks ini, Image akan menggunakan parent <div> sebagai acuan karena fill membutuhkan parent yang berposisi.

✅ <Image ... fill />
    🔹 Properti fill adalah fitur dari Next.js <Image /> yang membuat gambar mengisi seluruh ukuran parent container.
    🔹 fill akan membuat gambar menjadi absolute positioned (position: absolute; top: 0; left: 0; width: 100%; height: 100%)
    🔹 Maka parent-nya wajib punya relative agar posisi absolut dari gambar merujuk ke dalam container tersebut.

✅ Kombinasi ini sangat berguna untuk: 
    🔹 Menempatkan gambar responsif yang bisa menyesuaikan ukuran parent-nya.
    🔹 Digunakan dalam layout navigasi/icon seperti sidebar, avatar, thumbnail, dll.
##

## 7. DialogContent / SheetContent (ShadCN / Radix UI)
✅ Komponen DialogContent atau SheetContent wajib memiliki:
    🔹DialogTitle / SheetTitle → sebagai label utama
    🔹DialogDescription / SheetDescription → sebagai deskripsi tambahan (untuk screen reader)

📢 Tanpa ini, akan muncul warning seperti: 
    `Warning: Missing `Description` or `aria-describedby={undefined}` for {DialogContent}.`
##

## 8. <SheetClose asChild> (ShadCN / Radix UI)
✅ asChild adalah props khusus yang menginstruksikan komponen (misalnya SheetClose) untuk tidak membuat elemen HTML sendiri, melainkan me-render elemen anaknya secara langsung.

```tsx
    <SheetClose asChild>
        <Button variant="ghost">Tutup</Button>
    </SheetClose>
```
    🔹 Jika tanpa asChild, maka SheetClose akan otomatis membuat elemen (biasanya <button>).
    🔹 Jika pakai asChild, maka Button (dari ShadCN) akan menjadi elemen utamanya—dan tetap menerima semua event/behavior dari SheetClose.
ℹ️ Intinya: asChild = "jangan render HTML baru, cukup teruskan ke anaknya dan injeksi fungsinya."
##

## 9. Penggunaan <aside> untuk Sidebar Kanan
✅ <aside> adalah elemen semantic HTML5
    🔹 Digunakan untuk konten tambahan yang terkait dengan konten utama, seperti sidebar, navigasi sekunder, atau catatan tambahan.
    🔹 Membantu screen reader dan mesin pencari (SEO) memahami struktur halaman.
    🔹 Lebih bermakna daripada <div> biasa karena menyampaikan maksud kontennya secara eksplisit.

✅ Contoh penggunaan:
```tsx
    <aside className='right-sidebar'>
    <!-- Konten sidebar -->
    </aside>
```
    🔹 Ini memberitahu browser dan tools aksesibilitas bahwa ini adalah bagian samping dari halaman, seperti sidebar kanan.

✅ Perbandingan elemen semantic:
|--------------------------------------------------------------------------------------|
| Elemen                                                                                 | Kegunaan                                                               |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `<main>`                                                                               | Menampung konten utama dari halaman                                    |
| `<header>`                                                                             | Bagian atas halaman atau section, seperti judul atau logo              |
| `<nav>`                                                                                | Menampung tautan navigasi (menu) utama atau sekunder                   |
| `<aside>`                                                                              | Konten tambahan seperti sidebar, iklan, atau informasi terkait lainnya |
| `<footer>`                                                                             | Bagian bawah halaman, biasanya untuk copyright, link tambahan, dsb.    |
| -------------------------------------------------------------------------------------- |

ℹ️ Gunakan elemen semantic untuk struktur HTML yang lebih jelas, maintainable, dan SEO-friendly.
##

## 10. Conditional Rendering dan Positioning dalam pembuatan section bank di Rigth Sidebar
✅ {banks?.length > 0 && ()}
    🔹 Mengecek apakah array banks ada (banks?) dan apakah jumlah elemennya lebih dari 0.
    🔹 Kalau iya, maka elemen di bawah ini akan dirender.

✅ Container utama:
    <div className="relative flex flex-1 flex-col items-center justify-center gap-5">

    | Class            | Penjelasan                                                                     |
    | ---------------- | ------------------------------------------------------------------------------ |
    | `relative`       | Dipakai agar child `absolute` bisa diposisikan relatif terhadap container ini. |
    | `flex flex-1`    | Membuat layout flex dan mengizinkan div ini tumbuh mengisi ruang.              |
    | `flex-col`       | Arah layout anaknya menjadi vertikal.                                          |
    | `items-center`   | Anak-anak div disejajarkan secara horizontal ke tengah.                        |
    | `justify-center` | Anak-anak div disejajarkan secara vertikal ke tengah.                          |
    | `gap-5`          | Jarak antar anak vertikal sebesar `1.25rem`.                                   |
    | `z-10`           | Menempatkan elemen di lapisan atas.                                            |
    | `z-0`            | Menempatkan elemen di lapisan bawah.                                           |
    | `absolute`       | Posisi absolut terhadap parent `relative`.                                     |
    | `right-0 top-8`  | Menempel ke sisi kanan dan turun sejauh `2rem` dari atas.                      |
    | `w-[90%]`        | Lebar elemen adalah 90% dari elemen induknya.                                  |

✅ Elemen Pertama:    
    <div className="relative z-10">
        BANK CARD 1
    </div>

    🔹 Elemen pertama (BANK CARD 1) akan ditampilkan dengan z-index lebih tinggi (z-10) agar berada di atas elemen lain yang memiliki z-0.    

✅ Elemen Kedua:
    {banks[1] && (
        <div className="absolute right-0 top-8 z-0 w-[90%]">
            BANK CARD 2
        </div>
    )}

    | Class           | Penjelasan                                                                                  |
    | --------------- | ------------------------------------------------------------------------------------------- |
    | `absolute`      | Posisi elemen absolut terhadap container induk yang memiliki `relative`.                    |
    | `right-0 top-8` | Elemen diposisikan menempel ke sisi kanan (`right-0`) dan turun `2rem` dari atas (`top-8`). |
    | `z-0`           | Z-index lebih rendah, sehingga elemen ini berada di belakang elemen dengan `z-10`.          |
    | `w-[90%]`       | Lebar elemen adalah 90% dari lebar container induknya.                                      |

    🔹 Jika banks[1] ada (berarti paling tidak ada dua item di banks), maka render elemen kedua (BANK CARD 2).
##

## 11. Pembuatan halaman Sign Up & Sign In menggunakan shadcn form
✅ AuthFormSchema 
Schema ini taruh di utils agar dapat digunakan di banyak file ( Authform.tsx & CustomInput) karena berisi konfigurasi validasi input untu form schema.

Disisi lain, AuthFormSchema juga di gunakan pada CustomInput.tsx :
🔹  `control: Control<z.infer<typeof AuthFormSchema>>`
`Control<T>` adalah generic dari `react-hook-form` yang mengontrol seluruh form berdasarkan T yang di berikan. Sementara `z.infer<typeof AuthFormSchema>` akan mengekstrak tipe TypeScript dari Zod schema AuthFormSchema.

🔹  `name: FieldPath<z.infer<typeof AuthFormSchema>>`
`FieldPath<T>` juga generic dari `react-hook-form` yang akan membatasi nama field hanya pada key dari object harsil infer Zod. Sehingga kesalahan value dapat di minimalisir.

🔹 `interface CustomInput`
Hal ini digunakan untuk tujuan type safety, Sehingga control dan name akan otomatis menyesuaikan dengan AuthFormSchema.
##
# 

