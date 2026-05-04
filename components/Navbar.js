'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ callbackURL: '/' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center h-[60px] relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-orange-600 shrink-0"
          >
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg">
              ☀️
            </div>
            SunCart
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm rounded-md transition-colors
                  ${
                    isActive
                      ? 'text-orange-600 font-semibold after:absolute after:bottom-[-14px] after:left-3 after:right-3 after:h-[2px] after:bg-orange-600 after:rounded-t'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Desktop Auth */}
            {user ? (
              <div className="hidden lg:flex items-center gap-1 border border-gray-200 rounded-full px-2 py-1 hover:border-gray-300 transition-colors">
                {/* Avatar */}
                <img
                  src={user.image}
                  alt={user.name ?? 'user'}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-orange-100"
                />

                {/* Name */}
                <span className="text-sm font-medium text-gray-700 px-2 max-w-[120px] truncate">
                  {user.name}
                </span>

                {/* Divider */}
                <span className="w-px h-4 bg-gray-200" />

                {/* My Profile */}
                <Link
                  href="/profile"
                  className={`flex items-center gap-1 px-2 py-1 text-sm rounded-full transition-colors
                    ${
                      pathname === '/profile'
                        ? 'text-orange-600 font-semibold'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                  <User size={14} />
                  Profile
                </Link>

                {/* Divider */}
                <span className="w-px h-4 bg-gray-200" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2 py-1 text-sm text-gray-500 hover:text-red-500 rounded-full transition-colors"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="bordered" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-1 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Side Drawer */}
          <div className="absolute top-16 left-0 h-[calc(100%-60px)] w-1/2 bg-white/80 backdrop-blur-md shadow-xl p-4 flex flex-col gap-4">
            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-700 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth */}
            {user ? (
              <>
                {/* User info */}
                <div className="flex items-center gap-2 py-2 border-t border-gray-100">
                  <img
                    src={user.image}
                    alt={user.name ?? 'user'}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-orange-200"
                  />
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {user.name}
                  </span>
                </div>

                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-base font-medium text-gray-700 py-2"
                >
                  <User size={16} />
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-base font-medium text-red-500 text-left py-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button fullWidth variant="bordered">
                    Login
                  </Button>
                </Link>

                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-orange-600 text-white">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
