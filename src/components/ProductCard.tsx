import React from 'react';
import { Star, ThumbsUp, ShoppingCart, ExternalLink, Award, Shield, Users, Zap } from 'lucide-react';
import { Product } from '../types';
import { trackAffiliateClick, generateAffiliateLink, findBestDeal } from '../utils/affiliate';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const handlePurchaseClick = async (marketplace: string, url: string) => {
    await trackAffiliateClick(product.id, marketplace);
    const affiliateUrl = generateAffiliateLink(url, marketplace as any);
    window.open(affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  const bestDeal = findBestDeal(product.marketplaceLinks);

  const cardClasses = featured
    ? "group bg-white/10 border border-orange-500/50 rounded-lg overflow-hidden hover:border-orange-500 transition-all"
    : "group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all";

  return (
    <div className={cardClasses}>
      <div className="relative h-48 overflow-hidden bg-slate-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" />
            {product.rating.toFixed(1)}
          </div>
          {featured && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        {bestDeal && (
          <div className="absolute top-3 left-3">
            <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
              Best Price
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className={`font-bold text-white mb-2 line-clamp-2 ${featured ? 'text-lg' : 'text-base'}`}>
          {product.name}
        </h3>

        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            {bestDeal ? (
              <div>
                <span className="text-xl font-bold text-white">
                  ${bestDeal.price.toLocaleString()}
                </span>
                <div className="text-xs text-slate-400">
                  at {bestDeal.marketplace}
                </div>
              </div>
            ) : (
              <span className="text-xl font-bold text-white">
                ${product.price.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Users className="w-4 h-4" />
            <span className="text-sm">{product.reviews.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-white/10 text-slate-300 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {bestDeal ? (
            <button
              onClick={() => handlePurchaseClick(bestDeal.marketplace, product.marketplaceLinks[bestDeal.marketplace] || '')}
              className="w-full py-2.5 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy for ${bestDeal.price}
            </button>
          ) : (
            <button
              onClick={() => handlePurchaseClick('amazon', product.marketplaceLinks.amazon || '')}
              className="w-full py-2.5 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(product.marketplaceLinks)
              .filter(([marketplace]) => marketplace !== bestDeal?.marketplace)
              .slice(0, 2)
              .map(([marketplace, url]) => (
              <button
                key={marketplace}
                onClick={() => handlePurchaseClick(marketplace, url)}
                className="py-2 px-3 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1 text-xs"
              >
                <ExternalLink className="w-3 h-3" />
                {marketplace.charAt(0).toUpperCase() + marketplace.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;