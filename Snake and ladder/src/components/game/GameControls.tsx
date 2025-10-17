import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy } from "lucide-react";
import { Dice } from "./Dice";

interface GameControlsProps {
  currentPlayer: number;
  diceValue: number;
  isRolling: boolean;
  onRollDice: () => void;
  onReset: () => void;
  canRoll: boolean;
  wins: [number, number];
}

export const GameControls = ({
  currentPlayer,
  diceValue,
  isRolling,
  onRollDice,
  onReset,
  canRoll,
  wins,
}: GameControlsProps) => {
  return (
    <div className="space-y-6">
      {/* Current Player */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl p-6 shadow-xl border-2 border-primary/20"
      >
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Current Turn</p>
          <motion.h2
            key={currentPlayer}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-3xl font-bold ${
              currentPlayer === 0 ? "text-player1" : "text-player2"
            }`}
          >
            Player {currentPlayer + 1}
          </motion.h2>
        </div>
      </motion.div>

      {/* Dice Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <Dice value={diceValue} isRolling={isRolling} />
      </motion.div>

      {/* Roll Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          onClick={onRollDice}
          disabled={!canRoll || isRolling}
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform shadow-lg"
        >
          {isRolling ? "Rolling..." : "Roll Dice"}
        </Button>
      </motion.div>

      {/* Scoreboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl p-4 shadow-xl border-2 border-primary/20"
      >
        <div className="flex items-center justify-between mb-3">
          <Trophy className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">Scoreboard</span>
          <Trophy className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-player1 font-semibold">Player 1</span>
            <span className="bg-player1/20 text-player1 font-bold px-3 py-1 rounded-full">
              {wins[0]} wins
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-player2 font-semibold">Player 2</span>
            <span className="bg-player2/20 text-player2 font-bold px-3 py-1 rounded-full">
              {wins[1]} wins
            </span>
          </div>
        </div>
      </motion.div>

      {/* Reset Button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full border-2 hover:bg-muted"
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        New Game
      </Button>
    </div>
  );
};
