'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import { Menu, X, User } from 'lucide-react';
import { useSession, signOut } from '@/lib/auth-client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending: isLoading } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await signOut({ callbackURL: '/' });
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

          {/* Desktop Navigation */}
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
            {user && (
              <Link href="/profile" className="hidden md:block">
                <Button variant="light" startContent={<User size={18} />}>
                  Profile
                </Button>
              </Link>
            )}

            {/* Auth Section */}
            {user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    src={user.image}
                    size="sm"
                    className="cursor-pointer ring-2 ring-orange-200"
                    fallback="👤"
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
              <div className="flex items-center gap-3">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-5">
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
            {user && (
              <Link
                href="/profile"
                className="text-lg font-medium text-gray-700 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Profile
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
