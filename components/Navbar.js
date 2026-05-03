'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { Menu, X } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    await signOut({ callbackURL: '/' });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
  ];

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl">
              ☀️
            </div>
            <span className="font-bold text-2xl tracking-tight text-orange-600">
              SunCart
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Auth Section */}
            {user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <img
                    src={user.image}
                    alt="user"
                    className="w-15 h-10 rounded-full object-cover ring-2 ring-orange-200 cursor-pointer"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Menu">
                  <DropdownItem key="profile" href="/profile">
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onPress={handleLogout}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="bordered" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    color="primary"
                    size="sm"
                    className="summer-gradient text-white"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              isIconOnly
              variant="light"
              className="md:hidden"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg z-40 px-4 py-5">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-gray-700 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-lg font-medium text-gray-700 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-lg font-medium text-red-500 text-left py-2"
                >
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
                  <Button fullWidth className="summer-gradient text-white">
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
