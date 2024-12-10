import React from 'react';
import { Star, Award, ThumbsUp, ShoppingCart, ExternalLink, Tag, Gift } from 'lucide-react';
import { Product } from '../types';
import { formatProductUrl } from '../utils/domain';

interface ProductHighlightProps {
  product: Product;
}

const ProductHighlight: React.FC<ProductHighlightProps> = ({ product }) => {
  const productUrl = formatProductUrl(product);

  const renderMarketplaceButton = (marketplace: string, url?: string) => {
    if (!url) return null;
    
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 text-sm font-semibold border border-holiday-gold/20"
      >
        <ShoppingCart className="w-4 h-4" />
        View on {marketplace}
      </a>
    );
  };

  return (
    <div className="bg-gradient-to-br from-holiday-pine to-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-holiday-gold/20">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute top-4 right-4 bg-holiday-gold text-gray-900 px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
          <Star className="w-5 h-5" />
          {product.rating.toFixed(1)}
        </div>
        <div className="absolute top-4 left-4 bg-holiday-red text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
          <Gift className="w-5 h-5" />
          Most Recommended
        </div>
        {product.lowestPrice && (
          <div className="absolute bottom-4 right-4 bg-holiday-green text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5">
            <Tag className="w-5 h-5" />
            Best Price: ${product.lowestPrice.toLocaleString()} on {product.lowestPriceMarketplace}
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-3xl font-bold text-holiday-snow mb-2">{product.name}</h2>
            <p className="text-xl text-holiday-gold font-semibold">
              ${product.price.toLocaleString()}
            </p>
          </div>
          <a 
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-holiday-silver hover:text-holiday-gold transition-colors"
          >
            <ExternalLink className="w-6 h-6" />
          </a>
        </div>
        
        <p className="text-gray-300 text-lg mb-6">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-6">
          <ThumbsUp className="w-5 h-5 text-holiday-gold" />
          <span className="text-gray-300">
            <strong className="text-holiday-snow">{product.reviews.toLocaleString()}</strong> people recommend this
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-holiday-pine text-holiday-silver rounded-full text-sm border border-holiday-gold/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {product.marketplaceLinks?.amazon && renderMarketplaceButton('Amazon', product.marketplaceLinks.amazon)}
          {product.marketplaceLinks?.ebay && renderMarketplaceButton('eBay', product.marketplaceLinks.ebay)}
          {product.marketplaceLinks?.walmart && renderMarketplaceButton('Walmart', product.marketplaceLinks.walmart)}
          {product.marketplaceLinks?.other && renderMarketplaceButton('Other Store', product.marketplaceLinks.other)}
        </div>
      </div>
    </div>
  );
};

export default ProductHighlight;