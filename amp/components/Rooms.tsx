// File: components/Rooms.tsx
"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/basePath";

interface Room {
  id: number;
  name: string;
  bgImage: string;
  description: string;
}

const rooms: Room[] = [
  { id: 1, name: "Gallery Room", bgImage: withBasePath("/images/rooms/gallery.jpg"), description: "View your NFT gallery here." },
  { id: 2, name: "Private Room", bgImage: withBasePath("/images/rooms/private.jpg"), description: "Your personal space to stake NFTs." },
  { id: 3, name: "Trading Room", bgImage: withBasePath("/images/rooms/trading.jpg"), description: "Trade and explore NFTs with others." },
  // Add more rooms as needed
];

export default function Rooms() {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  const enterRoom = (room: Room) => {
    setCurrentRoom(room);
  };

  const leaveRoom = () => {
    setCurrentRoom(null);
  };

  return (
    <div className="min-h-screen">
      {!currentRoom ? (
        // Room selection view
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {rooms.map(room => (
            <div
              key={room.id}
              onClick={() => enterRoom(room)}
              className="cursor-pointer p-4 bg-black/80 border border-green-500/50 shadow-lg shadow-green-500/20 rounded-lg hover:bg-green-500/10 transition"
            >
              <img
                src={room.bgImage}
                alt={room.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h2 className="text-lg font-bold text-green-400 mt-2">{room.name}</h2>
              <p className="text-sm text-green-300">{room.description}</p>
            </div>
          ))}
        </div>
      ) : (
        // Inside a room view
        <div
          className="relative min-h-screen flex flex-col items-center justify-center text-green-400"
          style={{ backgroundImage: `url(${currentRoom.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="bg-black/70 p-4 rounded-lg text-center shadow-lg shadow-green-500/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">{currentRoom.name}</h2>
            <p className="mb-4">{currentRoom.description}</p>
            <Button variant="outline" onClick={leaveRoom} className="border-green-500 text-green-400 hover:bg-green-500/20 mb-4">
              Leave Room
            </Button>

            {/* Mock NFT staking area */}
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Stake Your NFTs</h3>
              <p className="text-sm text-green-300 mb-4">Select an NFT from your wallet to stake in this room.</p>
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">Stake NFT</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
