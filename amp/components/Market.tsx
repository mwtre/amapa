import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the NFT type
type NFT = {
  id: number;
  name: string;
  type: string;
  price: number;
};

// Mock NFT marketplace data
const nftMarketplace: NFT[] = [
  { id: 1, name: 'Red Light District Pass', type: 'Hooker', price: 0.5 },
  { id: 2, name: 'Coffeeshop VIP Card', type: 'Light Drugs', price: 0.3 },
  { id: 3, name: 'Underground Rave Ticket', type: 'Hard Drugs', price: 0.7 },
  { id: 4, name: 'Luxury Canal Cruise', type: 'Tourist', price: 0.4 },
  { id: 5, name: 'Vondelpark Bike Tour', type: 'Bike', price: 0.2 },
  { id: 6, name: 'Cheese Tasting Experience', type: 'Cheese', price: 0.3 },
  { id: 7, name: 'Tulip Festival VIP Pass', type: 'Tulip', price: 0.6 },
  { id: 8, name: 'Amsterdam Dance Event Ticket', type: 'DJ', price: 0.8 },
];

export function Market() {
  return (
    <Card className="p-6 bg-black/80 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-green-400 mb-4">NFT Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nftMarketplace.map((nft) => (
          <Card key={nft.id} className="p-4 bg-black/60 border-green-500/30">
            <h3 className="text-lg font-semibold text-green-300">{nft.name}</h3>
            <p className="text-sm text-green-400">Type: {nft.type}</p>
            <p className="text-sm text-green-400">Price: {nft.price} ETH</p>
            <Button className="mt-2 w-full bg-green-500/20 text-green-400 hover:bg-green-500/40">
              Buy NFT
            </Button>
          </Card>
        ))}
      </div>
    </Card>
  );
}