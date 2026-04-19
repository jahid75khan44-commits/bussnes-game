import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowLeft, Coins, Sparkles, Trophy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEVELS, type Choice } from "@/game/levels";
import { useGame } from "@/game/store";

type Props = { levelId: number; onExit: () => void; onComplete: () => void };

export const LevelPlay = ({ levelId, onExit, onComplete }: Props) => {
  const lvl = LEVELS.find((l) => l.id === levelId)!;
  const { state, setState } = useGame();
  const [picked, setPicked] = useState<Choice | null>(null);

  const choose = (c: Choice) => {
    setPicked(c);
    setState((s) => {
      const newBadges = c.badge && !s.badges.includes(c.badge) ? [...s.badges, c.badge] : s.badges;
      const completed = s.completed.includes(lvl.id) ? s.completed : [...s.completed, lvl.id];
      return {
        ...s,
        coins: Math.max(0, s.coins + c.coins),
        xp: Math.max(0, s.xp + c.xp),
        completed,
        level: Math.max(s.level, Math.min(25, lvl.id + 1)),
        badges: newBadges,
        monthlyEMI: s.monthlyEMI + (c.loanEMI ?? 0),
        passiveIncome: s.passiveIncome + (c.investment ?? 0),
        choices: { ...s.choices, [lvl.id]: c.id },
      };
    });
    if (c.correct) {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#FFD93D", "#A78BFA", "#34D399"] });
    }
  };

  return (
    <div className="container max-w-2xl py-4 sm:py-6">
      <button onClick={onExit} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3">
        <ArrowLeft className="w-4 h-4" /> Back to map
      </button>

      <motion.div
        layout
        className="bg-card-gradient rounded-3xl border border-border shadow-card overflow-hidden"
      >
        <div className="bg-hero px-5 py-6 text-primary-foreground">
          <div className="text-[10px] uppercase tracking-widest opacity-80">{lvl.chapter}</div>
          <div className="flex items-center gap-3 mt-1">
            <div className="text-4xl">{lvl.emoji}</div>
            <div>
              <div className="text-xs opacity-80">Level {lvl.id}</div>
              <h2 className="font-display text-2xl font-bold">{lvl.title}</h2>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <p className="text-foreground/90 leading-relaxed">{lvl.scenario}</p>
          <div className="text-sm font-semibold text-primary">{lvl.question}</div>

          <AnimatePresence mode="wait">
            {!picked ? (
              <motion.div key="choices" exit={{ opacity: 0 }} className="space-y-2.5">
                {lvl.choices.map((c, i) => (
                  <motion.button
                    key={c.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => choose(c)}
                    className="w-full text-left p-4 rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-between gap-3 group"
                  >
                    <span className="font-medium">{c.label}</span>
                    <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <Result choice={picked} onContinue={onComplete} />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {state.monthlyEMI > 0 && !picked && (
        <div className="mt-4 p-3 rounded-xl bg-danger/10 border border-danger/30 text-sm text-danger flex items-center gap-2">
          🐉 EMI Monster takes ₹{state.monthlyEMI.toLocaleString()}/level
        </div>
      )}
      {state.passiveIncome > 0 && !picked && (
        <div className="mt-2 p-3 rounded-xl bg-success/10 border border-success/30 text-sm text-success flex items-center gap-2">
          🌱 Passive income +₹{state.passiveIncome.toLocaleString()}/level
        </div>
      )}
    </div>
  );
};

const Result = ({ choice, onContinue }: { choice: Choice; onContinue: () => void }) => {
  const good = choice.correct;
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 rounded-2xl border-2 ${good ? "bg-success/10 border-success" : "bg-danger/10 border-danger"}`}
    >
      <div className="flex items-center gap-2 mb-2">
        {good ? <Trophy className="w-5 h-5 text-success" /> : <X className="w-5 h-5 text-danger" />}
        <div className={`font-display font-bold ${good ? "text-success" : "text-danger"}`}>
          {good ? "Smart Move!" : "Lesson Learned"}
        </div>
      </div>
      <p className="text-sm leading-relaxed mb-4">{choice.explanation}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Pill icon={<Coins className="w-3.5 h-3.5" />} value={choice.coins} cls="bg-gold/15 text-gold border-gold/30" />
        <Pill icon={<Sparkles className="w-3.5 h-3.5" />} value={choice.xp} cls="bg-xp/15 text-xp border-xp/30" />
        {choice.badge && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold border bg-primary/15 text-primary border-primary/30 flex items-center gap-1 animate-coin-pop">
            🏅 {choice.badge}
          </span>
        )}
      </div>

      <Button onClick={onContinue} className="w-full bg-hero text-primary-foreground hover:opacity-90 shadow-glow">
        Continue →
      </Button>
    </motion.div>
  );
};

const Pill = ({ icon, value, cls }: { icon: React.ReactNode; value: number; cls: string }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${cls}`}>
    {icon}{value >= 0 ? "+" : ""}{value.toLocaleString()}
  </span>
);
