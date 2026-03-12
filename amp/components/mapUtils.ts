import L from 'leaflet'
import bulldogIconUrl from '../app/asset/icobuldog.png';

export const nftTypes = [
  { name: 'Hooker', icon: '👠', color: '#FF69B4' },
  { name: 'Light Drugs', icon: '💊', color: '#90EE90' },
  { name: 'Hard Drugs', icon: '💉', color: '#FF4500' },
  { name: 'Pimp', icon: '🕴️', color: '#800080' },
  { name: 'Weed', icon: '🌿', color: '#00FF00' },
  { name: 'Hash', icon: '🍫', color: '#8B4513' },
  { name: 'Junky', icon: '🧟', color: '#A9A9A9' },
  { name: 'Tourist', icon: '📸', color: '#FFD700' },
  { name: 'Dutch', icon: '🇳🇱', color: '#FFA500' },
  { name: 'Bike', icon: '🚲', color: '#1E90FF' },
  { name: 'Cheese', icon: '🧀', color: '#FFFF00' },
  { name: 'Tulip', icon: '🌷', color: '#FF1493' },
  { name: 'DJ', icon: '🎧', color: '#8A2BE2' },
  { name: 'Canal', icon: '🚤', color: '#00CED1' },
  { name: 'Art', icon: '🎨', color: '#FF4500' },
  { name: 'Windmill', icon: '💨', color: '#708090' },
  { name: 'Stroopwafel', icon: '🍪', color: '#D2691E' },
  { name: 'Football', icon: '⚽', color: '#FF8C00' },
]

export const nftLocations = [
  { type: 'Hooker', lat: 52.3731, lng: 4.8976, name: 'Red Light District Diva' },
  { type: 'Light Drugs', lat: 52.3680, lng: 4.8949, name: 'Mellow Yellow Coffeeshop' },
  { type: 'Hard Drugs', lat: 52.3739, lng: 4.8983, name: 'Underground Rave' },
  { type: 'Pimp', lat: 52.3734, lng: 4.8963, name: 'Flashy Suit Guy' },
  { type: 'Weed', lat: 52.3722, lng: 4.8971, name: 'Green Haze Dispensary' },
  { type: 'Hash', lat: 52.3718, lng: 4.8987, name: 'Moroccan Tea House' },
  { type: 'Junky', lat: 52.3745, lng: 4.8978, name: 'Needle Park' },
  { type: 'Tourist', lat: 52.3752, lng: 4.8970, name: 'I Amsterdam Sign' },
  { type: 'Dutch', lat: 52.3748, lng: 4.8955, name: 'Windmill Enthusiast' },
  { type: 'Bike', lat: 52.3765, lng: 4.9000, name: 'Bicycle Parking Tower' },
  { type: 'Cheese', lat: 52.3726, lng: 4.8993, name: 'Henri\'s Cheese Emporium' },
  { type: 'Tulip', lat: 52.3714, lng: 4.8978, name: 'Bloemenmarkt Flower Stall' },
  { type: 'DJ', lat: 52.3740, lng: 4.8950, name: 'Melkweg Nightclub' },
  { type: 'Canal', lat: 52.3675, lng: 4.8985, name: 'Prinsengracht Cruise' },
  { type: 'Art', lat: 52.3700, lng: 4.8810, name: 'Van Gogh Museum Masterpiece' },
  { type: 'Windmill', lat: 52.3740, lng: 4.8920, name: 'De Gooyer Windmill' },
  { type: 'Stroopwafel', lat: 52.3780, lng: 4.8990, name: 'Albert Cuyp Market Treat' },
  { type: 'Football', lat: 52.3140, lng: 4.9420, name: 'Johan Cruyff Arena' },
  { type: 'Hooker', lat: 52.3736, lng: 4.8981, name: 'Oudekerksplein Working Girl' },
  { type: 'Light Drugs', lat: 52.3710, lng: 4.8940, name: 'The Bulldog Coffeeshop' },
  { type: 'Weed', lat: 52.3730, lng: 4.8960, name: 'Greenhouse Effect' },
  { type: 'Tourist', lat: 52.3600, lng: 4.8852, name: 'Rijksmuseum Selfie Spot' },
  { type: 'Dutch', lat: 52.3730, lng: 4.8896, name: 'Anne Frank House Queue' },
  { type: 'Bike', lat: 52.3780, lng: 4.9000, name: 'Vondelpark Cyclist' },
  { type: 'Cheese', lat: 52.3722, lng: 4.8987, name: 'Old Amsterdam Cheese Store' },
  { type: 'Tulip', lat: 52.3722, lng: 4.8987, name: 'Keukenhof Gardens Tour Booth' },
  { type: 'DJ', lat: 52.3636, lng: 4.8857, name: 'Paradiso Music Venue' },
  { type: 'Canal', lat: 52.3681, lng: 4.8984, name: 'Canal Ring UNESCO Site' },
  { type: 'Art', lat: 52.3667, lng: 4.8851, name: 'Stedelijk Museum Modern Art' },
  { type: 'Windmill', lat: 52.3741, lng: 4.8830, name: 'Molen van Sloten' },
  { type: 'Stroopwafel', lat: 52.3783, lng: 4.8970, name: 'Lanskroon Bakery' },
  { type: 'Football', lat: 52.3422, lng: 4.9171, name: 'Ajax Fan Shop' },
]

