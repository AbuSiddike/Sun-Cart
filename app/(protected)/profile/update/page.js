'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Input, Card } from '@heroui/react';
import { useSession, updateUser } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { ArrowLeft, User, ImageIcon, Camera } from 'lucide-react';

export default function UpdateProfilePage() {
  const { data: session, isPending, update } = useSession();
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
          <h1 className="text-3xl font-bold text-center mb-2">
            Update Profile
          </h1>
          <p className="text-center text-gray-500 text-sm mb-8">
            Keep your profile information up to date
          </p>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center gap-3 mb-2">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-orange-100 overflow-hidden bg-gray-100 flex items-center justify-center shadow-md">
                  {image && !imageError ? (
                    <img
                      src={image}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <User size={36} className="text-gray-400" />
                  )}
                </div>
                <div className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-1.5 shadow">
                  <Camera size={14} className="text-white" />
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Live preview of your profile photo
              </p>
            </div>

            {/* Full Name Field */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="fullName"
                className="text-sm font-semibold text-gray-700"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-1">
                This is the name displayed on your profile and across the
                platform.
              </p>
              <Input
                id="fullName"
                type="text"
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Profile Photo URL */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="imageUrl"
                className="text-sm font-semibold text-gray-700"
              >
                Profile Photo URL
                <span className="ml-2 text-xs font-normal text-gray-400">
                  (optional)
                </span>
              </label>
              <p className="text-xs text-gray-400 mb-1">
                Paste a direct link to your photo.
              </p>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/your-photo.jpg"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  setImageError(false);
                }}
              />
              {image && imageError && (
                <p className="text-xs text-red-500 mt-1">
                  Could not load image from this URL. Please check the link.
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                color="primary"
                className="flex-1 summer-gradient text-white font-semibold py-7 text-lg"
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="bordered"
                onPress={() => router.push('/profile')}
                className="flex-1 py-7 text-lg"
                isDisabled={isLoading}
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
