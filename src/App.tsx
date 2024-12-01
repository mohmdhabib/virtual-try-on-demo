import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { TryOnModal } from './components/TryOnModal';
import { products } from './data/products';
import type { Product, TryOnState } from './types';

function App() {
  const [tryOnState, setTryOnState] = useState<TryOnState>({
    isActive: false,
    selectedProduct: null,
  });

  const handleTryOn = (product: Product) => {
    setTryOnState({
      isActive: true,
      selectedProduct: product,
    });
  };

  const handleCloseTryOn = () => {
    setTryOnState({
      isActive: false,
      selectedProduct: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onTryOnClick={() => setTryOnState({ ...tryOnState, isActive: true })} />
      <Hero />
      <ProductGrid products={products} onTryOn={handleTryOn} />
      <TryOnModal
        isOpen={tryOnState.isActive}
        onClose={handleCloseTryOn}
        selectedProduct={tryOnState.selectedProduct}
      />
    </div>
  );
}

export default App;