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
      <section
        className="relative text-white py-20 md:py-32 overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/Beach_hero.avif')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/60 via-orange-300/40 to-black/70" />

        <div
          className="absolute inset-0 bg-radial-gradient pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-white/20 text-white text-sm font-medium px-6 py-2 rounded-full mb-6 backdrop-blur-sm border border-white/30">
            🌞 Summer Sale 2026
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-tight drop-shadow-lg">
            Get Ready for Summer Vibes
          </h1>

          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 opacity-90 drop-shadow">
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
                className="bg-white text-orange-600 hover:bg-white/90 font-semibold px-12 py-7 text-lg shadow-lg"
              >
                Shop Now
              </Button>
            </Link>

            <Link href="#tips">
              <Button
                size="lg"
                variant="bordered"
                className="text-white border-white hover:bg-white/10 px-10 py-7 text-lg backdrop-blur-sm"
              >
                Summer Tips
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                Trending Now
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                Popular This Summer
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 font-semibold text-sm uppercase tracking-widest transition-colors group"
            >
              View All
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Stock badge */}
                  {product.stock < 10 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">
                      Only {product.stock} left
                    </div>
                  )}

                  {/* Price badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-orange-600 font-bold text-base px-3 py-1 rounded-full shadow">
                    ${product.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 tracking-tight group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={15}
                        className={
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-200 fill-gray-200'
                        }
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-2 font-medium">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Bottom divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5" />

                  {/* CTA */}
                  <Link href={`/products/${product.id}`} className="mt-auto">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 rounded-2xl transition-colors duration-200">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summer Care Tips */}
      <section id="tips" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Expert Advice
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Summer Care Tips
            </h2>
            <p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
              Stay safe and enjoy the sunshine with these essential tips
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: '💧',
                tag: '01',
                title: 'Stay Hydrated',
                desc: 'Drink at least 3–4 liters of water daily. Carry a reusable bottle and add electrolytes to stay refreshed throughout the day.',
                accent: 'from-blue-50 to-cyan-50',
                border: 'border-blue-100',
                iconBg: 'bg-blue-100',
              },
              {
                emoji: '🌞',
                tag: '02',
                title: 'Sun Protection',
                desc: "Apply SPF 50+ sunscreen every 2 hours. Don't forget your ears, neck, and the back of your hands — often overlooked areas.",
                accent: 'from-orange-50 to-amber-50',
                border: 'border-orange-100',
                iconBg: 'bg-orange-100',
              },
              {
                emoji: '👕',
                tag: '03',
                title: 'Light Clothing',
                desc: 'Wear breathable, light-colored fabrics like linen and cotton. Loose fits allow air circulation and keep your body temperature down.',
                accent: 'from-green-50 to-emerald-50',
                border: 'border-green-100',
                iconBg: 'bg-green-100',
              },
            ].map((tip, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-br ${tip.accent} border ${tip.border} p-8 rounded-3xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden`}
              >
                <span className="absolute top-4 right-6 text-7xl font-black text-black/5 select-none group-hover:text-black/[0.07] transition-colors">
                  {tip.tag}
                </span>

                <div
                  className={`w-14 h-14 ${tip.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm`}
                >
                  {tip.emoji}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {tip.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {tip.desc}
                </p>

                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

                <p className="mt-4 text-xs font-semibold text-orange-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn more →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands Section */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Featured Brands
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Top Summer Brands
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
              Discover premium brands curated for your perfect summer lifestyle
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="relative group bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Circle Image */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-orange-100 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />

                  <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-200 group-hover:border-orange-300 transition-colors duration-300">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      height={500}
                      width={500}
                      className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-1 tracking-tight group-hover:text-orange-600 transition-colors text-center">
                  {brand.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed text-center">
                  {brand.desc}
                </p>

                <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                <p className="mt-4 text-xs font-semibold text-orange-500 uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
