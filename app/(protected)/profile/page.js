'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, Avatar } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import { User, Edit, ArrowLeft } from 'lucide-react';
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
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  if (!session?.user) return null;

  const user = session.user;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-orange-600 hover:underline mb-8"
      >
        <ArrowLeft size={20} />
        Back to Home
      </Link>

      <Card className="shadow-2xl">
        <div className="p-10">
          <div className="flex flex-col items-center text-center mb-10">
            <img
              src={user.image}
              alt={user.name}
              className="mb-6 ring-4 ring-orange-100 rounded-full"
            />
            {/* <Avatar
              src={`${user.image}`}
              size="xl"
              className="mb-6 ring-4 ring-orange-100"
              fallback={<User size={60} />}
            /> */}

            <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-500 text-xl">{user.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Member Since</p>
              <p className="font-medium">April 2026</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl">
              <p className="text-sm text-gray-500 mb-1">Account Type</p>
              <p className="font-medium">Regular User</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/profile/update">
              <Button
                color="primary"
                className="summer-gradient px-10 py-7 text-lg font-medium flex items-center gap-3"
                startContent={<Edit size={20} />}
              >
                Update Profile
              </Button>
            </Link>

            <Button
              variant="bordered"
              onPress={() => router.push('/')}
              className="px-10 py-7 text-lg"
            >
              Back to Shopping
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
