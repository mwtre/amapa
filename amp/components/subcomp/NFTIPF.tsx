import React from 'react';
import Image from 'next/image';
import { NFT } from '../types/nft';
import { rarityColors } from '../utils/rarityColors';

interface NFTIPFProps {
  nft: NFT;
}

const NFTIPF: React.FC<NFTIPFProps> = ({ nft }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={nft.imageUrl}
          alt={nft.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
      <p className="text-sm mb-2">ID: {nft.id}</p>
      <p 
        className="text-sm font-medium" 
        style={{ color: rarityColors[nft.rarity] }}
      >
        Rarity: {nft.rarity}
      </p>
    </div>
  );
};

export default NFTIPF;