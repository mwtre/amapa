'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import Image from 'next/image'

type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary'

const nftData = [
  { id: 1, name: 'Red Light District Diva', type: 'Hooker', rarity: 'Legendary', powerLevel: 95, price: 10.5, image: '/images/red/red1.webp' },
  { id: 2, name: 'Mellow Yellow Coffeeshop', type: 'Light Drugs', rarity: 'Common', powerLevel: 30, price: 0.5, image: '/images/red/guy1.jpeg' },
  { id: 3, name: 'Underground Rave', type: 'Hard Drugs', description: 'Captures the essence of Amsterdam\'s vibrant underground party scene.', rarity: 'Rare', powerLevel: 75, foundCount: 20, maxHealth: 80, attack: 70, defense: 60, speed: 85, tokenId: 'AMAPA003', price: 5.0 },]

const rarityColors = {
  Common: 'text-green-400',
  Uncommon: 'text-green-300',
  Rare: 'text-green-200',
  Epic: 'text-green-100',
  Legendary: 'text-white',
}

const rarityStyles = {
  Common: 'bg-green-900/30 text-green-400 border-green-400',
  Uncommon: 'bg-blue-900/30 text-blue-300 border-blue-300',
  Rare: 'bg-purple-900/30 text-purple-300 border-purple-300',
  Epic: 'bg-orange-900/30 text-orange-300 border-orange-300',
  Legendary: 'bg-red-900/30 text-red-300 border-red-300',
}

const NFTCard = ({ nft }: { nft: typeof nftData[0] }) => (
  <Card className={`w-full max-w-xs mx-auto font-mono ${rarityStyles[nft.rarity as keyof typeof rarityStyles]}`}>
    <CardHeader className="p-4 border-b border-current">
      <CardTitle className="text-lg font-bold truncate">{nft.name}</CardTitle>
      <div className="text-xs font-semibold">
        [{nft.rarity.toUpperCase()}]
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="aspect-square relative mb-4 border border-current overflow-hidden">
        <Image 
          src={nft.image ?? ''} 
          alt={nft.name ?? ''} 
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
      </div>
      <div className="space-y-2 text-sm">
        <p><span className="opacity-70">TYPE:</span> {nft.type}</p>
        <p><span className="opacity-70">POWER:</span> {nft.powerLevel}</p>
        <p><span className="opacity-70">PRICE:</span> {nft.price} ETH</p>
      </div>
    </CardContent>
  </Card>
)

export function NFTbook() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('powerLevel')
  const [filterRarity, setFilterRarity] = useState<Rarity | 'All'>('All')

  const filteredAndSortedNFTs = nftData
    .filter(nft => 
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRarity === 'All' || nft.rarity === filterRarity)
    )
    .sort((a, b) => {
      if (sortBy === 'price') return b.price - a.price
      return Number(b[sortBy as keyof typeof b]) - Number(a[sortBy as keyof typeof a])
    })

  const nftsPerPage = 12
  const totalPages = Math.ceil(filteredAndSortedNFTs.length / nftsPerPage)

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  const currentNFTs = filteredAndSortedNFTs.slice((currentPage - 1) * nftsPerPage, currentPage * nftsPerPage)

  return (
    <div className="container mx-auto p-4 bg-black text-green-400 font-mono">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-500">NFTDex: Amsterdam Digital Treasures</h1>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Search NFTs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-black border-green-500 text-green-400 placeholder-green-700"
        />
        <Select onValueChange={(value) => setSortBy(value)} defaultValue={sortBy}>
          <SelectTrigger className="w-full sm:w-[180px] bg-black border-green-500 text-green-400">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-black border-green-500 text-green-400">
            <SelectItem value="powerLevel">Power Level</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setFilterRarity(value as Rarity | 'All')} defaultValue={filterRarity}>
          <SelectTrigger className="w-full sm:w-[180px] bg-black border-green-500 text-green-400">
            <SelectValue placeholder="Filter Rarity" />
          </SelectTrigger>
          <SelectContent className="bg-black border-green-500 text-green-400">
            <SelectItem value="All">All Rarities</SelectItem>
            {Object.keys(rarityColors).map((rarity) => (
              <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {currentNFTs.map(nft => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={handlePrev} disabled={currentPage === 1} className="bg-green-500/20 text-green-400 hover:bg-green-500/40">
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <div className="text-center">
          Page {currentPage} of {totalPages}
        </div>
        <Button onClick={handleNext} disabled={currentPage === totalPages} className="bg-green-500/20 text-green-400 hover:bg-green-500/40">
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
