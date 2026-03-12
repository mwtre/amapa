'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ZoomIn, ZoomOut, Plus, Coffee, Map as MapIcon, Layers } from "lucide-react";
import { useRouter } from 'next/navigation';
import { coffeeShops, coffeeShopIds, CoffeeShopData } from '@/app/data/coffeeShops';
import { CoffeeShopPopup } from './subcomp/CoffeeShopPopup';
import { NFTPopup } from './subcomp/NFTPopup';
import Link from 'next/link';

// NFT types and locations
const nftTypes = [
  { name: 'Hooker', icon: '👠', color: '#FF69B4' },
  // ... (rest of the nftTypes array)
];

const nftLocations = [
  { type: 'Hooker', lat: 52.3731, lng: 4.8976, name: 'Red Light District Diva' },
  // ... (rest of the nftLocations array)
];

// Icon creation functions
const createIcon = (icon: string) => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-black text-2xl">${icon}</div>`,
    className: 'custom-icon',
    iconSize: [64, 64],
    iconAnchor: [16, 16],
  });
};

// Function to create a custom icon with dynamic size
const createCustomIcon = (iconUrl: string, size: [number, number]) => new L.Icon({
  iconUrl,
  iconSize: size as L.PointExpression,
  iconAnchor: [size[0] / 2, size[1]] as L.PointExpression,
  popupAnchor: [0, -size[1]] as L.PointExpression,
});

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom, { animate: true, duration: 1 });
  return null;
}

