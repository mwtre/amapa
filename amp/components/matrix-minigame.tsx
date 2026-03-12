'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Zap, Shield, Wind, Heart, Plus, Code, Cpu, Database, Network } from "lucide-react"
import { useToast } from "@chakra-ui/react";
// Define Rarity types if applicable
type Rarity = 'Common' | 'Rare' | 'Legendary'

// Define the structure of an NFTData item if applicable
interface NFTData {
  id: number
  name: string
  type: string
  rarity: Rarity
  powerLevel: number
  foundCount: number
  price: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
  tokenId: string
  description: string
}

// Define Props for NFTCard
interface NFTCardProps {
  nft: NFTData
}

// Define the streak levels and choices
const streakLevels = ['Noob', 'Amateur', 'Pro', 'Hacker', 'God']
const choices = ['Red Pill', 'Blue Pill', 'Green Pill']

const streakImages: Record<string, string> = {
  'Noob': '/images/Level/noob.jpeg',
  'Amateur': '/images/Level/amatur.jpeg',
  'Pro': '/images/Level/pro.jpeg',
  'Hacker': '/images/Level/legend.jpeg',
  'God': '/images/Level/god.jpeg'
}

// SkillTree Component
interface SkillTreeProps {
  character: {
    skills: {
      [key: string]: number
    }
  }
  onUpgradeSkill: (skill: string) => void
}

const SkillTree: React.FC<SkillTreeProps> = ({ character, onUpgradeSkill }) => {
  const skills = [
    { name: 'Hacking', icon: <Code className="w-4 h-4 text-blue-400" />, level: character.skills.hacking },
    { name: 'Firewall', icon: <Shield className="w-4 h-4 text-gray-400" />, level: character.skills.firewall },
    { name: 'Encryption', icon: <Database className="w-4 h-4 text-yellow-400" />, level: character.skills.encryption },
    { name: 'Networking', icon: <Network className="w-4 h-4 text-green-400" />, level: character.skills.networking },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {skills.map((skill) => (
        <Button
          key={skill.name}
          onClick={() => onUpgradeSkill(skill.name.toLowerCase())}
          className="flex flex-col items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors"
          variant="outline"
        >
          {skill.icon}
          <span className="mt-1">{skill.name}</span>
          <span className="text-xs mt-1">Level: {skill.level}</span>
        </Button>
      ))}
    </div>
  )
}

// CharacterLevelUp Component
interface CharacterLevelUpProps {
  character: Character
  onXpChange: (newXp: number) => void
  onBuyStat: (stat: keyof Character, amount?: number) => void
  onBuyGiga: () => void
  onBuyRam: () => void
  onUpgradeSkill: (skill: string) => void
}

interface Character {
  name: string
  level: number
  xp: number
  nextLevelXp: number
  hp: number
  attack: number
  defense: number
  speed: number
  giga: number
  ram: number
  maxTries: number
  skills: {
    hacking: number
    firewall: number
    encryption: number
    networking: number
  }
}

