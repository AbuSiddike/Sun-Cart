import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'SunCart - Summer Essentials Store',
  description: 'Modern summer eCommerce platform for all your summer needs',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 3000,
          }}
        />
      </body>
    </html>
  );
}