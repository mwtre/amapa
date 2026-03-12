'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet } from "lucide-react"
import { CoffeeShopTab } from '../components/CoffeeShopTab';
import { NFTbook } from "@/components/nftbook"
import { MissionsTab } from '@/components/MissionsTab'
import MatrixMinigame from '@/components/matrix-minigame'
import Swap from '@/components/Swap'
import { Tutorial } from '@/components/Tutorial';
import { Chat } from '@/components/Chat';
import { Market } from '@/components/Market';
import { PlayerStats } from '@/components/PlayerStats';
import { useSearchParams } from 'next/navigation';
import Deck from './Deck';
import Radio from './Radio';
import Rooms from '@/components/Rooms';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map').then((m) => m.Map), {
  ssr: false,
});

const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fontSize = 10
  const drops: number[] = []

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const columns = canvas.width / fontSize

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0F0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128)
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => clearInterval(interval)
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export function App() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [activeHunters, setActiveHunters] = useState(1337)
  const [activeTab, setActiveTab] = useState('map')
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null)

  const searchParams = useSearchParams()

  useEffect(() => {
    const tab = searchParams.get('tab')
    const shop = searchParams.get('shop')
    if (tab) {
      setActiveTab(tab)
    }
    if (shop) {
      setSelectedShopId(shop)
    }
  }, [searchParams])

  const connectWallet = () => {
    setWalletConnected(true)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <DigitalRain />
      <header className="bg-black/80 shadow-lg shadow-green-500/20 p-4 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-400 tracking-wider">AMAPA.COM</h1>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-green-300">{new Date().toLocaleDateString()}</p>
            <p className="text-sm text-green-300">Active Hunters: {activeHunters}</p>
            {walletConnected ? (
              <Button variant="outline" size="sm" className="border-green-500 text-green-400 hover:bg-green-500/20">
                <Wallet className="mr-2 h-4 w-4" /> Connected
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={connectWallet} className="border-green-500 text-green-400 hover:bg-green-500/20">
                <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex min-w-full bg-black/60 border border-green-500/50">
              <TabsTrigger value="map">Map</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
              <TabsTrigger value="swap">Swap</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
              <TabsTrigger value="coffeeshops">Coffeeshops</TabsTrigger>
              <TabsTrigger value="nftbook">NFTbook</TabsTrigger>
              <TabsTrigger value="missions">Missions</TabsTrigger>
              <TabsTrigger value="minigame">MiniGame</TabsTrigger>
              <TabsTrigger value="deck">Deck</TabsTrigger>
             
              <TabsTrigger value="radio">Rooms</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="map">
            <Map />
            <Card className="mt-8 p-4 bg-black/80 border-green-500/50 shadow-lg shadow-green-500/20 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4 text-green-400">Game Controls</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">Scan Area</Button>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">View Inventory</Button>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">Trade NFTs</Button>
                <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20">Leaderboard</Button>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <PlayerStats />
          </TabsContent>
          <TabsContent value="marketplace">
            <Market />
          </TabsContent>
          <TabsContent value="swap">
            <Swap />
          </TabsContent>
          <TabsContent value="chat">
            <Chat />
          </TabsContent>
          <TabsContent value="tutorial">
            <Tutorial />
          </TabsContent>
          <TabsContent value="coffeeshops" className="pt-4">
            <CoffeeShopTab selectedShopId={selectedShopId} />
          </TabsContent>
          <TabsContent value="nftbook" className="h-[calc(100vh-200px)] overflow-y-auto">
            <NFTbook />
          </TabsContent>
          <TabsContent value="missions">
            <MissionsTab />
          </TabsContent>
          <TabsContent value="minigame">
            <MatrixMinigame />
          </TabsContent>
          <TabsContent value="deck">
            <Deck />
          </TabsContent>
         
          <TabsContent value="rooms">
               <Rooms />
                </TabsContent>
        </Tabs>
  
      </main>
    </div>
  )
}
