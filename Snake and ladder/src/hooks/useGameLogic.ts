import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

const SNAKES: Record<number, number> = {
  17: 4,
  19: 7,
  54: 34,
  62: 18,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 79,
};

const LADDERS: Record<number, number> = {
  3: 22,
  5: 8,
  11: 26,
  20: 29,
  27: 56,
  72: 92,
};

export const useGameLogic = () => {
  const [playerPositions, setPlayerPositions] = useState<[number, number]>([1, 1]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [wins, setWins] = useState<[number, number]>([0, 0]);
  const [canRoll, setCanRoll] = useState(true);

  const rollDice = useCallback(() => {
    if (isRolling || !canRoll || winner !== null) return;

    setIsRolling(true);
    setCanRoll(false);

    // Simulate dice roll animation
    const roll = Math.floor(Math.random() * 6) + 1;
    
    setTimeout(() => {
      setDiceValue(roll);
      setIsRolling(false);
      movePlayer(roll);
    }, 600);
  }, [isRolling, canRoll, winner, currentPlayer, playerPositions]);

  const movePlayer = (steps: number) => {
    const newPositions: [number, number] = [...playerPositions];
    let newPosition = newPositions[currentPlayer] + steps;

    // Prevent overshooting
    if (newPosition > 100) {
      toast({
        title: "Cannot move!",
        description: `Need exactly ${100 - playerPositions[currentPlayer]} to win`,
        variant: "destructive",
      });
      setTimeout(() => {
        if (steps !== 6) {
          switchPlayer();
        }
        setCanRoll(true);
      }, 1000);
      return;
    }

    // Check for win
    if (newPosition === 100) {
      newPositions[currentPlayer] = newPosition;
      setPlayerPositions(newPositions);
      
      setTimeout(() => {
        setWinner(currentPlayer + 1);
        const newWins: [number, number] = [...wins];
        newWins[currentPlayer]++;
        setWins(newWins);
        
        toast({
          title: "🎉 Winner!",
          description: `Player ${currentPlayer + 1} has won the game!`,
        });
      }, 800);
      return;
    }

    // Update position
    newPositions[currentPlayer] = newPosition;
    setPlayerPositions(newPositions);

    // Check for snakes and ladders after a delay
    setTimeout(() => {
      if (SNAKES[newPosition]) {
        const snakeEnd = SNAKES[newPosition];
        newPositions[currentPlayer] = snakeEnd;
        setPlayerPositions([...newPositions]);
        
        toast({
          title: "🐍 Snake!",
          description: `Slid down from ${newPosition} to ${snakeEnd}`,
          variant: "destructive",
        });
      } else if (LADDERS[newPosition]) {
        const ladderEnd = LADDERS[newPosition];
        newPositions[currentPlayer] = ladderEnd;
        setPlayerPositions([...newPositions]);
        
        toast({
          title: "🪜 Ladder!",
          description: `Climbed up from ${newPosition} to ${ladderEnd}`,
        });
      }

      // Switch player or allow extra turn on rolling 6
      setTimeout(() => {
        if (steps === 6) {
          toast({
            title: "🎲 Rolled a 6!",
            description: "You get another turn!",
          });
          setCanRoll(true);
        } else {
          switchPlayer();
        }
      }, 1000);
    }, 800);
  };

  const switchPlayer = () => {
    setCurrentPlayer((prev) => (prev === 0 ? 1 : 0));
    setCanRoll(true);
  };

  const resetGame = () => {
    setPlayerPositions([1, 1]);
    setCurrentPlayer(0);
    setDiceValue(0);
    setWinner(null);
    setCanRoll(true);
    setIsRolling(false);
  };

  return {
    playerPositions,
    currentPlayer,
    diceValue,
    isRolling,
    winner,
    wins,
    canRoll,
    rollDice,
    resetGame,
    snakes: SNAKES,
    ladders: LADDERS,
  };
};
