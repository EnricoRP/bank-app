import Image from "next/image";

 export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
        {children}
        <div className="auth-asset">
          <Image src='/icons/auth-image.svg' height={500} width={500} alt='auth-image'/>
        </div>
    </main>
  );
}
