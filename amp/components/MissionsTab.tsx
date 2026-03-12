import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type Mission = {
  id: number
  title: string
  description: string
  reward: string
  progress: number
  total: number
}

const missions: Mission[] = [
  { id: 1, title: "Coffee Shop Explorer", description: "Visit 5 different coffee shops", reward: "50 AMAPA Tokens", progress: 3, total: 5 },
  { id: 2, title: "NFT Collector", description: "Collect 10 unique NFTs", reward: "Rare Amsterdam NFT", progress: 7, total: 10 },
  { id: 3, title: "Social Butterfly", description: "Chat with 20 other players", reward: "100 AMAPA Tokens", progress: 15, total: 20 },
  { id: 4, title: "Amsterdam Trivia Master", description: "Answer 50 trivia questions correctly", reward: "Limited Edition Amsterdam Badge", progress: 30, total: 50 },
]

export function MissionsTab() {
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold text-green-400 mb-4">Daily Missions</h2>
      {missions.map((mission) => (
        <Card key={mission.id} className="bg-black/80 border-green-500/50 text-green-400">
          <CardHeader>
            <CardTitle>{mission.title}</CardTitle>
            <CardDescription className="text-green-300">{mission.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span>Progress: {mission.progress}/{mission.total}</span>
              <span>Reward: {mission.reward}</span>
            </div>
            <Progress value={(mission.progress / mission.total) * 100} className="h-2 bg-green-900">
              <div className="h-full bg-green-400 transition-all duration-300 ease-in-out" style={{ width: `${(mission.progress / mission.total) * 100}%` }} />
            </Progress>
            <Button className="w-full mt-4 bg-green-500/20 text-green-400 hover:bg-green-500/40">
              {mission.progress === mission.total ? "Claim Reward" : "Go to Mission"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}