import React from 'react';
import { Star, ThumbsUp, ShoppingCart, ExternalLink, Award, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const handlePurchaseClick = (marketplace: string, url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const cardClasses = featured 
    ? "group bg-gradient-to-br from-slate-800/90 via-slate-700/70 to-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl hover:border-emerald-400/60 transition-all duration-300"
    : "group bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]";

  return (
    <div className={cardClasses}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Zap className="w-3 h-3" />
          {product.rating.toFixed(1)}
        </div>

        {featured && (
          <div className="absolute top-3 left-3 bg-yellow-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <Award className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className={`font-bold text-white mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
          {product.name}
        </h3>

        <p className="text-slate-400 text-sm mb-4 line-clamp-2 group-hover:text-slate-300 transition-colors">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-emerald-400">
            ${product.price.toLocaleString()}
          </span>
          
          <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-300 transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">{product.reviews.toLocaleString()}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-full text-xs border border-slate-600/30 group-hover:border-emerald-500/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Purchase Options */}
        <div className="space-y-2">
          <button
            onClick={() => handlePurchaseClick('amazon', product.marketplaceLinks.amazon || '')}
            className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105 transform"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now - ${product.price.toLocaleString()}
          </button>
          
          {/* Secondary marketplace options */}
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(product.marketplaceLinks)
              .filter(([marketplace]) => marketplace !== 'amazon')
              .slice(0, 2)
              .map(([marketplace, url]) => (
              <button
                key={marketplace}
                onClick={() => handlePurchaseClick(marketplace, url)}
                className="py-2 px-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300 flex items-center justify-center gap-1 text-sm hover:scale-105 transform"
              >
                <ExternalLink className="w-3 h-3" />
                {marketplace.charAt(0).toUpperCase() + marketplace.slice(1)}
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-slate-500">
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text font-semibold">itsKiller</span> trusted partners • No extra cost to you
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;