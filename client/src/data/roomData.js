import standardRoom from '../assets/standard-room.png.png'
import deluxeRoom from '../assets/deluxe-room.png.png'

const roomData = [
  {
    id: 1,
    name: 'Standard Room',
    description:
      'A clean and comfortable room with all the essentials for a relaxing stay.',
    price: 1499,
    image: standardRoom,
    features: ['2 Guests', 'AC', 'Free Wi-Fi', '24-Hour Stay'],
  },
  {
    id: 2,
    name: 'Deluxe Room',
    description:
      'A spacious room with upgraded comfort and amenities for a premium stay experience.',
    price: 2499,
    image: deluxeRoom,
    features: ['2 Guests', 'AC', 'Free Wi-Fi', 'TV', '24-Hour Stay'],
  },
]

export default roomData