import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface NFTData {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
}

const NFTDataFetcher: React.FC = () => {
  const [nftData, setNftData] = useState<NFTData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        const response = await axios.get<NFTData>('https://ipfs.io/ipfs/bafybeideghof6fjf7nrfpgizree2sdfq7us4zleaj7fp4p3tmy2suevcxe');
        setNftData(response.data);
      } catch (err) {
        setError('Failed to fetch NFT data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTData();
  }, []);

  const getImageUrl = (imageSource: string) => {
    if (imageSource.startsWith('ipfs://')) {
      return `https://ipfs.io/ipfs/${imageSource.slice(7)}`;
    }
    if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      return imageSource;
    }
    return `https://ipfs.io/ipfs/${imageSource}`;
  };

  if (loading) return <div>Loading NFT data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!nftData) return <div>No NFT data available</div>;

  return (
    <div className="bg-black/60 p-6 rounded-lg shadow-lg text-green-400">
      <h2 className="text-2xl font-bold mb-4">{nftData.name}</h2>
      {nftData.image && (
        <img 
          src={getImageUrl(nftData.image)} 
          alt={nftData.name} 
          className="w-full h-auto mb-4 rounded-lg"
          onError={(e) => {
            console.error("Error loading image:", e.currentTarget.src);
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
      <p className="mb-4">{nftData.description}</p>
      <h3 className="text-xl font-semibold mb-2">Attributes:</h3>
      <ul>
        {nftData.attributes.map((attr, index) => (
          <li key={index} className="mb-1">
            <span className="font-medium">{attr.trait_type}:</span> {attr.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTDataFetcher;
