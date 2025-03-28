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

# ⚠️ Perbaikan tailwind config
ℹ️ darkMode: ["class"] tidak sesuai dengan tipe yang diharapkan
    🔹 Tailwind v4 mengubah definisi tipe untuk darkMode.
    🔹 Dulu, bisa menggunakan darkMode: ["class"], tetapi sekarang mengharapkan array dengan dua elemen seperti ["class", string].
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


https://www.luisball.com/blog/shadcn-ui-with-tailwind-v4