function AddMarkerToClick() {
  const [markers, setMarkers] = useState<[number, number][]>([]);
  const map = useMapEvents({
    click(e) {
      const newMarker: [number, number] = [e.latlng.lat, e.latlng.lng];
      setMarkers([...markers, newMarker]);
    },
  });

  return (
    <>
      {markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            Custom Marker {idx + 1}
            <br />
            Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export const Map: React.FC = () => {
  const [selectedNFT, setSelectedNFT] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([52.3676, 4.9041]);
  const [mapZoom, setMapZoom] = useState(14);
  const [isAddingMarkers, setIsAddingMarkers] = useState(false);
  const [showNFTs, setShowNFTs] = useState(true);
  const [showCoffeeShops, setShowCoffeeShops] = useState(true);
  const [showInfluenceZones, setShowInfluenceZones] = useState(false);
  const router = useRouter();
  const mapRef = useRef<L.Map | null>(null);

  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  useEffect(() => {
    if (coffeeShopIds.length > 0) {
      setSelectedShopId(coffeeShopIds[0]);
    }
  }, []);

  const handleGoToShop = useCallback((shopId: string) => {
    setSelectedShopId(shopId);
  }, []);

  const handleZoomOut = useCallback(() => {
    setMapZoom(14);
    setMapCenter([52.3676, 4.9041]);
  }, []);

  const handleZoomIn = useCallback((lat: number, lng: number) => {
    setMapCenter([lat, lng]);
    setMapZoom(19);
  }, []);

  const toggleAddMarkers = useCallback(() => {
    setIsAddingMarkers(!isAddingMarkers);
  }, [isAddingMarkers]);

  const toggleNFTs = useCallback(() => setShowNFTs(prev => !prev), []);
  const toggleCoffeeShops = useCallback(() => setShowCoffeeShops(prev => !prev), []);
  const toggleInfluenceZones = useCallback(() => setShowInfluenceZones(prev => !prev), []);

  const getIconSize = useCallback(() => {
    return mapZoom >= 16 ? [48, 48] : [32, 32];
  }, [mapZoom]);

  const createCustomIcon = useCallback((iconUrl: string, size: [number, number]) => {
    return new L.Icon({
      iconUrl,
      iconSize: size as L.PointExpression,
      iconAnchor: [size[0] / 2, size[1]] as L.PointExpression,
      popupAnchor: [0, -size[1]] as L.PointExpression,
    });
  }, []);

  useEffect(() => {
    if (coffeeShops) {
      coffeeShops.forEach((shop) => {
        const icon = L.icon({
          iconUrl: shop.customIcon ? shop.iconUrl : '/images/default-marker.png',
          iconSize: [40, 40], // Adjust these values as needed
        });
        // ... rest of the code
      });
    }
  }, [coffeeShops]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="col-span-1 md:col-span-2 p-4 bg-black/80 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 text-green-400">Amsterdam NFT Hunt Map</h2>
        <div className="flex space-x-2 mb-4">
          <Button
            size="sm"
            variant={showNFTs ? "default" : "outline"}
            onClick={toggleNFTs}
            className={`bg-green-500/20 text-green-400 hover:bg-green-500/40 ${showNFTs ? 'border-green-500' : ''}`}
          >
            <MapIcon className="mr-2 h-4 w-4" /> NFTs
          </Button>
          <Button
            size="sm"
            variant={showCoffeeShops ? "default" : "outline"}
            onClick={toggleCoffeeShops}
            className={`bg-green-500/20 text-green-400 hover:bg-green-500/40 ${showCoffeeShops ? 'border-green-500' : ''}`}
          >
            <Coffee className="mr-2 h-4 w-4" /> Coffee Shops
          </Button>
          <Button
            size="sm"
            variant={showInfluenceZones ? "default" : "outline"}
            onClick={toggleInfluenceZones}
            className={`bg-green-500/20 text-green-400 hover:bg-green-500/40 ${showInfluenceZones ? 'border-green-500' : ''}`}
          >
            <Layers className="mr-2 h-4 w-4" /> Influence Zones
          </Button>
        </div>
        <div className="h-[60vh] rounded-lg overflow-hidden border border-green-500/50 relative">
          <MapContainer 
            center={mapCenter} 
            zoom={mapZoom} 
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <ChangeView center={mapCenter} zoom={mapZoom} />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {showNFTs && nftLocations.map((location, index) => (
              <Marker
                key={index}
                position={[location.lat, location.lng]}
                icon={createIcon(nftTypes.find(t => t.name === location.type)?.icon ?? 'default-icon')}
                eventHandlers={{
                  click: () => setSelectedNFT(location),
                }}
              >
                <Popup>
                  <NFTPopup name={location.name} type={location.type} />
                </Popup>
              </Marker>
            ))}
            {showCoffeeShops && coffeeShops?.map((shop: CoffeeShopData) => (
              <Marker 
                key={shop.id}
                position={[shop.lat, shop.lng]} 
                icon={createCustomIcon(shop.iconUrl, shop.iconSize || [32, 32])} // Use the iconSize property
              >
                <Popup>
                  <CoffeeShopPopup 
                    shop={shop}
                    onGoToShop={handleGoToShop}
                    onZoomIn={handleZoomIn}
                  />
                </Popup>
              </Marker>
            ))}
            {showInfluenceZones && coffeeShops.map((shop: CoffeeShopData) => (
              <Polygon
                key={`zone-${shop.id}`}
                positions={shop.influenceZone}
                pathOptions={{ color: shop.zoneColor, fillOpacity: 0.2, weight: 1 }}
              />
            ))}
            {isAddingMarkers && <AddMarkerToClick />}
          </MapContainer>
          <div className="absolute bottom-4 left-4 bg-black/80 p-2 rounded-md border border-green-500/50">
            <h3 className="text-sm font-semibold mb-2 text-green-400">Legend</h3>
            <div className="grid grid-cols-3 gap-2">
              {nftTypes.map((type, index) => (
                <div key={index} className="flex items-center">
                  <span className="mr-1 text-lg">{type.icon}</span>
                  <span className="text-xs">{type.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button 
            className="bg-green-500/20 text-green-400 hover:bg-green-500/40" 
            onClick={toggleAddMarkers}
          >
            <Plus className="mr-2 h-4 w-4" /> {isAddingMarkers ? 'Stop Adding' : 'Add Marker'}
          </Button>
          <Button 
            className="bg-green-500/20 text-green-400 hover:bg-green-500/40" 
            onClick={handleZoomOut}
          >
            <ZoomOut className="mr-2 h-4 w-4" /> Zoom Out
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-black/80 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 text-green-400">NFT Details</h2>
        {selectedNFT ? (
          <div>
            <h3 className="text-lg font-medium text-green-300">{selectedNFT.name}</h3>
            <p className="text-sm text-green-400 mt-2">Type: {selectedNFT.type}</p>
            <p className="text-sm text-green-400">
              Location: {selectedNFT.lat.toFixed(4)}, {selectedNFT.lng.toFixed(4)}
            </p>
            <Button className="mt-4 bg-green-500/20 text-green-400 hover:bg-green-500/40" size="sm">
              <MapPin className="mr-2 h-4 w-4" /> Navigate
            </Button>
          </div>
        ) : (
          <p className="text-sm text-green-400">Select an NFT on the map to view details.</p>
        )}
      </Card>
    </div>
  );
};

interface CoffeeShopTabProps {
  selectedShopId: string | null;
}

export function CoffeeShopTab({ selectedShopId }: CoffeeShopTabProps) {
  // ... existing code ...

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* ... existing code ... */}
      
      {selectedShopId && (
        <div className="col-span-2 bg-black/60 p-6 rounded-lg shadow-lg">
          {/* ... existing code ... */}
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            {/* ... existing grid items ... */}
            <div className="bg-gray-800 p-3 rounded col-span-3">
              <Link href={`/shop/${selectedShopId}`} passHref>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Go to Shop
                </button>
              </Link>
            </div>
          </div>
          
          {/* ... rest of the existing code ... */}
        </div>
      )}
    </div>
  );
}

// ... existing styles ...
