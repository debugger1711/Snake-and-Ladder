import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WinnerModalProps {
  winner: number | null;
  onPlayAgain: () => void;
}

export const WinnerModal = ({ winner, onPlayAgain }: WinnerModalProps) => {
  return (
    <AnimatePresence>
      {winner !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: "spring", damping: 15 }}
            className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-primary"
          >
            {/* Confetti Effect */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -100, x: Math.random() * 400 }}
                  animate={{
                    y: 500,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  className={`absolute w-3 h-3 ${
                    i % 2 === 0 ? "bg-player1" : "bg-player2"
                  } rounded-full opacity-70`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative text-center space-y-6">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
              >
                <Trophy
                  className={`w-24 h-24 mx-auto ${
                    winner === 1 ? "text-player1" : "text-player2"
                  }`}
                />
              </motion.div>

              <div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex items-center justify-center gap-2 mb-2"
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h2 className="text-4xl font-bold text-foreground">
                    Player {winner} Wins!
                  </h2>
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>
                <p className="text-muted-foreground text-lg">
                  Congratulations on reaching square 100!
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={onPlayAgain}
                  size="lg"
                  className="w-full text-lg font-bold bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform shadow-lg"
                >
                  Play Again
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
