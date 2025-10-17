import { motion } from "framer-motion";
import { Square } from "./Square";
import { PlayerToken } from "./PlayerToken";

interface BoardProps {
  playerPositions: [number, number];
  currentPlayer: number;
  snakes: Record<number, number>;
  ladders: Record<number, number>;
}

export const Board = ({ playerPositions, currentPlayer, snakes, ladders }: BoardProps) => {
  const squares = Array.from({ length: 100 }, (_, i) => {
    const row = Math.floor(i / 10);
    const isReverse = row % 2 === 1;
    const position = isReverse ? row * 10 + (9 - (i % 10)) + 1 : i + 1;
    return position;
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-10 gap-1 p-4 bg-card rounded-2xl shadow-2xl border-4 border-primary/20"
    >
      {squares.map((position) => {
        const hasSnake = snakes[position];
        const hasLadder = ladders[position];
        const hasPlayer1 = playerPositions[0] === position;
        const hasPlayer2 = playerPositions[1] === position;

        return (
          <div key={position} className="relative">
            <Square
              number={position}
              hasSnake={!!hasSnake}
              hasLadder={!!hasLadder}
              snakeEnd={hasSnake}
              ladderEnd={hasLadder}
            />
            {hasPlayer1 && (
              <PlayerToken player={1} isActive={currentPlayer === 0} />
            )}
            {hasPlayer2 && (
              <PlayerToken player={2} isActive={currentPlayer === 1} />
            )}
          </div>
        );
      })}
    </motion.div>
  );
};
