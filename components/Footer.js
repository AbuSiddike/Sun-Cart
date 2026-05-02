import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">☀️</span>
              </div>
              <span className="font-bold text-2xl">SunCart</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover everything you need for summer in one place. Shop with
              confidence and enjoy the season in style.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-orange-400 hover:text-white transition"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-orange-400 hover:text-white transition"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-orange-400 hover:text-white transition"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 SunCart. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