const CharacterLevelUp: React.FC<CharacterLevelUpProps> = ({
  character,
  onXpChange,
  onBuyStat,
  onBuyGiga,
  onBuyRam,
  onUpgradeSkill
}) => {
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [glitchEffect, setGlitchEffect] = useState(false)

  useEffect(() => {
    if (character.xp >= character.nextLevelXp) {
      setShowLevelUp(true)
      setGlitchEffect(true)
      setTimeout(() => {
        onXpChange(character.xp - character.nextLevelXp)
        setShowLevelUp(false)
        setGlitchEffect(false)
      }, 2000)
    }
  }, [character.xp, character.nextLevelXp, onXpChange])

  return (
    <Card className="w-full bg-gradient-to-tr from-gray-900 to-gray-800 border-4 border-green-500 text-green-400 shadow-xl">
      <CardHeader className="border-b border-green-500/30 flex flex-row items-center justify-between p-4">
        <CardTitle className="text-2xl font-mono flex items-center">
          <span>{character.name}</span>
        </CardTitle>
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full border-2 border-green-500 overflow-hidden"
            animate={{ rotate: showLevelUp ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={streakImages[streakLevels[Math.min(Math.floor(character.level / 5), streakLevels.length - 1)]]} 
              alt={`${streakLevels[Math.min(Math.floor(character.level / 5), streakLevels.length - 1)]}`} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="mt-4 space-y-6">
        <div className="relative">
          <Progress
            value={(character.xp / character.nextLevelXp) * 100}
            className="h-6 bg-gray-700 rounded-full"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-mono">
            XP: {character.xp} / {character.nextLevelXp}
          </div>
        </div>

        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`text-center font-bold text-xl ${
                glitchEffect ? 'animate-pulse text-yellow-400' : 'text-white'
              }`}
            >
              LEVEL UP!
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs defaultValue="stats">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-4 font-mono">
              <StatItem
                icon={<Heart className="w-4 h-4 text-red-500" />}
                label="HP"
                value={character.hp}
                cost={Math.floor(50 * Math.pow(1.1, character.hp - 1))}
                onBuy={() => onBuyStat('hp')}
                tooltip="Increases your health points"
              />
              <StatItem
                icon={<Zap className="w-4 h-4 text-yellow-500" />}
                label="Attack"
                value={character.attack}
                cost={Math.floor(75 * Math.pow(1.15, character.attack - 1))}
                onBuy={() => onBuyStat('attack')}
                tooltip="Increases your attack power"
              />
              <StatItem
                icon={<Shield className="w-4 h-4 text-gray-500" />}
                label="Defense"
                value={character.defense}
                cost={Math.floor(75 * Math.pow(1.15, character.defense - 1))}
                onBuy={() => onBuyStat('defense')}
                tooltip="Increases your defense"
              />
              <StatItem
                icon={<Wind className="w-4 h-4 text-green-500" />}
                label="Speed"
                value={character.speed}
                cost={Math.floor(50 * Math.pow(1.1, character.speed - 1))}
                onBuy={() => onBuyStat('speed')}
                tooltip="Increases your speed"
              />
            </div>
          </TabsContent>
          <TabsContent value="skills">
            <SkillTree character={character} onUpgradeSkill={onUpgradeSkill} />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 gap-4 font-mono">
          <StatItem
            icon={<Cpu className="w-4 h-4 text-blue-500" />}
            label="Giga"
            value={character.giga}
            cost={Math.floor(10 * Math.pow(1.1, Math.floor(character.giga / 10)))}
            onBuy={onBuyGiga}
            currency="RAM"
            tooltip="Your digital health, regenerates over time"
          />
          <StatItem
            icon={<Database className="w-4 h-4 text-yellow-600" />}
            label="RAM"
            value={character.ram}
            cost={Math.floor(100 * Math.pow(1.2, Math.floor(character.ram / 10)))}
            onBuy={onBuyRam}
            currency="XP"
            tooltip="Used to buy Giga, earned from gameplay"
          />
        </div>

        <div className="mt-4 text-xs text-center opacity-70">
          Next level: {character.nextLevelXp - character.xp} XP remaining
        </div>
      </CardContent>
    </Card>
  )
}

// StatItem Component
interface StatItemProps {
  icon: React.ReactNode
  label: string
  value: number
  cost: number
  onBuy: () => void
  currency?: string
  tooltip: string
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, cost, onBuy, currency = "XP", tooltip }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-col bg-gray-800 p-2 rounded hover:bg-gray-700 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {icon}
              <span>{label}:</span>
              <span className="font-bold">{value}</span>
            </div>
          </div>
          <Button onClick={onBuy} size="sm" variant="outline" className="w-full flex items-center justify-center">
            <Plus className="w-3 h-3 mr-1" />
            <span>{cost} {currency}</span>
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

// StreakBar Component
interface StreakBarProps {
  streakLevel: number
  streak: number
}

const StreakBar: React.FC<StreakBarProps> = ({ streakLevel, streak }) => {
  const currentStreakLevel = streakLevels[streakLevel];
  const streakImage = streakImages[currentStreakLevel];

  return (
    <Card className="w-full bg-gradient-to-tr from-gray-900 to-gray-800 border-4 border-green-500 p-4 mt-4 text-green-400 shadow-xl">
      <CardContent className="p-0">
        <div className="flex justify-between items-center mb-2">
          <span>Streak Level: {currentStreakLevel}</span>
          <span>Current Streak: {streak}</span>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-green-600 text-green-200">
                Streak Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-600">
                {Math.min(streak, 3)}/3
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <motion.div
              style={{ width: `${(streak % 3) * 33.33}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${(streak % 3) * 33.33}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <img src={streakImage} alt={`${currentStreakLevel}`} />
      </CardContent>
    </Card>
  )
}

// Terminal Component
interface TerminalProps {
  events: string[]
}

const Terminal: React.FC<TerminalProps> = ({ events }) => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [events])

  return (
    <Card className="bg-gradient-to-tr from-gray-900 to-gray-800 border-4 border-green-500 p-4 text-green-400">
      <CardHeader>
        <CardTitle className="text-xl font-mono">Event Log</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 overflow-y-auto font-mono text-sm bg-gray-800 p-2 rounded" ref={terminalRef}>
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2"
            >
              <span className="text-yellow-500">[{new Date().toLocaleTimeString()}]</span> {event}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Leaderboard Component
interface LeaderboardProps {
  scores: { name: string, score: number }[]
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => (
  <Card className="w-full bg-gradient-to-tr from-gray-900 to-gray-800 border-4 border-green-500 p-4 mt-4 text-green-400 shadow-xl">
    <CardHeader>
      <CardTitle className="text-xl font-mono">Leaderboard</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {scores.map((score, index) => (
          <motion.li
            key={index}
            className="flex justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span>{score.name}</span>
            <span>{score.score}</span>
          </motion.li>
        ))}
      </ul>
    </CardContent>
  </Card>
)

// ActiveEffects Component
interface ActiveEffectsProps {
  effects: { name: string, duration: number }[]
}

const ActiveEffects: React.FC<ActiveEffectsProps> = ({ effects }) => (
  <div className="mt-4">
    <h3 className="text-lg font-semibold mb-2">Active Effects</h3>
    <div className="flex flex-wrap gap-2">
      {effects.map((effect, index) => (
        <span key={index} className="px-2 py-1 bg-green-800 text-green-200 rounded-full text-xs">
          {effect.name} ({effect.duration}s)
        </span>
      ))}
    </div>
  </div>
)

// MatrixMinigame Component
const MatrixMinigame: React.FC = () => {
  const [character, setCharacter] = useState<Character>({
    name: "Neo",
    level: 1,
    xp: 0,
    nextLevelXp: 100,
    hp: 100,
    attack: 1,
    defense: 1,
    speed: 1,
    giga: 100,
    ram: 50,
    maxTries: 100,
    skills: {
      hacking: 1,
      firewall: 1,
      encryption: 1,
      networking: 1,
    }
  })

  const [gameState, setGameState] = useState({
    playerChoice: null as string | null,
    computerChoice: null as string | null,
    result: null as 'win' | 'lose' | 'defend' | 'draw' | null,
    streak: 0,
    streakLevel: 0,
    moves: 0,
    consecutiveLosses: 0,
    activeEffects: [] as { name: string, duration: number }[]
  })

  const [lastMoves, setLastMoves] = useState<{ playerChoice: string, computerChoice: string, result: string }[]>([])
  const [events, setEvents] = useState<string[]>([])
  const [leaderboard, setLeaderboard] = useState([
    { name: "Trinity", score: 5000 },
    { name: "Morpheus", score: 4500 },
    { name: "Agent Smith", score: 4000 },
    { name: "Oracle", score: 3500 },
    { name: "Cypher", score: 3000 }
  ])
  const toast = useToast()

  const addEvent = (event: string) => {
    setEvents(prev => [...prev, event])
  }

  useEffect(() => {
    const gigaRegenInterval = setInterval(() => {
      setCharacter(prev => ({
        ...prev,
        giga: Math.min(prev.giga + Math.floor(prev.hp / 10), 100)
      }))
      addEvent(`Giga regenerated by ${Math.floor(character.hp / 10)}.`)
    }, 10000) // Regenerate Giga every 10 seconds

    return () => clearInterval(gigaRegenInterval)
  }, [character.hp, character.giga])

  const handleChoice = (playerChoice: string) => {
    if (gameState.moves >= character.maxTries || character.level >= 20 || character.giga <= 0) {
      toast?.({
        title: "Game Over",
        description: "You have reached the maximum moves, level, or depleted your Giga.",
        status: "error"
      });
      return // Game over
    }

    const computerChoice = choices[Math.floor(Math.random() * choices.length)]
    let result: 'win' | 'lose' | 'defend' | 'draw'

    if (playerChoice === computerChoice) {
      result = 'draw'
    } else if (
      (playerChoice === 'Red Pill' && computerChoice === 'Blue Pill') ||
      (playerChoice === 'Blue Pill' && computerChoice === 'Green Pill') ||
      (playerChoice === 'Green Pill' && computerChoice === 'Red Pill')
    ) {
      // Increased base win chance to make the game easier
      result = Math.random() < (0.5 + character.attack * 0.03 + character.speed * 0.02) ? 'win' : 'lose'
    } else {
      // Increased base defense chance
      result = Math.random() > (0.6 - character.defense * 0.03 - character.speed * 0.02) ? 'defend' : 'lose'
    }

    let newStreak = gameState.streak
    let newStreakLevel = gameState.streakLevel
    let newConsecutiveLosses = gameState.consecutiveLosses

    if (result === 'win') {
      newStreak++
      newConsecutiveLosses = 0
      if (newStreak % 3 === 0 && newStreakLevel < streakLevels.length - 1) {
        newStreakLevel++
      }
    } else if (result === 'lose') {
      newConsecutiveLosses++
      if (newConsecutiveLosses >= 3) {
        newStreak = Math.max(0, newStreak - 1)
        newConsecutiveLosses = 0
        if (newStreakLevel > 0) {
          newStreakLevel--
        }
      }
    }

    const newMoves = gameState.moves + 1
    setGameState(prev => ({
      ...prev,
      playerChoice,
      computerChoice,
      result,
      streak: newStreak,
      streakLevel: newStreakLevel,
      moves: newMoves,
      consecutiveLosses: newConsecutiveLosses
    }))

    // Update last moves
    setLastMoves(prev => [{ playerChoice, computerChoice, result }, ...prev.slice(0, 4)])

    const skillEffects = applySkillEffects(result)

    // Apply active effects
    let xpMultiplier = 1
    let ramMultiplier = 1
    let gigaProtection = 0
    gameState.activeEffects.forEach(effect => {
      switch (effect.name) {
        case 'Double XP':
          xpMultiplier *= 2
          break
        case 'Extra RAM':
          ramMultiplier *= 1.5
          break
        case 'Giga Shield':
          gigaProtection = 0.5
          break
        case 'XP Protection':
          xpMultiplier *= 1.5
          break
        default:
          break
      }
    })

    // Calculate XP change with effects
    let xpChange = 0
    if (result === 'win') {
      xpChange = 20 * (1 + character.attack * 0.1) * (newStreakLevel + 1) * xpMultiplier
    } else if (result === 'defend') {
      xpChange = 5 * (newStreakLevel + 1) * xpMultiplier
    }

    // Deduct Giga on lose, but less if defense is higher and apply Giga protection
    if (result === 'lose') {
      const gigaLoss = Math.max(5, 10 - Math.floor(character.defense / 2)) * (1 - gigaProtection)
      setCharacter(prev => ({
        ...prev,
        giga: Math.max(0, prev.giga - gigaLoss)
      }))
      addEvent(`Giga decreased by ${gigaLoss}.`)
    }

    // Update XP and RAM with effects
    setCharacter(prev => ({
      ...prev,
      xp: Math.max(0, prev.xp + xpChange),
      ram: prev.ram + (result === 'win' ? 2 * ramMultiplier : 1 * ramMultiplier)
    }))

    addEvent(`You chose ${playerChoice}. Computer chose ${computerChoice}. Result: ${result}. XP change: ${xpChange.toFixed(2)}. Streak: ${newStreak} (${streakLevels[newStreakLevel]})`)
    if (skillEffects.length > 0) {
      addEvent(`Activated effects: ${skillEffects.map(e => e.name).join(', ')}`)
    }

    // Animate result
    if (toast) {
      toast({
        title: result.toUpperCase(),
        description: `You ${result}! XP change: ${xpChange.toFixed(2)}`,
        duration: 2000,
      });
    } else {
      console.warn("Toast function is not available");
    }

    // Check for game over
    if (newMoves >= character.maxTries || character.level >= 20 || character.giga <= 0) {
      const finalScore = character.xp + (character.level * 500)
      addEvent(`Game Over! Final score: ${finalScore}`)

      // Update leaderboard
      setLeaderboard(prev => {
        const newLeaderboard = [...prev, { name: character.name, score: finalScore }]
        return newLeaderboard.sort((a, b) => b.score - a.score).slice(0, 5)
      })
    }
  }

  const handleXpChange = (newXp: number) => {
    setCharacter(prev => ({
      ...prev,
      level: prev.level + 1,
      xp: newXp,
      nextLevelXp: Math.floor(prev.nextLevelXp * 1.5),
      maxTries: prev.maxTries + prev.hp // Increase max tries based on HP
    }))
    addEvent(`Level Up! You are now level ${character.level + 1}`)
  }

  const handleBuyStat = (stat: keyof Character) => {
    const costs: { [key in keyof Character]?: number } = {
      hp: Math.floor(50 * Math.pow(1.1, character.hp - 1)),
      attack: Math.floor(75 * Math.pow(1.15, character.attack - 1)),
      defense: Math.floor(75 * Math.pow(1.15, character.defense - 1)),
      speed: Math.floor(50 * Math.pow(1.1, character.speed - 1))
    }

    const cost = costs[stat] || 0;
    setCharacter(prev => {
      if (prev.xp >= cost) {
        const newValue = (prev[stat] as number) + 1;
        addEvent(`Upgraded ${stat}! New value: ${newValue}`);
        return {
          ...prev,
          [stat]: newValue,
          xp: prev.xp - cost
        };
      } else {
        addEvent(`Not enough XP to upgrade ${stat}. Need ${cost} XP.`);
        return prev;
      }
    });
  }

  const handleBuyGiga = () => {
    const cost = Math.floor(10 * Math.pow(1.1, Math.floor(character.giga / 10)))
    if (character.ram >= cost) {
      setCharacter(prev => ({
        ...prev,
        giga: Math.min(100, prev.giga + 10),
        ram: prev.ram - cost
      }))
      addEvent(`Bought 10 Giga for ${cost} RAM`)
    } else {
      addEvent(`Not enough RAM to buy Giga. Need ${cost} RAM.`)
    }
  }

  const handleBuyRam = () => {
    const cost = Math.floor(100 * Math.pow(1.2, Math.floor(character.ram / 10)))
    if (character.xp >= cost) {
      setCharacter(prev => ({
        ...prev,
        ram: prev.ram + 10,
        xp: prev.xp - cost
      }))
      addEvent(`Bought 10 RAM for ${cost} XP`)
    } else {
      addEvent(`Not enough XP to buy RAM. Need ${cost} XP.`)
    }
  }

  const handleUpgradeSkill = (skill: string) => {
    const skillCostMap: { [key: string]: number } = {
      hacking: Math.floor(100 * Math.pow(1.2, character.skills.hacking - 1)),
      firewall: Math.floor(100 * Math.pow(1.2, character.skills.firewall - 1)),
      encryption: Math.floor(100 * Math.pow(1.2, character.skills.encryption - 1)),
      networking: Math.floor(100 * Math.pow(1.2, character.skills.networking - 1)),
    }

    const cost = skillCostMap[skill] || 0
    if (character.xp >= cost) {
      setCharacter(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [skill as keyof typeof prev.skills]: prev.skills[skill as keyof typeof prev.skills] + 1
        },
        xp: prev.xp - cost
      }))
      addEvent(`Upgraded ${skill} skill! New level: ${character.skills[skill as keyof typeof character.skills] + 1}`)
    } else {
      addEvent(`Not enough XP to upgrade ${skill}. Need ${cost} XP.`)
    }
  }

  const applySkillEffects = (result: 'win' | 'lose' | 'defend' | 'draw'): { name: string, duration: number }[] => {
    let effects: { name: string, duration: number }[] = []
    if (result === 'win') {
      if (Math.random() < character.skills.hacking * 0.05) {
        effects.push({ name: 'Double XP', duration: 3 })
      }
      if (Math.random() < character.skills.networking * 0.05) {
        effects.push({ name: 'Extra RAM', duration: 3 })
      }
    } else if (result === 'lose') {
      if (Math.random() < character.skills.firewall * 0.05) {
        effects.push({ name: 'Giga Shield', duration: 3 })
      }
      if (Math.random() < character.skills.encryption * 0.05) {
        effects.push({ name: 'XP Protection', duration: 3 })
      }
    }
    setGameState(prev => ({
      ...prev,
      activeEffects: [...prev.activeEffects, ...effects]
    }))
    return effects
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        activeEffects: prev.activeEffects.map(effect => ({
          ...effect,
          duration: effect.duration - 1
        })).filter(effect => effect.duration > 0)
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const getStreakLevel = (streak: number) => {
    const index = Math.min(Math.floor(streak / 5), streakLevels.length - 1);
    return streakLevels[index];
  };

  const currentStreakLevel = getStreakLevel(character.streak);
  const avatarImage = streakImages[currentStreakLevel];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-gray-900 to-black flex flex-col items-center justify-center p-4 space-y-8">
      <motion.h1
        className="text-4xl font-bold text-green-500 mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The Matrix: Digital Enlightenment
      </motion.h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <CharacterLevelUp
            character={character}
            onXpChange={handleXpChange}
            onBuyStat={handleBuyStat}
            onBuyGiga={handleBuyGiga}
            onBuyRam={handleBuyRam}
            onUpgradeSkill={handleUpgradeSkill}
          />
          <StreakBar streakLevel={gameState.streakLevel} streak={gameState.streak} />
          <ActiveEffects effects={gameState.activeEffects} />
          <Leaderboard scores={leaderboard} />
        </div>
        <div className="space-y-4">
          <Card className="bg-gradient-to-tr from-gray-900 to-gray-800 border-4 border-green-500 p-4 text-green-400 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-mono text-center">Matrix Pill Game</CardTitle>
              <CardDescription className="text-center text-green-400">Choose your pill wisely</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center space-x-4">
                {choices.map(choice => {
                  // Define color based on choice
                  const colorMap: { [key: string]: string } = {
                    'Red Pill': 'red',
                    'Blue Pill': 'blue',
                    'Green Pill': 'green'
                  }
                  const color = colorMap[choice] || 'gray'
                  return (
                    <motion.div key={choice} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => handleChoice(choice)}
                        className={`bg-${color}-500 hover:bg-${color}-600 text-white`}
                        disabled={gameState.moves >= character.maxTries || character.level >= 20 || character.giga <= 0}
                      >
                        {choice}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>
              <AnimatePresence>
                {gameState.result && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="text-center space-y-2 bg-gray-700 p-2 rounded"
                  >
                    <p>You chose: {gameState.playerChoice}</p>
                    <p>Computer chose: {gameState.computerChoice}</p>
                    <p className={`font-bold ${
                      gameState.result === 'win' ? 'text-green-500' :
                      gameState.result === 'lose' ? 'text-red-500' :
                      gameState.result === 'defend' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`}>
                      You {gameState.result}!
                    </p>
                    <p>Current streak: {gameState.streak} ({streakLevels[gameState.streakLevel]})</p>
                    <p>Moves: {gameState.moves}/{character.maxTries}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Last 5 Moves</h3>
                <ul className="space-y-2">
                  {lastMoves.map((move, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`flex justify-between ${
                        move.result === 'win' ? 'text-green-500' :
                        move.result === 'lose' ? 'text-red-500' :
                        move.result === 'defend' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`}
                    >
                      <span>You: {move.playerChoice}</span>
                      <span>PC: {move.computerChoice}</span>
                      <span>{move.result}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          <Terminal events={events} />
        </div>
      </div>

      <Card className="w-full max-w-6xl bg-gradient-to-tr from-gray-900 to-gray-800 border-4 border-green-500 p-4 text-green-400 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-mono">Game Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mechanics" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mechanics">Game Mechanics</TabsTrigger>
              <TabsTrigger value="stats">Character Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="mechanics">
              <div className="space-y-4 text-sm">
                <p><strong>Objective:</strong> Reach level 20 or the 'Enlightenment' stage to win. The game ends if you run out of moves or Giga.</p>
                <p><strong>Gameplay:</strong> Choose a pill color in each round. Your success depends on your stats and luck.</p>
                <p><strong>Streak System:</strong> Win to increase your streak. Lose to decrease it by 1 after 3 consecutive losses. Higher streaks multiply XP gains.</p>
                <p><strong>Resource Management:</strong> Balance your XP, RAM, and Giga to upgrade stats and survive longer.</p>
                <p><strong>Dynamic Difficulty:</strong> The game becomes more challenging as you progress, but your improved stats help you overcome obstacles.</p>
              </div>
            </TabsContent>
            <TabsContent value="stats">
              <div className="space-y-4 text-sm">
                <p><strong>HP (Health Points):</strong> Increases max tries and Giga regeneration rate.</p>
                <p><strong>Attack:</strong> Boosts win chance and XP gain from wins.</p>
                <p><strong>Defense:</strong> Reduces Giga loss from defeats and increases defend chance.</p>
                <p><strong>Speed:</strong> Improves both attack and defense chances slightly.</p>
                <p><strong>Giga:</strong> Your digital health. Lose Giga instead of XP when defeated. Game over if Giga reaches 0. Regenerates over time based on HP.</p>
                <p><strong>RAM:</strong> Used to buy Giga. Earned from gameplay, more from wins.</p>
                <p><strong>XP:</strong> Used for leveling up and buying stat upgrades.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default MatrixMinigame