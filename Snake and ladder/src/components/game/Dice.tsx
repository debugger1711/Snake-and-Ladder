import { motion } from "framer-motion";
import { Dices } from "lucide-react";

interface DiceProps {
  value: number;
  isRolling: boolean;
}

export const Dice = ({ value, isRolling }: DiceProps) => {
  const dots = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]],
  };

  return (
    <motion.div
      animate={isRolling ? { rotate: 360 } : {}}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`
        w-20 h-20 bg-card rounded-xl shadow-2xl border-4 border-primary
        flex items-center justify-center
        ${isRolling ? 'animate-dice-roll' : ''}
      `}
    >
      {!isRolling && value > 0 ? (
        <div className="grid grid-cols-3 grid-rows-3 gap-1 w-16 h-16 p-2">
          {Array.from({ length: 9 }).map((_, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const hasDot = dots[value as keyof typeof dots]?.some(
              ([r, c]) => r === row && c === col
            );
            return (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: hasDot ? 1 : 0 }}
                transition={{ delay: i * 0.05 }}
                className={`
                  rounded-full
                  ${hasDot ? 'bg-primary' : 'bg-transparent'}
                `}
              />
            );
          })}
        </div>
      ) : (
        <Dices className="w-10 h-10 text-primary" />
      )}
    </motion.div>
  );
};
