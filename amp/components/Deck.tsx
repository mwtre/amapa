import React, { useState } from 'react';
import { Card, card, card2, card3 } from '../app/data/card';
import CardComponent from './subcomp/CardComponent';
import './Deck.css'; // Import the CSS file for the deck
import CardDisplay from './CardDisplay'; // Default import for CardDisplay
import CardDisplayTransport from './CardDisplayTransport'; // Import the new CardDisplayTransport component
import CardDisplayEquip from './CardDisplayEquip';
import CardDisplayPc from './CardDisplayPc';
import { withBasePath } from "@/lib/basePath";

// New card instance for CategoryCard
const CategoryCard = {
  suit: 'strain', // Adjust the suit as needed
  rank: 'clover', // Adjust the rank as needed
  image: withBasePath('/images/CARD/STRAIN/DeckClover.png'), // Path to the Clover card image
  cardBack: withBasePath('/images/CARD/STRAIN/CardBack.png'), // Path to the card back image
};

function Deck() {
  const [showCategoryCard, setShowCategoryCard] = useState(false); // State to manage visibility of CategoryCard



  const handleCloseCategoryCard = () => {
    setShowCategoryCard(false); // Hide the CategoryCard
  };

  return (
    <div className="deck-container">
    

      {/* Render the CategoryCard if showCategoryCard is true */}
      {showCategoryCard && (
        <div className="category-card-container" onClick={handleCloseCategoryCard}>
          <CardComponent
            id={0} // You can set an appropriate ID or handle it differently
            image={CategoryCard.image}
            isMain={true} // Set to true if you want it to behave like a main card
            onClick={handleCloseCategoryCard} // Close on click
          />
        </div>
      )}

      {/* Decks Display Area */}
      <div className="decks-display">
        <div className="deck-display">
  
          <CardDisplay />
        </div>
        <div className="deck-display">
         
          <CardDisplayTransport />
        </div>
        <div className="deck-display">
         
         <CardDisplayEquip />
       </div>
       <div className="deck-display">
         
         <CardDisplayPc />
       </div>
      </div>
    </div>
  );
}

export default Deck;
