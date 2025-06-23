import React from 'react';
import { Star, ThumbsUp, ShoppingCart, ExternalLink, Zap } from 'lucide-react';
import { Product } from '../types';
import { trackAffiliateClick, generateAffiliateLink, findBestDeal } from '../utils/affiliate';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handlePurchaseClick = async (marketplace: string, url: string) => {
    await trackAffiliateClick(product.id, marketplace);
    const affiliateUrl = generateAffiliateLink(url, marketplace as any);
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  const bestDeal = findBestDeal(product.marketplaceLinks);

  return (
    <div className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
          <Zap className="w-4 h-4" />
          {product.rating.toFixed(1)}
        </div>

        {/* Best Price Badge */}
        {bestDeal && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Best Price
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
          {product.name}
        </h3>

        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            {bestDeal ? (
              <div>
                <span className="text-xl font-bold text-green-400">
                  ${bestDeal.price.toLocaleString()}
                </span>
                <div className="text-xs text-green-400">
                  Best at {bestDeal.marketplace}
                </div>
              </div>
            ) : (
              <span className="text-xl font-bold text-blue-400">
                ${product.price.toLocaleString()}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-gray-400">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">{product.reviews.toLocaleString()}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Purchase Button */}
        <div className="space-y-2">
          {bestDeal ? (
            <button
              onClick={() => handlePurchaseClick(bestDeal.marketplace, product.marketplaceLinks[bestDeal.marketplace] || '')}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Best Price: ${bestDeal.price}
            </button>
          ) : (
            <button
              onClick={() => handlePurchaseClick('amazon', product.marketplaceLinks.amazon || '')}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now - ${product.price.toLocaleString()}
            </button>
          )}
          
          {/* Secondary marketplace options */}
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(product.marketplaceLinks)
              .filter(([marketplace]) => marketplace !== bestDeal?.marketplace)
              .slice(0, 2)
              .map(([marketplace, url]) => (
              <button
                key={marketplace}
                onClick={() => handlePurchaseClick(marketplace, url)}
                className="py-2 px-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 transition-all duration-300 flex items-center justify-center gap-1 text-sm"
              >
                <ExternalLink className="w-3 h-3" />
                {marketplace.charAt(0).toUpperCase() + marketplace.slice(1)}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 text-center">
            Affiliate links • No extra cost to you
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;