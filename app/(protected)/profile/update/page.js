'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Card } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

export default function UpdateProfilePage() {
  const { data: session, isPending, update } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error('Please login to update profile');
      router.push('/login');
    }
  }, [session, isPending, router]);

  // Pre-fill form with current user data
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setImage(session.user.image || '');
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await update({
        name: name.trim(),
        image: image.trim() || undefined,
      });

      if (result?.error) {
        toast.error(result.error.message || 'Failed to update profile');
      } else {
        toast.success('Profile updated successfully!');
        router.push('/profile');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-orange-600 hover:underline mb-8 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Profile
      </Link>

      <Card className="shadow-2xl">
        <div className="p-10">
          <h1 className="text-3xl font-bold text-center mb-8">
            Update Profile
          </h1>

          <form onSubmit={handleUpdate} className="space-y-8">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired
            />

            <Input
              type="url"
              label="Profile Photo URL"
              placeholder="https://example.com/your-photo.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                color="primary"
                className="flex-1 summer-gradient text-white font-semibold py-7 text-lg"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Update Information
              </Button>

              <Button
                type="button"
                variant="bordered"
                onPress={() => router.push('/profile')}
                className="flex-1 py-7 text-lg"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
