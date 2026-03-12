import React from 'react';

interface NFTPopupProps {
  name: string;
  type: string;
}

export const NFTPopup: React.FC<NFTPopupProps> = ({ name, type }) => (
  <div className="font-mono">
    <strong className="text-green-400">{name}</strong>
    <br />
    <span className="text-green-300">{type} NFT</span>
  </div>
);