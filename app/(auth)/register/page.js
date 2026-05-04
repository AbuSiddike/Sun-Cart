'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '@heroui/react';
import toast from 'react-hot-toast';
import { signIn } from '@/lib/auth-client';
import { FaGoogle } from 'react-icons/fa';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
        image: photoUrl || undefined,
        callbackURL: '/login',
      });

      if (result.error) {
        toast.error(result.error.message || 'Registration failed');
      } else {
        toast.success('Account created successfully! Please login.');
        router.push('/login');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      toast.error('Google sign in failed. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <Card className="w-full max-w-lg mx-auto shadow-xl border border-gray-200">
        <Card.Header className="flex flex-col items-center gap-3 pb-6">
          <div className="text-5xl">☀️</div>
          <h1 className="text-3xl font-bold text-center">Create Account</h1>
          <p className="text-gray-500 text-center">
            Join SunCart for summer essentials
          </p>
        </Card.Header>

        <Card.Content className="px-8 py-6">
          {/* Google Button */}
          <Button
            onPress={handleGoogleRegister}
            isLoading={isGoogleLoading}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
            // startContent={<Globe size={20} />}
            size="lg"
          >
            <FaGoogle size={20} />
            Continue with Google
          </Button>

          {/* Simple Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 gap-5">
              <Input
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
                variant="bordered"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                variant="bordered"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                type="url"
                label="Photo URL"
                placeholder="https://example.com/photo.jpg"
                variant="bordered"
                size="lg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              <Input
                type="password"
                label="Password"
                placeholder="Create a strong password"
                variant="bordered"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              color="primary"
              className="w-full summer-gradient text-white font-semibold py-6 text-lg"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="flex justify-center pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-orange-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}
