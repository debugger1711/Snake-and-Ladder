import { Board } from "@/components/game/Board";
import { GameControls } from "@/components/game/GameControls";
import { WinnerModal } from "@/components/game/WinnerModal";
import { useGameLogic } from "@/hooks/useGameLogic";
import { Gamepad2 } from "lucide-react";

const Index = () => {
  const {
    playerPositions,
    currentPlayer,
    diceValue,
    isRolling,
    winner,
    wins,
    canRoll,
    rollDice,
    resetGame,
    snakes,
    ladders,
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="w-10 h-10 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Snakes & Ladders
            </h1>
            <Gamepad2 className="w-10 h-10 text-accent" />
          </div>
          <p className="text-muted-foreground text-lg">
            Roll the dice and race to square 100!
          </p>
        </header>

        {/* Game Layout */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          {/* Board */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <Board
                playerPositions={playerPositions}
                currentPlayer={currentPlayer}
                snakes={snakes}
                ladders={ladders}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="lg:sticky lg:top-8">
            <GameControls
              currentPlayer={currentPlayer}
              diceValue={diceValue}
              isRolling={isRolling}
              onRollDice={rollDice}
              onReset={resetGame}
              canRoll={canRoll}
              wins={wins}
            />
          </div>
        </div>

        {/* Game Rules */}
        <div className="mt-12 bg-card rounded-xl p-6 shadow-xl border-2 border-primary/20 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-foreground mb-4">📜 Game Rules</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• Players take turns rolling the dice</li>
            <li>• Rolling a 6 grants an extra turn</li>
            <li>• Landing on a ladder base climbs you up</li>
            <li>• Landing on a snake's head slides you down</li>
            <li>• First player to reach exactly square 100 wins</li>
            <li>• Cannot overshoot square 100</li>
          </ul>
        </div>
      </div>

      {/* Winner Modal */}
      <WinnerModal winner={winner} onPlayAgain={resetGame} />
    </div>
  );
};

export default Index;
