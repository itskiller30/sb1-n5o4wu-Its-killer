import { useState } from 'react';
import { Product } from '../types';
import { processAffiliateLinks } from '../utils/affiliate';

export const useProductApproval = () => {
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);

  const approveProduct = (productId: string, moderationNote?: string) => {
    setPendingProducts(current => {
      const product = current.find(p => p.id === productId);
      if (!product) return current;

      // Generate affiliate links
      const affiliateLinks = processAffiliateLinks(product.marketplaceLinks);

      // Update product with approval info and affiliate links
      const approvedProduct: Product = {
        ...product,
        status: 'approved',
        approvedAt: new Date().toISOString(),
        moderationNote,
        affiliateLinks
      };

      return current.map(p => p.id === productId ? approvedProduct : p);
    });
  };

  const rejectProduct = (productId: string, moderationNote: string) => {
    setPendingProducts(current => 
      current.map(p => p.id === productId 
        ? { ...p, status: 'rejected', moderationNote }
        : p
      )
    );
  };

  return {
    pendingProducts,
    setPendingProducts,
    approveProduct,
    rejectProduct
  };
};

export default useProductApproval;