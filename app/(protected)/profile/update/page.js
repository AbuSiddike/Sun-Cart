'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Card } from '@heroui/react';
import { useSession, updateUser } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { ArrowLeft, User, Camera } from 'lucide-react';

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error('Please login to update profile');
      router.push('/login');
    }
  }, [session, isPending, router]);

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
      const result = await updateUser({
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
        <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-orange-600 hover:underline mb-8"
        >
          <ArrowLeft size={18} />
          Back to Profile
        </Link>

        {/* Card */}
        <Card className="backdrop-blur-xl bg-white/70 border border-gray-200 shadow-2xl rounded-3xl">
          <div className="p-8 md:p-12">

            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold">
                Update Profile
              </h1>
              <p className="text-gray-500 mt-2">
                Keep your information up to date
              </p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-8">

              {/* Avatar Preview */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 ring-4 ring-orange-200 shadow-lg">
                    {image && !imageError ? (
                      <img
                        src={image}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={36} className="text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="absolute bottom-1 right-1 bg-orange-500 rounded-full p-2 shadow-md">
                    <Camera size={14} className="text-white" />
                  </div>
                </div>

                <p className="text-xs text-gray-400">
                  Live preview of your profile photo
                </p>
              </div>

              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>

                <p className="text-xs text-gray-400">
                  This name will be visible across the platform.
                </p>

                <Input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Profile Photo URL
                  <span className="ml-2 text-xs text-gray-400">(optional)</span>
                </label>

                <p className="text-xs text-gray-400">
                  Paste a direct image link.
                </p>

                <Input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value);
                    setImageError(false);
                  }}
                  className="rounded-xl"
                />

                {image && imageError && (
                  <p className="text-xs text-red-500">
                    Invalid image URL. Please check again.
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-6 text-lg font-medium bg-orange-600 hover:bg-orange-700 text-white shadow-lg"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  Save Changes
                </Button>

                <Button
                  variant="bordered"
                  onPress={() => router.push('/profile')}
                  className="w-full sm:w-auto px-8 py-6 text-lg border-gray-300 hover:bg-gray-100"
                  isDisabled={isLoading}
                >
                  Cancel
                </Button>
              </div>

            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}