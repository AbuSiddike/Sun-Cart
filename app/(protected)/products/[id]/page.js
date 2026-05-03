'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card } from '@heroui/react';
import { products } from '@/lib/products';
import { Star, ArrowLeft } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentication Check
  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error('Please login to view product details');
      router.push(`/login?callbackUrl=/products/${params.id}`);
      return;
    }
  }, [session, isPending, router, params.id]);

  // Load Product
  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(params.id));

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      toast.error('Product not found');
      router.push('/products');
    }

    setLoading(false);
  }, [params.id, router]);

  if (loading || isPending) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-orange-600 hover:underline mb-8 font-medium"
      >
        <ArrowLeft size={20} />
        Back to All Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Information */}
        <Card className="p-10 shadow-xl">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-500 text-xl mb-6">by {product.brand}</p>

            <div className="flex items-center gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
              <span className="text-2xl ml-4 text-gray-600">
                ({product.rating})
              </span>
            </div>

            <div className="mb-10">
              <h3 className="font-semibold text-2xl mb-4">Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-10 text-lg">
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium">{product.category}</p>
              </div>
              <div>
                <p className="text-gray-500">Stock Available</p>
                <p className="font-medium text-green-600">
                  {product.stock} units
                </p>
              </div>
            </div>

            <div className="text-5xl font-bold text-orange-600 mb-8">
              ${product.price}
            </div>

            <Button
              color="primary"
              className="w-full summer-gradient text-white font-semibold py-8 text-xl"
              size="lg"
            >
              Add to Cart - Coming Soon
            </Button>

            <p className="text-center text-sm text-gray-500 mt-6">
              You are logged in as{' '}
              <span className="font-medium">{session?.user?.name}</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
