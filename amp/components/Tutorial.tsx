import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TutorialSection } from "@/components/TutorialSection";

export function Tutorial() {
  return (
    <Card className="p-6 bg-black/80 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-green-400 mb-4">How to Play and Winnnn</h2>
      
      <TutorialSection
        title="1. Exploring the City"
        content={
          <div>
            <p>Your mission is to explore the city and collect unique NFTs. Here's how:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Use the map to navigate through different areas of the city.</li>
              <li>Look for special locations like coffee shops, landmarks, and hidden spots.</li>
              <li>Each location may contain collectible NFTs or clues to find them.</li>
            </ul>
            <div className="mt-4">
              <Button className="bg-green-500 text-black hover:bg-green-600">Open Map</Button>
            </div>
          </div>
        }
      />

      <TutorialSection
        title="2. Finding QR Codes"
        content={
          <div>
            <p>QR codes are scattered throughout the city. They're your key to unlocking rare NFTs:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Scan QR codes you find in coffee shops, on posters, or in unexpected places.</li>
              <li>Each QR code may reveal an NFT, a clue, or a mini-game challenge.</li>
              <li>Some QR codes are time-sensitive or only available during special events!</li>
            </ul>
            <div className="mt-4">
              <Button className="bg-green-500 text-black hover:bg-green-600">Open QR Scanner</Button>
            </div>
          </div>
        }
      />

      <TutorialSection
        title="3. Collecting Card Packs"
        content={
          <div>
            <p>Card packs are another way to expand your NFT collection:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Visit participating coffee shops to purchase or earn card packs.</li>
              <li>Each pack contains a random assortment of NFTs.</li>
              <li>Collect limited edition packs during special events for rare NFTs!</li>
            </ul>
            <div className="mt-4">
              <Button className="bg-green-500 text-black hover:bg-green-600">View Card Packs</Button>
            </div>
          </div>
        }
      />

      <TutorialSection
        title="4. Completing Collections"
        content={
          <div>
            <p>The ultimate goal is to complete NFT collections:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Each collection consists of a set of related NFTs.</li>
              <li>Complete collections to unlock special rewards and crypto prizes.</li>
              <li>Trade with other players to fill gaps in your collections.</li>
            </ul>
            <div className="mt-4">
              <Button className="bg-green-500 text-black hover:bg-green-600">View My Collections</Button>
            </div>
          </div>
        }
      />

      <TutorialSection
        title="5. Winning Crypto Prizes"
        content={
          <div>
            <p>Your efforts can lead to valuable crypto rewards:</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
              <li>Complete collections to enter prize draws.</li>
              <li>Participate in community challenges for bonus rewards.</li>
              <li>Climb the leaderboard to win seasonal crypto prizes.</li>
            </ul>
            <div className="mt-4">
              <Button className="bg-green-500 text-black hover:bg-green-600">View Prize Pool</Button>
            </div>
          </div>
        }
      />

      <div className="mt-6 text-center">
        <Button className="bg-green-500 text-black hover:bg-green-600 text-lg px-6 py-3">Start Your Adventure!</Button>
      </div>
    </Card>
  );
}