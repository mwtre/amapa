'use client';

import { Card } from '@chakra-ui/react';
import './Card.css'; // Import the CSS styles
import { motion } from 'framer-motion';
import { CardContent } from '../ui/card';

interface CardProps {
  id: number;
  isMain?: boolean;
  onClick?: () => void;
  image?: string; // Add image prop
}

const CardComponent = ({ id, isMain = false, onClick, image }: CardProps) => (
  <motion.div
    className={`w-32 h-48 ${isMain ? '' : 'cursor-pointer'}`}
    whileHover={isMain ? {} : { scale: 1.1 }}
    onClick={onClick}
  >
    <Card className="w-full h-full">
      <CardContent className="flex items-center justify-center h-full">
        {image ? (
          <img src={image} alt={`Card ${id}`} className="w-full h-full object-cover" /> // Display image
        ) : (
          <span className="text-4xl font-bold">{id}</span>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

export default CardComponent;
