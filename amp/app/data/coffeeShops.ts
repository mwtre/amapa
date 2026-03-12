export interface CoffeeShopData {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  customIcon: boolean;
  iconUrl: string;
  descriptionImageUrl: string;
  rating: string;
  popularity: string;
  speciality: string;
  description: string;
  size?: number; 
  stats: {
    variety: number;
    quality: number;
    vibe: number;
    value: number;
    
  };
  nftGallery: Array<{
    id: string;
    name: string;
    image: string;
    rarity: string;
  }>;
  influenceZone: [number, number][];
  zoneColor: string;
  iconSize: [number, number]; // Add this line to specify the icon size
}

import { withBasePath } from '@/lib/basePath';

const coffeeShopsRaw: CoffeeShopData[] = [
  {
    id: '1',
    name: 'The Bulldog',
    address: 'Oudezijds Voorburgwal 90, 1012 GG Amsterdam',
    lat: 52.3731,
    lng: 4.8976,
    customIcon: true,
    iconUrl: '/images/icobull.svg',
    descriptionImageUrl: '/images/icobull.svg',
    rating: '4.2',
    popularity: 'high',
    speciality: 'Classic Amsterdam experience',
    description: 'One of the most famous and oldest coffee shop brands in Amsterdam.',
    stats: {
      variety: 8,
      quality: 7,
      vibe: 9,
      value: 6
    },
    nftGallery: [
      { id: '1', name: 'Bulldog official', image: '/images/bulldog/B.official.jpeg', rarity: 'legendary' },
    ],
    influenceZone: [
      [52.3731, 4.8957],
      [52.3741, 4.8967],
      [52.3721, 4.8977],
      [52.3721, 4.8957],
    ],
    zoneColor: '#FF5733',
    iconSize: [60, 60], // Add this line to specify the icon size
  },
  {
    id: '2',
    name: "Barney's Coffeeshop",
    address: 'Haarlemmerstraat 102, 1013 EW Amsterdam',
    lat: 52.3800,
    lng: 4.8936,
    customIcon: true,
    iconUrl: '/images/icosun.png',
    descriptionImageUrl: '/images/icosun.png',
    rating: '4.5',
    popularity: 'high',
    speciality: 'Award-winning cannabis strains',
    description: 'Known for its high-quality products and multiple Cannabis Cup wins.',
    stats: {
      variety: 9,
      quality: 9,
      vibe: 8,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Barney\'s Logo', image: '/nfts/barneys1.jpg', rarity: 'legendary' },
    ],
    influenceZone: [
      [52.3800, 4.8916],
      [52.3810, 4.8926],
      [52.3790, 4.8936],
      [52.3790, 4.8916],
    ],
    zoneColor: '#33FF57',
    iconSize: [60, 60], // Add this line to specify the icon size
  },
  {
    id: '3',
    name: 'Green House Coffeeshop',
    address: 'Oudezijds Voorburgwal 191, 1012 EW Amsterdam',
    lat: 52.3726,
    lng: 4.8972,
    customIcon: true,
    iconUrl: '/images/icogreen.png',
    descriptionImageUrl: '/images/icogreen.png',
    rating: '4.4',
    popularity: 'high',
    speciality: 'Cannabis Cup winners',
    description: 'Famous for winning multiple Cannabis Cups and attracting celebrity visitors.',
    stats: {
      variety: 7,
      quality: 9,
      vibe: 8,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Green House Cup', image: '/nfts/greenhouse1.jpg', rarity: 'epic' },
    ],
    influenceZone: [
      [52.3726, 4.8952],
      [52.3736, 4.8962],
      [52.3716, 4.8972],
      [52.3716, 4.8952],
    ],
    zoneColor: '#66CC66',
    iconSize: [100, 100], // Add this line to specify the icon size
  },
  {
    id: '4',
    name: 'Grey Area',
    address: 'Oude Leliestraat 2, 1015 AW Amsterdam',
    lat: 52.3747,
    lng: 4.8845,
    customIcon: true,
    iconUrl: '/images/icogrey.png',
    descriptionImageUrl: '/images/icogrey.png',
    rating: '4.4',
    popularity: 'medium',
    speciality: 'American-style coffeeshop',
    description: 'Small, cozy coffeeshop known for its American owners and high-quality products.',
    stats: {
      variety: 7,
      quality: 9,
      vibe: 8,
      value: 8
    },
    nftGallery: [
      { id: '1', name: 'Grey Area Logo', image: '/images/greyarea1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3747, 4.8825],
      [52.3757, 4.8835],
      [52.3737, 4.8845],
      [52.3737, 4.8825],
    ],
    zoneColor: '#CCCCCC',
    iconSize: [60, 60], // Add this line to specify the icon size
  },
  {
    id: '5',
    name: 'Dampkring',
    address: 'Handboogstraat 29, 1012 XM Amsterdam',
    lat: 52.3679,
    lng: 4.8907,
    customIcon: true,
    iconUrl: '/images/icodam.png',
    descriptionImageUrl: '/images/icodam.png',
    rating: '4.2',
    popularity: 'high',
    speciality: 'Artistic interior',
    description: 'Known for its unique, artistic interior and appearance in Ocean\'s Twelve.',
    stats: {
      variety: 8,
      quality: 8,
      vibe: 9,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Dampkring Art', image: '/images/dampkring1.jpg', rarity: 'legendary' },
    ],
    influenceZone: [
      [52.3679, 4.8887],
      [52.3689, 4.8897],
      [52.3669, 4.8907],
      [52.3669, 4.8887],
    ],
    zoneColor: '#FF9900',
    iconSize: [60, 60], // Add this line to specify the icon size
  },
  {
    id: '6',
    name: 'Coffeeshop Amsterdam',
    address: 'Haarlemmerstraat 44, 1013 ES Amsterdam',
    lat: 52.3798,
    lng: 4.8955,
    customIcon: false,
    iconUrl: '/images/icoams.svg',
    descriptionImageUrl: '/images/icoams.svg',
    rating: '4.1',
    popularity: 'medium',
    speciality: 'Friendly service',
    description: 'A laid-back spot popular for its friendly service and good-quality strains.',
    stats: {
      variety: 8,
      quality: 7,
      vibe: 9,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Amsterdam Sign', image: '/nfts/amsterdam1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3798, 4.8935],
      [52.3808, 4.8945],
      [52.3788, 4.8955],
      [52.3788, 4.8935],
    ],
    zoneColor: '#3366CC',
    iconSize: [60, 60], // Add this line to specify the icon size
  },
  {
    id: '7',
    name: 'Abraxas',
    address: 'Jonge Roelensteeg 12-14, 1012 PL Amsterdam',
    lat: 52.3702,
    lng: 4.8936,
    customIcon: true,
    iconUrl: '/images/icoabra.png',
    descriptionImageUrl: '/images/icoabra.png',
    rating: '4.3',
    popularity: 'medium',
    speciality: 'Unique multi-level design',
    description: 'A coffeeshop with a unique multi-level design and psychedelic decor.',
    stats: {
      variety: 6,
      quality: 8,
      vibe: 10,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Abraxas Art', image: '/nfts/abraxas1.jpg', rarity: 'epic' },
    ],
    influenceZone: [
      [52.3702, 4.8916],
      [52.3712, 4.8926],
      [52.3692, 4.8936],
      [52.3692, 4.8916],
    ],
    zoneColor: '#FF3333',
    iconSize: [90, 90], // Add this line to specify the icon size
  },
  {
    id: '8',
    name: 'The Otherside',
    address: 'Amstel 8, 1017 AA Amsterdam',
    lat: 52.3681,
    lng: 4.8969,
    customIcon: true,
    iconUrl: '/images/icoother.png',
    descriptionImageUrl: '/images/icoother.png',
    rating: '4.2',
    popularity: 'medium',
    speciality: 'Wide variety of products',
    description: 'A stylish coffee shop located by the river, known for a wide variety of products.',
    stats: {
      variety: 10,
      quality: 7,
      vibe: 8,
      value: 6
    },
    nftGallery: [
      { id: '1', name: 'Otherside View', image: '/nfts/otherside1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3681, 4.8949],
      [52.3691, 4.8959],
      [52.3671, 4.8969],
      [52.3671, 4.8949],
    ],
    zoneColor: '#3333FF',
    iconSize: [60, 60], // Add this line to specify the icon size
  },
  {
    id: '9',
    name: 'Boerejongens',
    address: 'Utrechtsestraat 21, 1017 VH Amsterdam',
    lat: 52.3661,
    lng: 4.8957,
    customIcon: true,
    iconUrl: '/images/icoboer.jpg',
    descriptionImageUrl: '/images/icoboer.jpg',
    rating: '4.7',
    popularity: 'high',
    speciality: 'Professional atmosphere',
    description: 'Often praised for its professional atmosphere and high-quality cannabis.',
    stats: {
      variety: 7,
      quality: 10,
      vibe: 8,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Professional Staff', image: '/nfts/boerejongens1.jpg', rarity: 'legendary' },
    ],
    influenceZone: [
      [52.3661, 4.8937],
      [52.3671, 4.8947],
      [52.3651, 4.8957],
      [52.3651, 4.8937],
    ],
    zoneColor: '#33FF33',
    iconSize: [60, 60], // Add this line to specify the icon size
  },
  {
    id: '10',
    name: '420 Café',
    address: 'Oudebrugsteeg 27, 1012 JN Amsterdam',
    lat: 52.3744,
    lng: 4.8975,
    customIcon: true,
    iconUrl: '/images/ico420.png',
    descriptionImageUrl: '/images/ico420.png',
    rating: '4.0',
    popularity: 'medium',
    speciality: 'Cozy for first-timers',
    description: 'A more laid-back and cozy option, perfect for first-time visitors.',
    stats: {
      variety: 7,
      quality: 8,
      vibe: 10,
      value: 6
    },
    nftGallery: [
      { id: '1', name: 'Cozy Corner', image: '/nfts/420cafe1.jpg', rarity: 'uncommon' },
    ],
    influenceZone: [
      [52.3744, 4.8955],
      [52.3754, 4.8965],
      [52.3734, 4.8975],
      [52.3734, 4.8955],
    ],
    zoneColor: '#FFFFFF',
    iconSize: [60, 60], // Add this line to specify the icon size
  },
  {
    id: '11',
    name: 'Coffeeshop Central',
    address: 'Prins Hendrikkade 89, 1012 AE Amsterdam',
    lat: 52.3779,
    lng: 4.9005,
    customIcon: true,
    iconUrl: '/images/icocentral.png',
    descriptionImageUrl: '/images/icocentral.png',
    rating: '4.0',
    popularity: 'medium',
    speciality: 'Central location',
    description: 'Conveniently located near Central Station, popular among tourists.',
    stats: {
      variety: 7,
      quality: 7,
      vibe: 8,
      value: 8
    },
    nftGallery: [
      { id: '1', name: 'Central View', image: '/images/central1.jpg', rarity: 'uncommon' },
    ],
    influenceZone: [
      [52.3779, 4.8985],
      [52.3789, 4.8995],
      [52.3769, 4.9005],
      [52.3769, 4.8985],
    ],
    zoneColor: '#FF9933',
    iconSize: [90, 90], // Add this line to specify the icon size
  },
  {
    id: '12',
    name: 'The Dolphins',
    address: 'Kerkstraat 39, 1017 GB Amsterdam',
    lat: 52.3663,
    lng: 4.8898,
    customIcon: true,
    iconUrl: '/images/icodol.png',
    descriptionImageUrl: '/images/icodol.png',
    rating: '4.2',
    popularity: 'medium',
    speciality: 'Relaxed atmosphere',
    description: 'A cozy coffeeshop with a relaxed vibe and friendly staff.',
    stats: {
      variety: 6,
      quality: 8,
      vibe: 9,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Dolphin Logo', image: '/images/dolphins1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3663, 4.8878],
      [52.3673, 4.8888],
      [52.3653, 4.8898],
      [52.3653, 4.8878],
    ],
    zoneColor: '#33CCFF',
    iconSize: [70, 70], // Add this line to specify the icon size
  },
  {
    id: '13',
    name: 'Coffeeshop 36',
    address: 'Warmoesstraat 36, 1012 JE Amsterdam',
    lat: 52.3739,
    lng: 4.8979,
    customIcon: true,
    iconUrl: '/images/ico36.png',
    descriptionImageUrl: '/images/ico36.png',
    rating: '3.9',
    popularity: 'medium',
    speciality: 'Historic location',
    description: 'Located in one of Amsterdam\'s oldest streets, offering a taste of history.',
    stats: {
      variety: 7,
      quality: 7,
      vibe: 8,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Historic Street', image: '/images/36-1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3739, 4.8959],
      [52.3749, 4.8969],
      [52.3729, 4.8979],
      [52.3729, 4.8959],
    ],
    zoneColor: '#CC9966',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '14',
    name: 'Siberie',
    address: 'Brouwersgracht 11, 1015 GA Amsterdam',
    lat: 52.3798,
    lng: 4.8920,
    customIcon: true,
    iconUrl: '/images/icosiberie.png',
    descriptionImageUrl: '/images/icosiberie.png',
    rating: '4.4',
    popularity: 'high',
    speciality: 'Organic products',
    description: 'Known for its high-quality organic products and knowledgeable staff.',
    stats: {
      variety: 8,
      quality: 9,
      vibe: 8,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Organic Selection', image: '/images/siberie1.jpg', rarity: 'legendary' },
    ],
    influenceZone: [
      [52.3798, 4.8900],
      [52.3808, 4.8910],
      [52.3788, 4.8920],
      [52.3788, 4.8900],
    ],
    zoneColor: '#66CC99',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '15',
    name: 'Coffeeshop Smokey',
    address: 'Rembrandtplein 24, 1017 CV Amsterdam',
    lat: 52.3663,
    lng: 4.8964,
    customIcon: true,
    iconUrl: '/images/icosmokey.png',
    descriptionImageUrl: '/images/icosmokey.png',
    rating: '4.1',
    popularity: 'high',
    speciality: 'Lively atmosphere',
    description: 'Located in the bustling Rembrandtplein, known for its energetic vibe.',
    stats: {
      variety: 8,
      quality: 7,
      vibe: 9,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Smokey Nights', image: '/images/smokey1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3663, 4.8944],
      [52.3673, 4.8954],
      [52.3653, 4.8964],
      [52.3653, 4.8944],
    ],
    zoneColor: '#FF6699',
    iconSize: [80, 80], // Add this line to specify the icon size
  },
  {
    id: '16',
    name: 'The Green Light',
    address: 'Korte Leidsedwarsstraat 77, 1017 PW Amsterdam',
    lat: 52.3638,
    lng: 4.8827,
    customIcon: true,
    iconUrl: '/images/icolight.png',
    descriptionImageUrl: '/images/icolight.png',
    rating: '4.3',
    popularity: 'medium',
    speciality: 'Eco-friendly practices',
    description: 'Known for its commitment to sustainability and eco-friendly practices.',
    stats: {
      variety: 7,
      quality: 8,
      vibe: 9,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Green Practices', image: '/images/greenlight1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3638, 4.8807],
      [52.3648, 4.8817],
      [52.3628, 4.8827],
      [52.3628, 4.8807],
    ],
    zoneColor: '#66FF66',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '17',
    name: 'Canna Cafe',
    address: 'Marnixstraat 248, 1016 TL Amsterdam',
    lat: 52.3705,
    lng: 4.8789,
    customIcon: true,
    iconUrl: '/images/icocanna.png',
    descriptionImageUrl: '/images/icocanna.png',
    rating: '4.0',
    popularity: 'medium',
    speciality: 'Cannabis-infused drinks',
    description: 'Offers a unique selection of cannabis-infused beverages alongside traditional options.',
    stats: {
      variety: 9,
      quality: 7,
      vibe: 8,
      value: 6
    },
    nftGallery: [
      { id: '1', name: 'Infused Latte', image: '/images/canna1.jpg', rarity: 'epic' },
    ],
    influenceZone: [
      [52.3705, 4.8769],
      [52.3715, 4.8779],
      [52.3695, 4.8789],
      [52.3695, 4.8769],
    ],
    zoneColor: '#FF66CC',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '18',
    name: 'Coffeeshop Carmona',
    address: 'Tweede Jan van der Heijdenstraat 43, 1074 XN Amsterdam,',
    lat: 52.3734,
    lng: 4.8935,
    customIcon: true,
    iconUrl: '/images/icomel.png',
    descriptionImageUrl: '/images/icomel.png',
    rating: '4.2',
    popularity: 'high',
    speciality: 'Relaxation lounge',
    description: 'Features a dedicated relaxation lounge with comfortable seating and ambient music.',
    stats: {
      variety: 6,
      quality: 8,
      vibe: 10,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Lounge Area', image: '/images/mellow1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3734, 4.8915],
      [52.3744, 4.8925],
      [52.3724, 4.8935],
      [52.3724, 4.8915],
    ],
    zoneColor: '#9966FF',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '19',
    name: 'Happy Days',
    address: 'Amsteldijk 139, 1079 LE Amsterdam,',
    lat: 52.3688,
    lng: 4.8841,
    customIcon: true,
    iconUrl: '/images/icohappy.png',
    descriptionImageUrl: '/images/icohappy.png',
    rating: '4.4',
    popularity: 'high',
    speciality: 'Cannabis education',
    description: 'Offers educational sessions about cannabis strains, effects, and responsible use.',
    stats: {
      variety: 8,
      quality: 9,
      vibe: 7,
      value: 8
    },
    nftGallery: [
      { id: '1', name: 'Strain Guide', image: '/images/hightimes1.jpg', rarity: 'legendary' },
    ],
    influenceZone: [
      [52.3688, 4.8821],
      [52.3698, 4.8831],
      [52.3678, 4.8841],
      [52.3678, 4.8821],
    ],
    zoneColor: '#FFCC00',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '20',
    name: 'The Plug 3',
    address: 'Rusland 16, 1012 CL Amsterdam, ',
    lat: 52.3721,
    lng: 4.8912,
    customIcon: true,
    iconUrl: '/images/icoplug.png',
    descriptionImageUrl: '/images/icoplug.png',
    rating: '4.1',
    popularity: 'medium',
    speciality: 'Space-themed decor',
    description: 'Features unique space-themed decor and offers "cosmic" strains and edibles.',
    stats: {
      variety: 7,
      quality: 8,
      vibe: 9,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Cosmic Interior', image: '/images/cosmic1.jpg', rarity: 'epic' },
    ],
    influenceZone: [
      [52.3721, 4.8892],
      [52.3731, 4.8902],
      [52.3711, 4.8912],
      [52.3711, 4.8892],
    ],
    zoneColor: '#3366FF',
    iconSize: [80, 80], // Add this line to specify the icon size
  },
  {
    id: '21',
    name: 'Solo Coffeeshop',
    address: 'Korte Koningsstraat 2, 1011 GA Amsterdam,',
    lat: 52.3729,
    lng: 4.8909,
    customIcon: true,
    iconUrl: '/images/icosolo.png',
    descriptionImageUrl: '/images/icosolo.png',
    rating: '4.3',
    popularity: 'medium',
    speciality: 'Hemp-based products',
    description: 'Specializes in hemp-based products and educates visitors about hemp uses.',
    stats: {
      variety: 8,
      quality: 9,
      vibe: 7,
      value: 8
    },
    nftGallery: [
      { id: '1', name: 'Hemp Collection', image: '/images/hemp1.jpg', rarity: 'rare' },
    ],
    influenceZone: [
      [52.3729, 4.8889],
      [52.3739, 4.8899],
      [52.3719, 4.8909],
      [52.3719, 4.8889],
    ],
    zoneColor: '#33CC33',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '22',
    name: 'Retro Roach',
    address: 'Reguliersdwarsstraat 31, 1017 BK Amsterdam',
    lat: 52.3666,
    lng: 4.8936,
    customIcon: true,
    iconUrl: '/images/icoretro.png',
    descriptionImageUrl: '/images/icoretro.png',
    rating: '4.0',
    popularity: 'medium',
    speciality: '70s-themed atmosphere',
    description: 'A groovy, 70s-themed coffeeshop with retro decor and classic strains.',
    stats: {
      variety: 6,
      quality: 7,
      vibe: 10,
      value: 8
    },
    nftGallery: [
      { id: '1', name: 'Groovy Interior', image: '/images/retro1.jpg', rarity: 'epic' },
    ],
    influenceZone: [
      [52.3666, 4.8916],
      [52.3676, 4.8926],
      [52.3656, 4.8936],
      [52.3656, 4.8916],
    ],
    zoneColor: '#FF6600',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '23',
    name: 'The Zen Den',
    address: 'Herengracht 427, 1017 BR Amsterdam',
    lat: 52.3675,
    lng: 4.8876,
    customIcon: true,
    iconUrl: '/images/icozen.png',
    descriptionImageUrl: '/images/icozen.png',
    rating: '4.5',
    popularity: 'high',
    speciality: 'Meditation sessions',
    description: 'Offers guided meditation sessions and a serene atmosphere for relaxation.',
    stats: {
      variety: 7,
      quality: 9,
      vibe: 10,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Meditation Room', image: '/images/zen1.jpg', rarity: 'legendary' },
    ],
    influenceZone: [
      [52.3675, 4.8856],
      [52.3685, 4.8866],
      [52.3665, 4.8876],
      [52.3665, 4.8856],
    ],
    zoneColor: '#66CCCC',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '24',
    name: 'The Chronic Chronicle',
    address: 'Leidseplein 12, 1017 PT Amsterdam',
    lat: 52.3639,
    lng: 4.8824,
    customIcon: true,
    iconUrl: '/images/icochronic.png',
    descriptionImageUrl: '/images/icochronic.png',
    rating: '4.2',
    popularity: 'high',
    speciality: 'Cannabis history museum',
    description: 'Features a small museum showcasing the history of cannabis in Amsterdam.',
    stats: {
      variety: 8,
      quality: 8,
      vibe: 9,
      value: 7
    },
    nftGallery: [
      { id: '1', name: 'Historic Artifacts', image: '/images/chronic1.jpg', rarity: 'epic' },
    ],
    influenceZone: [
      [52.3639, 4.8804],
      [52.3649, 4.8814],
      [52.3629, 4.8824],
      [52.3629, 4.8804],
    ],
    zoneColor: '#CC9933',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
  {
    id: '25',
    name: 'The Bud Boutique',
    address: 'Vijzelstraat 91, 1017 HG Amsterdam',
    lat: 52.3656,
    lng: 4.8923,
    customIcon: true,
    iconUrl: '/images/icoboutique.png',
    descriptionImageUrl: '/images/icoboutique.png',
    rating: '4.4',
    popularity: 'medium',
    speciality: 'Luxury cannabis experience',
    description: 'Offers a high-end, boutique experience with premium strains and products.',
    stats: {
      variety: 9,
      quality: 10,
      vibe: 8,
      value: 6
    },
    nftGallery: [
      { id: '1', name: 'Luxury Interior', image: '/images/boutique1.jpg', rarity: 'legendary' },
      { id: '2', name: 'Premium Selection', image: '/images/boutique2.jpg', rarity: 'epic' },
    ],
    influenceZone: [
      [52.3656, 4.8903],
      [52.3666, 4.8913],
      [52.3646, 4.8923],
      [52.3646, 4.8903],
    ],
    zoneColor: '#CC66FF',
    iconSize: [40, 40], // Add this line to specify the icon size
  },
];

export const coffeeShops: CoffeeShopData[] = coffeeShopsRaw.map((shop) => ({
  ...shop,
  iconUrl: withBasePath(shop.iconUrl),
  descriptionImageUrl: withBasePath(shop.descriptionImageUrl),
  nftGallery: shop.nftGallery.map((nft) => ({
    ...nft,
    image: withBasePath(nft.image),
  })),
}));

export const coffeeShopIds: string[] = coffeeShops.map(shop => shop.id);