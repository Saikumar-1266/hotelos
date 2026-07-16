import biryaniImage from '../assets/biryani.jpg.png'
import naanImage from '../assets/butter-naan.jpg.png'
import curryImage from '../assets/curry.jpg.png'
import tiffinImage from '../assets/tiffin.jpg.png'

const menuData = [
  {
    id: 1,
    name: 'Special Chicken Biryani',
    category: 'Biryani',
    description: 'Aromatic basmati rice cooked with tender chicken and traditional spices.',
    price: 299,
    image: biryaniImage,
  },
  {
    id: 2,
    name: 'Butter Naan',
    category: 'Indian Breads',
    description: 'Soft and fluffy tandoor-baked naan finished with delicious butter.',
    price: 60,
    image: naanImage,
  },
  {
    id: 3,
    name: 'Special Curry',
    category: 'Main Course',
    description: 'Rich and flavourful curry prepared with our signature blend of spices.',
    price: 249,
    image: curryImage,
  },
  {
    id: 4,
    name: 'South Indian Tiffin',
    category: 'Breakfast',
    description: 'Fresh and comforting South Indian favourites served with chutney and sambar.',
    price: 99,
    image: tiffinImage,
  },
]

export default menuData