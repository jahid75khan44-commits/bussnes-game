import { motion } from "framer-motion";
import { Lock, Check, Star } from "lucide-react";
import { LEVELS } from "@/game/levels";
import { useGame } from "@/game/store";

type Props = { onPick: (id: number) => void };

export const LevelMap = ({ onPick }: Props) => {
  const { state } = useGame();
  const current = state.completed.length + 1;

  return (
    <div className="container max-w-2xl py-6">
      <div className="text-center mb-6">
        <h1 className="font-display text-3xl sm:text-4xl font-bold bg-hero bg-clip-text text-transparent">
          Your Money Quest
        </h1>
        <p className="text-sm text-muted-foreground mt-1">25 levels from first paycheck to financial freedom</p>
      </div>

      <div className="relative">
        {/* path line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-primary/40 via-accent/40 to-gold/40 rounded-full" />

        <ul className="space-y-5">
          {LEVELS.map((lvl, i) => {
            const done = state.completed.includes(lvl.id);
            const unlocked = lvl.id <= current;
            const isCurrent = lvl.id === current;
            const side = i % 2 === 0 ? "left" : "right";

            return (
              <li key={lvl.id} className={`relative flex ${side === "left" ? "justify-start" : "justify-end"}`}>
                <motion.button
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.02 }}
                  whileHover={unlocked ? { scale: 1.03 } : {}}
                  whileTap={unlocked ? { scale: 0.97 } : {}}
                  disabled={!unlocked}
                  onClick={() => unlocked && onPick(lvl.id)}
                  className={`
                    w-[78%] text-left p-4 rounded-2xl border transition-all
                    ${done ? "bg-success-gradient border-success/40 text-success-foreground shadow-card" : ""}
                    ${isCurrent && !done ? "bg-card-gradient border-primary shadow-glow animate-pulse-glow" : ""}
                    ${!isCurrent && !done && unlocked ? "bg-card border-border shadow-card" : ""}
                    ${!unlocked ? "bg-muted/40 border-border/50 text-muted-foreground cursor-not-allowed" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0
                      ${done ? "bg-success-foreground/20" : isCurrent ? "bg-hero shadow-glow" : "bg-secondary"}
                    `}>
                      {!unlocked ? <Lock className="w-5 h-5" /> : done ? <Check className="w-5 h-5" /> : lvl.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] uppercase tracking-wider opacity-70 truncate">{lvl.chapter}</div>
                      <div className="font-display font-bold truncate">Lv {lvl.id} · {lvl.title}</div>
                      {isCurrent && !done && (
                        <div className="text-xs mt-0.5 opacity-80 flex items-center gap-1">
                          <Star className="w-3 h-3" /> Tap to play
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
