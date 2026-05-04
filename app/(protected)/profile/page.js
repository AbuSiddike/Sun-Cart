'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import { User, Mail, Calendar, Shield, Edit, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error('Please login to access your profile');
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xl text-gray-500 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-orange-600 hover:underline mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Card */}
        <Card className="backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl">
          <div className="p-8 md:p-12">

            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mb-12">
              <div className="relative group">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-32 h-32 rounded-full object-cover ring-4 ring-orange-200 shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mt-6">
                {user.name}
              </h1>

              <p className="text-gray-500 text-lg mt-1">
                {user.email}
              </p>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 hover:shadow-md transition">
                <User className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-semibold">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 hover:shadow-md transition">
                <Mail className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-semibold">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 hover:shadow-md transition">
                <Calendar className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold">April 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 hover:shadow-md transition">
                <Shield className="text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="font-semibold">Regular User</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/profile/update" className="w-full sm:w-auto">
                <Button
                  className="w-full sm:w-auto px-8 py-6 text-lg font-medium flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
                  startContent={<Edit size={18} />}
                >
                  Update Profile
                </Button>
              </Link>

              <Button
                variant="bordered"
                onPress={() => router.push('/')}
                className="w-full sm:w-auto px-8 py-6 text-lg border-gray-300 hover:bg-gray-100"
              >
                Back to Shopping
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}