import React from 'react';
import { Button } from "@/components/ui/button";
import { ZoomIn, Star, Coffee, Users } from "lucide-react";
import { CoffeeShopData } from '@/app/data/coffeeShops';
import './custom-leaflet-popup.css';
import { useRouter } from 'next/navigation';
import { Card } from '@/app/data/card';

interface CoffeeShopPopupProps {
  shop: CoffeeShopData; 
  onClose?: () => void;
  onZoomIn: (lat: number, lng: number) => void;
  onGoToShop?: (shopId: string) => void;
}

const StatBar: React.FC<{ value: number, label: string }> = ({ value, label }) => (
  <div className="flex items-center mb-1">
    <span className="text-xs font-medium text-green-400 w-16">{label}</span>
    <div className="w-24 bg-black rounded-full h-1.5 ml-2 overflow-hidden">
      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${value * 10}%` }}></div>
    </div>
    <span className="text-xs font-medium text-green-400 ml-2">{value}/10</span>
  </div>
);

export const CoffeeShopPopup: React.FC<CoffeeShopPopupProps> = ({ shop, onZoomIn, onGoToShop }) => {
  const router = useRouter();

  const card = new Card(
    'strain', 
    'weddincake', 
    '/images/CARD/STRAIN/cardweddingcake.png', 
    '/images/CARD/STRAIN/cardback.png' 
  );
  
  const card2 = new Card(
    'strain', 
    'gelato', 
    '/images/CARD/STRAIN/cardgelato.png', 
    '/images/CARD/STRAIN/cardback.png' 
  );

  return (
    <div className="w-64 bg-black/90 p-4 rounded-lg border border-green-500/50 shadow-lg shadow-green-500/20">
      <h3 className="text-lg font-semibold text-green-400 mb-2">{shop.name}</h3>
      <p className="text-xs text-green-300 mb-2">{shop.address}</p>
      
      <div className="flex items-center justify-between text-xs text-green-300 mb-2">
        <div className="flex items-center">
          <Star className="w-3 h-3 mr-1 text-green-400" /> {shop.rating}
        </div>
        <div className="flex items-center">
          <Coffee className="w-3 h-3 mr-1 text-green-400" /> {shop.speciality}
        </div>
        <div className="flex items-center">
          <Users className="w-3 h-3 mr-1 text-green-400" /> {shop.popularity}
        </div>
      </div>
      
      <div className="mb-2">
        <StatBar value={shop.stats.variety} label="Variety" />
        <StatBar value={shop.stats.quality} label="Quality" />
        <StatBar value={shop.stats.vibe} label="Vibe" />
        <StatBar value={shop.stats.value} label="Value" />
      </div>
      
      <div className="mb-2">
        <p className="text-xs font-medium text-green-400 mb-1">NFT Gallery:</p>
        <div className="flex flex-wrap">
          {shop.nftGallery.slice(0, 3).map((nft, index) => (
            <div key={nft.id} className="w-8 h-8 mr-1 mb-1 relative rounded overflow-hidden border border-green-500/50">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-xs font-bold text-green-400">{nft.rarity.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          ))}
          {shop.nftGallery.length > 3 && (
            <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center border border-green-500/50">
              <span className="text-xs font-bold text-green-400">+{shop.nftGallery.length - 3}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Miniature */}
      <div className="mb-2">
        <p className="text-xs font-medium text-green-400 mb-1">Card:</p>
        <div 
          className="w-20 h-20 relative overflow-hidden"
          onClick={() => router.push('/DECK')}
          style={{ transition: 'transform 0.3s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.5)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img
            src={card.getFrontImage()} // Updated method
            alt={card.getDescription()}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* New Card Miniature */}
      <div className="mb-2">
        <p className="text-xs font-medium text-green-400 mb-1">New Card:</p>
        <div 
          className="w-20 h-20 relative overflow-hidden"
          onClick={() => router.push('/DECK')}
          style={{ transition: 'transform 0.3s' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.5)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img
            src={card2.getFrontImage()} // Updated method
            alt={card2.getDescription()}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          className="bg-green-500/20 text-green-400 hover:bg-green-500/40 border border-green-500/50" 
          size="sm"
          onClick={() => onGoToShop?.(shop.id)}
        >
          Go to Shop
        </Button>
        <Button 
          className="bg-green-500/20 text-green-400 hover:bg-green-500/40 border border-green-500/50" 
          size="sm"
          onClick={() => onZoomIn(shop.lat, shop.lng)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
