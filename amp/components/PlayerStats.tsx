import React from 'react';
import { Card } from "@/components/ui/card";
import { Clock, Image, Users, Cpu, Wallet, Map, Award, Zap, Target } from "lucide-react";
import { StatItem } from "./StatItem";

interface PlayerData {
  name: string;
  level: number;
  playingHours: number;
  nftsFound: number;
  playersFound: number;
  activeMiners: number;
  walletBalance: number;
  avatarUrl: string;
  areasExplored: number;
  achievements: string[];
  powerLevel: number;
  accuracy: number;
  xp: number;
  xpToNextLevel: number;
}

// Mock player data
const mockPlayerData: PlayerData = {
  name: "CryptoHunter42",
  level: 23,
  playingHours: 156,
  nftsFound: 87,
  playersFound: 42,
  activeMiners: 3,
  walletBalance: 1337.42,
  avatarUrl: "./images/level/pro.jpeg",
  areasExplored: 12,
  achievements: ['First NFT Found', '100 Hours Played', '50 Players Encountered'],
  powerLevel: 10,
  accuracy: 85,
  xp: 500,
  xpToNextLevel: 1000,
};

export function PlayerStats() {
  const playerData = mockPlayerData; // In a real app, this would come from a state or API

  return (
    <Card className="p-6 bg-black/80 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-500 flex-shrink-0">
          <img src={playerData.avatarUrl ?? '/default-avatar.png'} alt="Player Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-green-400 mb-2">{playerData.name ?? 'Unknown Player'}</h2>
          <div className="mb-4">
            <p className="text-sm text-green-300">Level {playerData.level ?? 1}</p>
            <div className="w-full bg-green-900 rounded-full h-2.5 mb-1">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(playerData.xp ?? 0) / (playerData.xpToNextLevel ?? 100) * 100}%` }}></div>
            </div>
            <p className="text-xs text-green-400">{playerData.xp ?? 0} / {playerData.xpToNextLevel ?? 100} XP</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatItem icon={Clock} label="Playing Time" value={`${playerData.playingHours ?? 0} hours`} />
            <StatItem icon={Image} label="NFTs Found" value={playerData.nftsFound ?? 0} />
            <StatItem icon={Users} label="Players Encountered" value={playerData.playersFound ?? 0} />
            <StatItem icon={Cpu} label="Active Miners" value={playerData.activeMiners ?? 0} />
            <StatItem icon={Wallet} label="Wallet Balance" value={`${playerData.walletBalance ?? 0} ETH`} />
            <StatItem icon={Map} label="Areas Explored" value={playerData.areasExplored ?? 0} />
            <StatItem icon={Award} label="Achievements" value={playerData.achievements?.length ?? 0} />
            <StatItem icon={Zap} label="Power Level" value={playerData.powerLevel ?? 1} />
            <StatItem icon={Target} label="Accuracy" value={`${playerData.accuracy ?? 0}%`} />
          </div>
        </div>
      </div>
    </Card>
  );
}
