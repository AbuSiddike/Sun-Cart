'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Card } from '@heroui/react';
import { products } from '@/lib/products';
import { Star, ArrowLeft, Package, Tag, ShoppingBag } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';

function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-pulse">
      {/* Back link skeleton */}
      <div className="h-5 w-40 bg-gray-200 rounded-full mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image skeleton */}
        <div className="rounded-3xl overflow-hidden bg-gray-200 aspect-square w-full" />

        {/* Info skeleton */}
        <div className="space-y-5 p-2">
          <div className="h-8 bg-gray-200 rounded-full w-3/4" />
          <div className="h-5 bg-gray-200 rounded-full w-1/3" />

          {/* Stars */}
          <div className="flex gap-2 pt-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />
            ))}
          </div>

          {/* Description lines */}
          <div className="space-y-2 pt-2">
            <div className="h-4 bg-gray-200 rounded-full w-full" />
            <div className="h-4 bg-gray-200 rounded-full w-5/6" />
            <div className="h-4 bg-gray-200 rounded-full w-4/6" />
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="h-16 bg-gray-200 rounded-2xl" />
            <div className="h-16 bg-gray-200 rounded-2xl" />
          </div>

          {/* Price */}
          <div className="h-12 bg-gray-200 rounded-full w-1/3" />

          {/* Button */}
          <div className="h-14 bg-gray-200 rounded-2xl w-full" />
        </div>
      </div>
    </div>
  );
}

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

  if (loading || isPending) return <LoadingSkeleton />;
  if (!product) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors duration-200 mb-10 font-medium text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          Back to All Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Product Image */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Product Information */}
          <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl flex flex-col gap-6">

            {/* Badge + Title */}
            <div>
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-1">
                {product.name}
              </h1>
              <p className="text-gray-400 text-base">by {product.brand}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-200 fill-gray-200'
                  }
                />
              ))}
              <span className="text-sm text-gray-400 ml-2 font-medium">
                ({product.rating})
              </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Description */}
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-orange-400 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Tag size={16} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Category</p>
                  <p className="font-semibold text-gray-800 text-sm">{product.category}</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                  <Package size={16} className="text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">In Stock</p>
                  <p className="font-semibold text-green-600 text-sm">{product.stock} units</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Price</p>
                <p className="text-4xl font-bold text-orange-600">${product.price}</p>
              </div>
            </div>

            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-7 text-base rounded-2xl transition-colors duration-200 flex items-center gap-2"
              size="lg"
            >
              <ShoppingBag size={18} />
              Add to Cart — Coming Soon
            </Button>

            <p className="text-center text-xs text-gray-400">
              Logged in as{' '}
              <span className="font-semibold text-gray-600">{session?.user?.name}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}