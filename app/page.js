'use client';

import Link from 'next/link';
import { Button, Card } from '@heroui/react';
import { products } from '@/lib/products';
import { Star } from 'lucide-react';
import Lottie from 'lottie-react';
import Image from 'next/image';

export default function HomePage() {
  const popularProducts = products.slice(0, 3);
  const brands = [
    {
      name: 'Sun Shade',
      image: '/sun_shade.jpg',
      desc: 'Premium Sunglasses',
    },
    {
      name: 'Beach Vibe',
      image: '/beachVibe.jpg',
      desc: 'Summer Outfits',
    },
    {
      name: 'Glow Skin',
      image: '/glow_skin.jpg',
      desc: 'Skincare Essentials',
    },
    {
      name: 'Wave Walk',
      image: '/wave_walk.jpg',
      desc: 'Beach Footwear',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="summer-gradient text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-6 py-2 rounded-full mb-6 backdrop-blur-sm">
            Summer Sale 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-tight">
            Get Ready for Summer Vibes
          </h1>

          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 opacity-90">
            Premium summer essentials at unbeatable prices. Sunglasses, outfits,
            skincare & more.
          </p>

          {/* Lottie Animation */}
          <div className="flex justify-center mb-10">
            <div className="w-64 h-64">
              <Lottie
                animationData={require('../public/summer-lottie.json')}
                loop={true}
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-white/90 font-semibold px-12 py-7 text-lg"
              >
                Shop Now
              </Button>
            </Link>

            <Link href="#tips">
              <Button
                size="lg"
                variant="bordered"
                className="text-white border-white hover:bg-white/10 px-10 py-7 text-lg"
              >
                Summer Tips
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-4xl font-bold text-gray-900">
            Popular This Summer
          </h2>
          <Link
            href="/products"
            className="text-orange-600 hover:underline font-medium text-lg"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.stock < 10 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Only {product.stock} left
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-xl line-clamp-2 pr-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-orange-600">
                    ₹{product.price}
                  </p>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.rating})
                  </span>
                </div>

                <Link href={`/products/${product.id}`}>
                  <Button
                    color="primary"
                    className="w-full summer-gradient font-medium py-6"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Summer Care Tips */}
      <section id="tips" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">
            Summer Care Tips
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-md mx-auto">
            Stay safe and enjoy the sunshine with these essential tips
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Stay Hydrated',
                desc: 'Drink at least 3-4 liters of water daily',
              },
              {
                title: 'Sun Protection',
                desc: 'Apply SPF 50+ sunscreen every 2 hours',
              },
              {
                title: 'Light Clothing',
                desc: 'Wear breathable, light-colored fabrics',
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="bg-orange-50 p-10 rounded-3xl hover:shadow-lg transition-shadow"
              >
                <div className="text-6xl mb-6">{tip.emoji}</div>
                <h3 className="text-2xl font-semibold mb-3">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Top Summer Brands</h2>
          <p className="text-gray-500 mb-16 max-w-xl mx-auto">
            Discover premium brands curated for your perfect summer lifestyle
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Circle Image */}
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-orange-100 opacity-0 group-hover:opacity-100 transition"></div>

                  <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-200 group-hover:border-orange-300 transition">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      // fill
                      className="object-contain group-hover:scale-110 transition duration-500"
                      height={500} width={500}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-lg mb-1 group-hover:text-orange-600 transition">
                  {brand.name}
                </h3>
                <p className="text-gray-500 text-sm">{brand.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
