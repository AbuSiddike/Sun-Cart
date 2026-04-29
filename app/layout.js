import { Toaster } from 'react-hot-toast';
import './globals.css';

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
      <body className="bg-gray-50 font-sans antialiased">
        {children}
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
