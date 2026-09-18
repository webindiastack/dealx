import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredData, setStoredData, STORAGE_KEYS } from '../utils/localStorage';
import { INITIAL_PRODUCTS } from '../data/seedProducts';
import { useToast } from './ToastContext';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const { addToast } = useToast();

  const [products, setProducts] = useState(() => {
    const saved = getStoredData(STORAGE_KEYS.PRODUCTS, null);
    if (!saved || saved.length === 0) {
      setStoredData(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    return saved;
  });

  useEffect(() => {
    setStoredData(STORAGE_KEYS.PRODUCTS, products);
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      id: `prod-${Date.now()}`,
      title: productData.title,
      category: productData.category,
      price: Number(productData.price) || 0,
      location: productData.location || 'USA',
      condition: productData.condition || 'Brand New',
      description: productData.description || '',
      specs: productData.specs || {},
      images: productData.images && productData.images.length > 0
        ? productData.images
        : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'],
      inStock: productData.inStock ?? true,
      featured: productData.featured ?? false,
      createdDate: new Date().toISOString(),
    };

    setProducts((prev) => [newProduct, ...prev]);
    addToast(`Product "${newProduct.title}" created successfully!`, 'success', 'Product Added');
    return newProduct;
  };

  const updateProduct = (id, productData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productData, price: Number(productData.price) } : p))
    );
    addToast('Product details updated successfully.', 'success', 'Product Updated');
  };

  const deleteProduct = (id) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast(`Product "${target?.title || id}" deleted.`, 'warning', 'Product Removed');
  };

  const resetAllData = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetAllData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
