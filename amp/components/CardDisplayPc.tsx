'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { card, card2, CardTram, BusCard, CardSneaker, CardScooter, CardAsic1, CardAsic2, CardAsic3 } from '../app/data/card'; // Import card instances including BusCard
import { FaSearchPlus } from 'react-icons/fa'; // Import zoom-in icon from react-icons
import { withBasePath } from "@/lib/basePath";

// Update the CardProps interface to include the image property
interface CardProps {
  id: number
  image: string
  isMain?: boolean
  onClick?: () => void
  onClose?: () => void // Add onClose prop for the close button
  isSelected?: boolean // Add isSelected prop to indicate if the card is selected
  isFullScreen?: boolean // Add isFullScreen prop to indicate if the card is in full screen
}

const CardComponent = ({ id, image, isMain = false, onClick, isSelected = false }: CardProps) => (
  <motion.div
    className={`relative ${isSelected ? 'fixed inset-0 z-50' : 'w-32 h-48'} ${isMain ? '' : 'cursor-pointer'}`}
    whileHover={{ scale: isMain ? 1.5 : 1.1 }} // Scale Card to 1.5, secondary cards to 1.1 on hover
    whileTap={{ scale: 0.95 }} // Add a tap effect for better interaction
    onClick={onClick}
    transition={{ type: "spring", stiffness: 300 }} // Add spring transition for smooth scaling
  >
    <Card className={`w-full h-full bg-transparent border-none`}> {/* Set background to transparent and remove border */}
      <CardContent className="flex items-center justify-center h-full p-0"> {/* Remove padding */}
        <img src={image} alt={`Card ${id}`} className="w-full h-full object-cover" /> {/* Display the image */}
      </CardContent>
    </Card>
    {!isMain && !isSelected && (
      <button 
        className="absolute bottom-2 right-2 text-white bg-blue-500 rounded-full p-1" 
        onClick={onClick} // Zoom in button
      >
        <FaSearchPlus />
      </button>
    )}
  </motion.div>
)

const CardDisplayPc: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null); // State to track the selected card
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleMainCardClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
    setIsExpanded(!isExpanded); // Toggle expansion of the main card
  }

  const handleCardClick = (id: number) => {
    setSelectedCard(id); // Set the selected card
  }

  const handleCloseClick = () => {
    setSelectedCard(null); // Close the selected card
  }

  const mainCard = { id: 0, isMain: true, image: withBasePath('/images/CARD/PC/CloverPc.png') }; // Use transport image for the main card
  const additionalCards = [CardAsic1,CardAsic2,CardAsic3]; // Include BusCard as an additional card

  
  return (


    <div className="min-h-screen flex items-center justify-center bg-transparent p-0 m-0"> {/* Set background to transparent */}
      <audio ref={audioRef} src={withBasePath("/sounds/card-deck-sound.mp3")} preload="auto" />
      <div className="relative flex space-x-0"> {/* Remove space between cards */}
        {/* Always show the main card */}
        <motion.div
          className="ml-0" // Remove left margin
          animate={isExpanded ? { scale: 1.8 } : { scale: 1.5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <CardComponent {...mainCard} onClick={handleMainCardClick} />
        </motion.div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className="flex space-x-0 mt-0" // Remove space between additional cards
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {additionalCards.map((cardInstance, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <CardComponent
                    id={index + 1}
                    image={cardInstance.getFrontImage()}
                    onClick={() => handleCardClick(index + 1)} // Set the selected card on click
                    isMain={isExpanded}
                    isSelected={selectedCard === index + 1} // Pass isSelected prop
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {selectedCard !== null && ( // Show the selected card in a larger view
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-transparent" // Ensure background is transparent
          onClick={handleCloseClick} // Close on click
          initial={{ opacity: 0 }} // Initial opacity for fade-in effect
          animate={{ opacity: 1 }} // Animate to full opacity
          exit={{ opacity: 0 }} // Fade out on exit
          transition={{ duration: 0.5 }} // Transition duration
        >
          <div className="relative">
            <motion.div
              className="relative inline-block" // Container to match image size
              initial={{ scale: 0 }} // Start from scale 0
              animate={{ scale: 1 }} // Animate to full size
              exit={{ scale: 0 }} // Scale down on exit
              transition={{ type: "spring", stiffness: 300 }} // Smooth spring transition
            >
              <CardComponent
                id={selectedCard}
                image={additionalCards[selectedCard - 1].getFrontImage()}
                isSelected={true}
                onClose={handleCloseClick}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default CardDisplayPc; // Ensure this is a default export
