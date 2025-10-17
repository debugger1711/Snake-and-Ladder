import { motion } from "framer-motion";

interface PlayerTokenProps {
  player: 1 | 2;
  isActive: boolean;
}

export const PlayerToken = ({ player, isActive }: PlayerTokenProps) => {
  const colors = {
    1: {
      bg: "bg-player1",
      glow: "shadow-[0_0_15px_hsl(var(--player1-glow))]",
      ring: "ring-player1-glow",
    },
    2: {
      bg: "bg-player2",
      glow: "shadow-[0_0_15px_hsl(var(--player2-glow))]",
      ring: "ring-player2-glow",
    },
  };

  return (
    <motion.div
      layoutId={`player-${player}`}
      initial={{ scale: 0 }}
      animate={{ 
        scale: 1,
        rotate: isActive ? [0, -10, 10, 0] : 0,
      }}
      transition={{
        layout: { duration: 0.6, ease: "easeInOut" },
        scale: { duration: 0.3 },
        rotate: { duration: 0.5, repeat: isActive ? Infinity : 0, repeatDelay: 1 }
      }}
      className={`
        absolute inset-0 m-auto w-8 h-8 rounded-full
        ${colors[player].bg}
        ${isActive ? colors[player].glow : ''}
        ${isActive ? `ring-4 ${colors[player].ring}` : 'ring-2 ring-white'}
        flex items-center justify-center
        font-bold text-white text-xs
        z-10
      `}
    >
      P{player}
    </motion.div>
  );
};
