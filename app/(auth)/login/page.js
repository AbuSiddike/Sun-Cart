'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Input, Card } from '@heroui/react';
import toast from 'react-hot-toast';
import { signIn } from '@/lib/auth-client';
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: '/',
      });

      if (result.error) {
        toast.error(result.error.message || 'Invalid credentials');
      } else {
        toast.success('Login successful! Welcome back.');
        router.push('/');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });
    } catch (error) {
      toast.error('Google login failed. Please try again.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <Card.Header className="flex flex-col items-center gap-3 pb-6">
          <div className="text-5xl">☀️</div>
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
          <p className="text-gray-500 text-center">Sign in to access SunCart</p>
        </Card.Header>

        <Card.Content className="space-y-6">
          {/* Google Login Button */}
          <Button
            onPress={handleGoogleLogin}
            isLoading={isGoogleLoading}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
            // startContent={<FaGoogle size={20} />}
            size="lg"
          >
            <FaGoogle size={20} />Continue with Google
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-5">
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              color="primary"
              className="w-full summer-gradient text-white font-semibold py-6 text-lg"
              isLoading={isLoading}
            >
              Login with Email
            </Button>
          </form>
        </Card.Content>

        <Card.Footer className="flex justify-center pt-4">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-orange-600 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}
