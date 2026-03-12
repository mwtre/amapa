'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'

const MatrixRain = () => {
  const [streams, setStreams] = useState<string[]>([])

  useEffect(() => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+'
    const streamCount = Math.floor(window.innerWidth / 20)
    const newStreams = Array(streamCount).fill('').map(() => 
      Array(Math.floor(Math.random() * 20) + 5)
        .fill('')
        .map(() => characters[Math.floor(Math.random() * characters.length)])
        .join('')
    )
    setStreams(newStreams)

    const interval = setInterval(() => {
      setStreams(prev => prev.map(stream => 
        stream.slice(1) + characters[Math.floor(Math.random() * characters.length)]
      ))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none">
      {streams.map((stream, i) => (
        <div 
          key={i} 
          className="absolute top-0 text-green-500 text-opacity-50 font-mono text-sm"
          style={{ left: `${i * 20}px`, animationDelay: `${Math.random() * 2}s` }}
        >
          {stream.split('').map((char, j) => (
            <div 
              key={j} 
              className="animate-matrix-rain"
              style={{ animationDelay: `${j * 0.1}s` }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const TerminalText = ({ text, onComplete }: { text: string, onComplete: () => void }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(interval)
        setTimeout(onComplete, 1000) // Wait 1 second before moving to next stage
      }
    }, 100) // 100ms per character
    return () => clearInterval(interval)
  }, [text, onComplete])

  return (
    <motion.div 
      className="font-mono text-green-400 text-xl md:text-2xl lg:text-3xl text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      <span className="animate-pulse">_</span>
    </motion.div>
  )
}

interface EnterComponentProps {
  onComplete: () => void;
}

const EnterComponent: React.FC<EnterComponentProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0)

  const advanceStage = () => {
    setStage(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      <MatrixRain />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }} // Slow fade-in over 2 seconds
        className="z-10 w-full max-w-lg mx-auto"
      >
        <Card className="bg-black border-green-500 border-2 text-green-400">
          <CardContent className="flex flex-col items-center justify-center space-y-6 p-6">
            <motion.div 
              className="w-full space-y-6 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <AnimatePresence mode="wait">
                {stage === 0 && (
                  <TerminalText 
                    key="welcome"
                    text="Welcome, Player." 
                    onComplete={advanceStage}
                  />
                )}
                {stage === 1 && (
                  <TerminalText 
                    key="matrix"
                    text="The Matrix is real." 
                    onComplete={advanceStage}
                  />
                )}
                {stage === 2 && (
                  <TerminalText 
                    key="ready"
                    text="Are you ready to unplug?" 
                    onComplete={advanceStage}
                  />
                )}
                {stage === 3 && (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mt-8"
                  >
                    <Link href="/game">
                      <Button 
                        className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
                      >
                        Start Play
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 pointer-events-none"></div>
    </div>
  )
}

export default EnterComponent;
