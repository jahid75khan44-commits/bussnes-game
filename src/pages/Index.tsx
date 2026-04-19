import { useEffect, useState } from "react";
import { Moon, Sun, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/game/store";
import { HUD } from "@/components/HUD";
import { LevelMap } from "@/components/LevelMap";
import { LevelPlay } from "@/components/LevelPlay";
import { ScamPopup } from "@/components/ScamPopup";

const Index = () => {
  const { state, reset } = useGame();
  const [playing, setPlaying] = useState<number | null>(null);
  const [dark, setDark] = useState(true);
  const [showWelcome, setShowWelcome] = useState(state.completed.length === 0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen pb-24">
      <HUD />
      <ScamPopup />

      {showWelcome ? (
        <Welcome onStart={() => setShowWelcome(false)} />
      ) : playing ? (
        <LevelPlay
          levelId={playing}
          onExit={() => setPlaying(null)}
          onComplete={() => setPlaying(null)}
        />
      ) : (
        <LevelMap onPick={(id) => setPlaying(id)} />
      )}

      {/* Bottom toolbar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-card/90 backdrop-blur-xl border border-border rounded-full p-1.5 shadow-card">
        <Button size="sm" variant="ghost" className="rounded-full" onClick={() => setDark(!dark)}>
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
        <Button size="sm" variant="ghost" className="rounded-full" onClick={() => { if (confirm("Reset all progress?")) reset(); }}>
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="rounded-full text-gold" onClick={() => alert(`🏅 Badges (${state.badges.length}):\n\n${state.badges.join("\n") || "Play levels to earn badges!"}`)}>
          <Trophy className="w-4 h-4" />
          <span className="ml-1 text-xs font-bold">{state.badges.length}</span>
        </Button>
      </div>
    </div>
  );
};

const Welcome = ({ onStart }: { onStart: () => void }) => (
  <div className="container max-w-2xl py-12 text-center">
    <div className="text-7xl mb-4 animate-coin-pop">🪙</div>
    <h1 className="font-display text-4xl sm:text-5xl font-bold bg-hero bg-clip-text text-transparent mb-3">
      Welcome to CoinQuest
    </h1>
    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
      25 levels. Real money decisions. Earn coins, dodge scams, slay the EMI monster, and reach financial freedom.
    </p>
    <div className="grid grid-cols-3 gap-3 mb-8 max-w-md mx-auto">
      {[
        { e: "🪙", t: "Earn coins" },
        { e: "🏅", t: "Win badges" },
        { e: "👑", t: "Beat the boss" },
      ].map((x) => (
        <div key={x.t} className="p-4 rounded-2xl bg-card border border-border shadow-card">
          <div className="text-3xl mb-1">{x.e}</div>
          <div className="text-xs font-semibold">{x.t}</div>
        </div>
      ))}
    </div>
    <Button size="lg" onClick={onStart} className="bg-hero text-primary-foreground hover:opacity-90 shadow-glow rounded-full px-8 h-12 text-base font-display font-bold">
      Begin Quest →
    </Button>
  </div>
);

export default Index;
