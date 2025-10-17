import { motion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";

interface SquareProps {
  number: number;
  hasSnake: boolean;
  hasLadder: boolean;
  snakeEnd?: number;
  ladderEnd?: number;
}

export const Square = ({ number, hasSnake, hasLadder, snakeEnd, ladderEnd }: SquareProps) => {
  const isSpecial = hasSnake || hasLadder;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        relative aspect-square rounded-lg border-2 flex items-center justify-center
        font-bold text-sm transition-all
        ${isSpecial ? 'border-border' : 'border-board-border'}
        ${hasSnake ? 'bg-gradient-to-br from-snake to-snake-dark text-white' : ''}
        ${hasLadder ? 'bg-gradient-to-br from-ladder to-ladder-dark text-white' : ''}
        ${!isSpecial ? 'bg-board-tile text-foreground' : ''}
      `}
    >
      <span className="absolute top-0.5 left-1 text-[10px] opacity-70">{number}</span>
      
      {hasSnake && (
        <div className="flex flex-col items-center">
          <ArrowDown className="w-4 h-4" />
          <span className="text-[8px] mt-0.5">→{snakeEnd}</span>
        </div>
      )}
      
      {hasLadder && (
        <div className="flex flex-col items-center">
          <ArrowUp className="w-4 h-4" />
          <span className="text-[8px] mt-0.5">→{ladderEnd}</span>
        </div>
      )}
    </motion.div>
  );
};
