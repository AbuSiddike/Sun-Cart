import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">

      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white text-xl">☀️</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">SunCart</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Discover everything you need for summer in one place. Shop with
              confidence and enjoy the season in style.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {[
                { icon: <FaFacebook size={16} />, href: '#' },
                { icon: <FaInstagram size={16} />, href: '#' },
                { icon: <FaTwitter size={16} />, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-orange-500 hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Shipping Policy', href: '/shipping' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-white hover:pl-1 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-5">
              Stay in the Loop
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Get summer deals and tips delivered straight to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-800 text-sm text-white placeholder-gray-500 px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors duration-200 shadow-lg shadow-orange-500/20">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-500 text-xs">
          <p>© 2026 SunCart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <span className="w-px h-3 bg-gray-700" />
            <Link href="/shipping" className="hover:text-gray-300 transition-colors">Shipping</Link>
            <span className="w-px h-3 bg-gray-700" />
            <Link href="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}