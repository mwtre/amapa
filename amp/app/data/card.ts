// File: /app/data/card.ts
export class Card {
  getImage(): string | undefined {
    throw new Error('Method not implemented.');
  }
  suit: string;
  rank: string;
  image: string; // Front image
  cardBack: string; // Back image

  constructor(suit: string, rank: string, image: string, cardBack: string) {
    this.suit = suit;
    this.rank = rank;
    this.image = image;
    this.cardBack = cardBack;
  }

  // Description of the card
  getDescription(): string {
    return `${this.rank} of ${this.suit}`;
  }

  // Method to get the front image
  getFrontImage(): string {
    return this.image;
  }

  // Method to get the back image
  getBackImage(): string {
    return this.cardBack;
  }
}


// Example card instances with specific front and back images
export const card = new Card(
  'strain',
  'weddincake',
  '/images/CARD/STRAIN/cardweddingcake.png',
  '/images/CARD/STRAIN/cardback.png' // Specific back image
);

export const card2 = new Card(
  'strain',
  'gelato',
  '/images/CARD/STRAIN/cardgelato.png',
  '/images/CARD/STRAIN/cardback.png' // Specific back image
);

export const card3 = new Card(
  'strain',
  'anothercard',
  '/images/CARD/STRAIN/cardcerealmilk.png',
  '/images/CARD/STRAIN/cardback.png' // Specific back image
);

// New CloverCard instance
export const CloverCard = new Card(
  'strain',
  'clover',
  '/images/CARD/STRAIN/DeckClover.png', // Path to the CloverCard image
  '/images/CARD/STRAIN/cardback.png' // Specific back image
);

// New CardTransport instance
export const CardTransport = new Card(
  'strain',
  'clover',
  '/images/CARD/TRANSPORT/Cardtransport.png', // Path to the CardTransport image
  '/images/CARD/STRAIN/cardback.png' // Specific back image
);

// New BusCard instance
export const BusCard = new Card(
  'transport',
  'bus',
  '/images/CARD/TRANSPORT/cardBus.png', // Path to the BusCard image
  '/images/CARD/STRAIN/cardback.png' // Specific back image
);

// Additional card instances
export const Card1 = new Card(
  'card1',
  'clover',
  '/images/CARD/CARD1/image1.png', // Path to the first additional card image
  '/images/CARD/CARD1/cardback.png' // Path to the back image for the first additional card
);

export const Card2 = new Card(
  'card2',
  'clover',
  '/images/CARD/CARD2/image2.png', // Path to the second additional card image
  '/images/CARD/CARD2/cardback.png' // Path to the back image for the second additional card
);

export const Card3 = new Card(
  'card3',
  'clover',
  '/images/CARD/CARD3/image3.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);

export const CardSneaker = new Card(
  'card3',
  'clover',
  '/images/CARD/EQUIP/CardSneaker.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CardTram = new Card(
  'card3',
  'clover',
  '/images/CARD/TRANSPORT/CardTram.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CardScooter = new Card(
  'card3',
  'clover',
  '/images/CARD/TRANSPORT/CardScooter.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CloverEquip = new Card(
  'card3',
  'clover',
  '/images/CARD/TRANSPORT/CloverEquip.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CardrSun = new Card(
  'card3',
  'clover',
  '/images/CARD/EQUIP/CardSun.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CardWatch = new Card(
  'card3',
  'clover',
  '/images/CARD/EQUIP/CardWatch.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CloverPc = new Card(
  'card3',
  'clover',
  '/images/CARD/PC/CloverPC.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CardAsic1 = new Card(
  'card3',
  'clover',
  '/images/CARD/PC/CardAsic1.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CardAsic2 = new Card(
  'card3',
  'clover',
  '/images/CARD/PC/CardAsic2.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
export const CardAsic3 = new Card(
  'card3',
  'clover',
  '/images/CARD/PC/CardAsic3.png', // Path to the third additional card image
  '/images/CARD/CARD3/cardback.png' // Path to the back image for the third additional card
);
// Export all cards for use in other components
export const cards = [CardTransport, Card1, Card2, Card3, BusCard, CardSneaker,CardTram, CardScooter,CloverEquip,CardrSun,CardWatch,CloverPc,CardAsic1,CardAsic2,CardAsic3]; // Array of all cards including BusCard
