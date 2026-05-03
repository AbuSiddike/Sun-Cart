'use client';

import Link from 'next/link';
import { Button, Card, Input } from '@heroui/react';
import { products } from '@/lib/products';
import { Star, Search } from 'lucide-react';
import { useState } from 'react';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            All Summer Products
          </h1>
          <p className="text-gray-500 mt-2">
            Find your perfect summer essential
          </p>
        </div>

        <div className="w-full md:w-96">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // startContent={<Search size={20} className="text-gray-400" />}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'solid' : 'flat'}
            color={selectedCategory === category ? 'primary' : 'default'}
            onPress={() => setSelectedCategory(category)}
            className={
              selectedCategory === category ? 'summer-gradient text-white' : ''
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg line-clamp-2 flex-1 pr-2">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-orange-600">
                    ${product.price}
                  </p>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[42px]">
                  {product.description}
                </p>

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
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
      )}
    </div>
  );
}
