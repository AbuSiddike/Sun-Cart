import Link from 'next/link';
import { Button } from '@heroui/react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <div className="text-8xl mb-6">☀️</div>

        <h1 className="text-7xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 text-lg mb-10">
          The summer essentials page you're looking for doesn't exist or has
          been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              color="primary"
              className="summer-gradient px-10 py-7 text-lg font-medium w-full sm:w-auto"
            >
              Return to Home
            </Button>
          </Link>

          <Link href="/products">
            <Button
              variant="bordered"
              className="px-10 py-7 text-lg w-full sm:w-auto"
            >
              Browse Products
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-12">
          SunCart - Summer Essentials Store
        </p>
      </div>
    </div>
  );
}
