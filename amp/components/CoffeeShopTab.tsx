import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CoffeeShop } from '../app/data/CoffeeShop';
import { Coffee } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { coffeeShops, CoffeeShopData } from '../app/data/coffeeShops';
import NFTDataFetcher from './subcomp/NFTDataFetcher';

interface NFT {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'ultra rare' | 'unique';
}

const StatBar: React.FC<{ value: number, label: string }> = ({ value, label }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-green-400">{label}</span>
      <span className="text-sm font-medium text-green-400">{value}/10</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${value * 10}%` }}></div>
    </div>
  </div>
);

const CoffeeShopIcon: React.FC<{ shop: CoffeeShopData; size: number }> = ({ shop, size }) => {
  if (shop.customIcon && shop.iconUrl) {
    return (
      <div style={{ width: size, height: size }}>
        <img
          src={shop.iconUrl}
          alt={`${shop.name} Icon`}
          width={size}
          height={size}
          className="rounded-full"
        />
      </div>
    );
  } else {
    return (
      <div className={`w-${size} h-${size} bg-green-500/20 rounded-full flex items-center justify-center`}>
        <Coffee className={`w-${size/2} h-${size/2} text-green-500`} />
      </div>
    );
  }
};

const rarityColors = {
  common: '#ffffff',
  uncommon: '#1eff00',
  rare: '#0070dd',
  epic: '#a335ee',
  legendary: '#ff8000',
};

interface CoffeeShopTabProps {
  selectedShopId: string | null;
}

export function CoffeeShopTab({ selectedShopId }: CoffeeShopTabProps) {
  const [selectedShop, setSelectedShop] = useState<CoffeeShopData | null>(null);
  const searchParams = useSearchParams();
  const selectedShopIdFromUrl = searchParams.get('shop');
  const shopListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (selectedShopIdFromUrl && shopListRef.current) {
      const shopElement = document.getElementById(`shop-${selectedShopIdFromUrl}`);
      if (shopElement) {
        shopElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setSelectedShop(coffeeShops.find(s => s.id === selectedShopIdFromUrl) || null);
      }
    }
  }, [selectedShopIdFromUrl]);

  // Add this new component for rendering NFT cards
  const NFTCard = ({ nft }: { nft: NFT }) => {
    const glowColor = useMemo(() => 
      rarityColors[nft.rarity.toLowerCase() as keyof typeof rarityColors] || rarityColors.common, 
      [nft.rarity]
    );

    return (
      <div className="relative w-full pb-[140%] bg-gray-900 rounded-lg overflow-hidden shadow-lg nft-card">
        <div className="absolute inset-0 glow-effect" style={{ '--glow-color': glowColor } as React.CSSProperties}></div>
        <img 
          src={nft.image} 
          alt={nft.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <h3 className="text-white text-sm font-bold truncate">{nft.name}</h3>
          <p className="text-gray-300 text-xs capitalize">{nft.rarity}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 bg-black/80 p-4 rounded-lg border border-green-500/50">
        <h2 className="text-xl font-semibold mb-4 text-green-400">Coffee Shops</h2>
        <ul ref={shopListRef}>
          {coffeeShops.map((shop) => (
            <li
              key={shop.id}
              id={`shop-${shop.id}`}
              className={`cursor-pointer p-2 rounded ${
                selectedShop?.id === shop.id ? 'bg-green-500/20' : 'hover:bg-green-500/10'
              }`}
              onClick={() => setSelectedShop(shop)}
            >
              {shop.name}
            </li>
          ))}
        </ul>
      </div>
      
      {selectedShop && (
        <div className="col-span-2 bg-black/60 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <CoffeeShopIcon shop={selectedShop} size={64} />
            <div className="ml-4">
              <h2 className="text-2xl font-bold mb-1 text-green-500">{selectedShop.name}</h2>
              <p className="text-gray-300 text-sm">{selectedShop.address}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">About</h3>
              <div className="flex flex-col items-start">
                {selectedShop.descriptionImageUrl && (
                  <div 
                    className="mb-4"
                    style={{
                      animation: 'float 6s ease-in-out infinite',
                      borderRadius: '8px',
                    }}
                  >
                    <img
                      src={selectedShop.descriptionImageUrl}
                      alt={`${selectedShop.name} Description`}
                      width="200"
                      height="200"
                      className="rounded-md"
                      style={{
                        boxShadow: '0 5px 15px 0px rgba(0,255,0,0.6)',
                      }}
                      onError={(e) => {
                        console.error("Error loading image:", e.currentTarget.src);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <p className="text-gray-300 text-sm">{selectedShop.description}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">Stats</h3>
              <StatBar value={selectedShop.stats.variety} label="Variety" />
              <StatBar value={selectedShop.stats.quality} label="Quality" />
              <StatBar value={selectedShop.stats.vibe} label="Vibe" />
              <StatBar value={selectedShop.stats.value} label="Value" />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="bg-gray-800 p-3 rounded">
              <span className="block text-green-400 font-medium">Rating</span>
              <span className="text-white">{selectedShop.rating}/5</span>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <span className="block text-green-400 font-medium">Popularity</span>
              <span className="text-white capitalize">{selectedShop.popularity}</span>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <span className="block text-green-400 font-medium">Speciality</span>
              <span className="text-white">{selectedShop.speciality}</span>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-green-400 mb-4">NFT Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {selectedShop.nftGallery.map((nft) => (
                <NFTCard key={nft.id} nft={{...nft, rarity: nft.rarity as NFT['rarity']}} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

<style jsx>{`
  .nft-card {
    animation: pulse 2s infinite;
  }

  .glow-effect {
    pointer-events: none;
    position: absolute;
    inset: -2px;
    background: radial-gradient(circle at 50% 50%, var(--glow-color), transparent 70%);
    opacity: 0.5;
    z-index: 10;
    mix-blend-mode: screen;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--glow-color);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`}</style>
