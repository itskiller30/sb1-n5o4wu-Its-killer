import React from 'react';
import { Star, ThumbsUp, ShoppingCart, ExternalLink, Tag, TrendingUp, Award, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleBuyClick = (marketplace: string, url: string) => {
    window.open(url, '_blank');
  };

  const getBestPrice = () => {
    if (product.lowestPrice && product.lowestPriceMarketplace) {
      return {
        price: product.lowestPrice,
        marketplace: product.lowestPriceMarketplace,
        savings: product.price - product.lowestPrice
      };
    }
    return null;
  };

  const bestPrice = getBestPrice();

  return (
    <div className="group relative">
      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-holiday-red/20 via-holiday-gold/20 to-holiday-green/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

      {/* Card Content */}
      <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-2xl">
        <div className="relative h-56 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-holiday-gold/95 backdrop-blur-sm text-gray-900 px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
            <Zap className="w-4 h-4" />
            {product.rating.toFixed(1)}
          </div>

          {/* Best Price Badge */}
          {bestPrice && bestPrice.savings > 0 && (
            <div className="absolute top-3 left-3 bg-holiday-green/95 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
              <Tag className="w-4 h-4" />
              Save ${bestPrice.savings.toFixed(0)}
            </div>
          )}

          {/* Community Verified Badge */}
          <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-holiday-gold px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <Award className="w-3 h-3" />
            Community Verified
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-holiday-gold transition-colors leading-tight">
              {product.name}
            </h3>
          </div>

          <p className="text-holiday-silver/80 text-sm mb-4 line-clamp-2 group-hover:text-holiday-silver transition-colors leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              {bestPrice ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-holiday-green">
                      ${bestPrice.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-holiday-silver/60 line-through">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-holiday-green flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Best at {bestPrice.marketplace}
                  </div>
                </div>
              ) : (
                <span className="text-xl font-bold text-holiday-gold">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-holiday-silver">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">{product.reviews.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-800/50 backdrop-blur-sm text-holiday-silver/80 rounded-full text-xs border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Marketplace Buttons */}
          <div className="space-y-2">
            {bestPrice && (
              <button
                onClick={() => handleBuyClick(bestPrice.marketplace, product.marketplaceLinks[bestPrice.marketplace.toLowerCase()] || '')}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-holiday-green via-holiday-green/90 to-holiday-green/80 hover:from-holiday-green/90 hover:to-holiday-green text-white font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                Best Price: ${bestPrice.price} at {bestPrice.marketplace}
              </button>
            )}
            
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(product.marketplaceLinks).slice(0, 2).map(([marketplace, url]) => (
                <button
                  key={marketplace}
                  onClick={() => handleBuyClick(marketplace, url)}
                  className="py-2 px-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 text-holiday-silver hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-1.5 text-sm font-medium"
                >
                  <ExternalLink className="w-3 h-3" />
                  {marketplace.charAt(0).toUpperCase() + marketplace.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;