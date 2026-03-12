import React from 'react';
import { Coffee, MapPin, Star, Users, Award, Cannabis } from 'lucide-react';
import Image from 'next/image';

interface CoffeeShopProps {
  shop: {
    name: string;
    address: string;
    lat: number;
    lng: number;
    customIcon: boolean;
    iconUrl?: string;
    rating?: string;
    popularity?: string;
    speciality?: string;
    description: string;
    specialStrain?: {
      name: string;
      description: string;
      rarity: string;
      imageUrl: string;
    };
  };
}

export const CoffeeShop: React.FC<CoffeeShopProps> = ({ shop }) => {
  return (
    <div className="bg-black/60 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        {shop.customIcon && shop.iconUrl ? (
          <img 
            src={shop.iconUrl}
            alt={`${shop.name} Icon`}
            className="w-16 h-16 mr-4"
          />
        ) : (
          <div className="w-16 h-16 bg-green-500/20 rounded-full mr-4 flex items-center justify-center">
            <Coffee className="w-10 h-10 text-green-500" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold mb-1 text-green-500">{shop.name}</h2>
          <p className="text-gray-300 flex items-center text-sm">
            <MapPin className="w-4 h-4 mr-2" /> {shop.address}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-300">
          <Star className="w-5 h-5 mr-2 text-yellow-500" />
          <span>Rating: {shop.rating || 'N/A'}/5</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Users className="w-5 h-5 mr-2 text-blue-500" />
          <span>Popularity: {shop.popularity || 'N/A'}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <Award className="w-5 h-5 mr-2 text-purple-500" />
          <span>Speciality: {shop.speciality || 'Various'}</span>
        </div>
        <div className="flex items-center text-gray-300">
          <MapPin className="w-5 h-5 mr-2 text-red-500" />
          <span>Lat: {shop.lat.toFixed(4)}, Lng: {shop.lng.toFixed(4)}</span>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-green-400 mb-2">About</h3>
        <p className="text-gray-300 text-sm">
          {shop.description}
        </p>
      </div>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-green-400 mb-2">Menu Highlights</h3>
        <ul className="list-disc list-inside text-gray-300 text-sm grid grid-cols-2 gap-2">
          <li>Amsterdam Haze</li>
          <li>Dutch Treat</li>
          <li>Space Cakes</li>
          <li>Organic Teas</li>
          <li>Local Craft Beers</li>
          <li>Artisanal Coffee</li>
        </ul>
      </div>

      {shop.specialStrain && (
        <div className="mt-6 bg-green-900/30 p-4 rounded-lg border border-green-500/50">
          <h3 className="text-xl font-semibold text-green-400 mb-2 flex items-center">
            <Cannabis className="w-6 h-6 mr-2 text-green-500" />
            Special NFT Strain
          </h3>
          <div className="flex items-start space-x-4">
            <div className="w-1/3">
              <Image 
                src={shop.specialStrain.imageUrl} 
                alt={shop.specialStrain.name}
                width={150}
                height={150}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-2/3 text-gray-300 text-sm">
              <p className="font-bold text-green-300 mb-1">{shop.specialStrain.name}</p>
              <p className="mb-2 whitespace-pre-line">{shop.specialStrain.description}</p>
              <p className="text-yellow-400">
                Rarity: <span className="font-semibold">{shop.specialStrain.rarity}</span>
              </p>
              <p className="mt-2 text-green-400 italic">
                This unique NFT strain can be obtained by consuming in-shop!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