export const coffeeShops = [
  { name: "The Bulldog", address: "Oudezijds Voorburgwal 90, 1012 GG Amsterdam", lat: 52.3731, lng: 4.8967, iconUrl: '/images/icobuldog.png' },
  { name: "Barney's Coffeeshop", address: "Haarlemmerstraat 102, 1013 EW Amsterdam", lat: 52.3800, lng: 4.8936, iconUrl: '/images/icobarneys.png' },
  { name: "Green House Coffeeshop", address: "Oudezijds Voorburgwal 191, 1012 EW Amsterdam", lat: 52.3726, lng: 4.8972, iconUrl: '/images/icogreen.png' },
  { name: "Grey Area", address: "Oude Leliestraat 2, 1015 AW Amsterdam", lat: 52.3747, lng: 4.8845, iconUrl: '/images/icogrey.png' },
  { name: "Dampkring", address: "Handboogstraat 29, 1012 XM Amsterdam", lat: 52.3679, lng: 4.8907, iconUrl: '/images/dicodam.png' },
  { name: "Coffeeshop Amsterdam", address: "Haarlemmerstraat 44, 1013 ES Amsterdam", lat: 52.3794, lng: 4.8957, iconUrl: '/images/amsterdam-icon.png' },
  { name: "Abraxas", address: "Jonge Roelensteeg 12-14, 1012 PL Amsterdam", lat: 52.3702, lng: 4.8921, iconUrl: '/images/icoabra.png' },
  { name: "The Otherside", address: "Amstel 8, 1017 AA Amsterdam", lat: 52.3675, lng: 4.8962, iconUrl: '/images/icoother.png' },
  { name: "Boerejongens", address: "Utrechtsestraat 21, 1017 VH Amsterdam", lat: 52.3659, lng: 4.8957, iconUrl: '/images/icoboer.png' },
  { name: "420 Café", address: "Oudebrugsteeg 27, 1012 JN Amsterdam", lat: 52.3747, lng: 4.8977, iconUrl: '/images/ico420.png' },
]

export const createIcon = (icon: string) => {
  return L.divIcon({
    html: `<div class="flex items-center justify-center w-8 h-8 rounded-full bg-black text-2xl">${icon}</div>`,
    className: 'custom-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  })
}

export const bulldogIcon = new L.Icon({
  iconUrl: bulldogIconUrl.src,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const defaultCoffeeShopIcon = new L.Icon({
  iconUrl: '/images/icobuldog.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});