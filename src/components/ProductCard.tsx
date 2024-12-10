import React from 'react';
import { Star, ThumbsUp, ShoppingCart, ExternalLink, Clock, Tag, TrendingUp } from 'lucide-react';
import { Product } from '../types';
import { formatProductUrl } from '../utils/domain';
import { trackAffiliateClick, findBestDeal } from '../utils/affiliate';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productUrl = formatProductUrl(product);
  const bestDeal = findBestDeal(product.marketplaceLinks);

  const handleBuyClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackAffiliateClick(product.id, product.lowestPriceMarketplace || 'unknown');
    window.open(getBuyLink(), '_blank');
  };

  const getBuyLink = () => {
    if (product.status !== 'approved') return productUrl;
    
    if (product.lowestPriceMarketplace && product.affiliateLinks?.[product.lowestPriceMarketplace.toLowerCase()]) {
      return product.affiliateLinks[product.lowestPriceMarketplace.toLowerCase()];
    }
    
    const firstAffiliateLink = product.affiliateLinks && Object.values(product.affiliateLinks)[0];
    return firstAffiliateLink || productUrl;
  };

  return (
    <div className="group relative">
      {/* Hover Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-holiday-red/20 via-holiday-gold/20 to-holiday-green/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

      {/* Card Content */}
      <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/20">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
          
          {product.status === 'pending' && (
            <div className="absolute top-2 left-2 bg-yellow-500/90 backdrop-blur-sm text-black px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Under Review
            </div>
          )}
          
          <div className="absolute top-2 right-2 bg-yellow-400/90 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4" />
            {product.rating.toFixed(1)}
          </div>

          {bestDeal && bestDeal.savings > 0 && (
            <div className="absolute bottom-2 right-2 bg-holiday-green/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Save ${bestDeal.savings.toFixed(2)}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white truncate group-hover:text-holiday-gold transition-colors">
              {product.name}
            </h3>
            <a 
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-holiday-silver hover:text-holiday-gold transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <p className="text-holiday-silver/80 text-sm mb-3 line-clamp-2 group-hover:text-holiday-silver transition-colors">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-holiday-gold">
                ${product.price.toLocaleString()}
              </span>
              {bestDeal && bestDeal.savings > 0 && (
                <span className="text-sm text-holiday-green flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Best Deal
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-holiday-silver">
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{product.reviews.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-800/50 backdrop-blur-sm text-holiday-silver/80 rounded-full text-xs border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <a 
            href={getBuyLink()}
            onClick={handleBuyClick}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              w-full py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300
              ${product.status === 'pending' 
                ? 'bg-gray-700/50 cursor-not-allowed' 
                : 'bg-gradient-to-r from-holiday-gold via-holiday-gold/90 to-holiday-gold/80 hover:from-holiday-gold/90 hover:to-holiday-gold text-gray-900 font-semibold cursor-pointer'
              }
            `}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.status === 'pending' ? 'Coming Soon' : 'Check Best Price & Buy'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;