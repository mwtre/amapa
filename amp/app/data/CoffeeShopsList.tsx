import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CoffeeShop {
  name: string;
  lat: number;
  lng: number;
}

const CoffeeShopsList: React.FC = () => {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      try {
        const response = await axios.get<CoffeeShop[]>('/api/coffeeshops');
        setCoffeeShops(response.data);
      } catch (err) {
        setError('Failed to fetch coffee shops');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeShops();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Coffee Shops</h2>
      <ul>
        {coffeeShops.map((shop, index) => (
          <li key={index}>
            <strong>{shop.name}</strong> - Lat: {shop.lat}, Lng: {shop.lng}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoffeeShopsList;
