import { Coins, Sparkles, Award, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame, xpForLevel } from "@/game/store";

export const HUD = () => {
  const { state } = useGame();
  const need = xpForLevel(state.completed.length + 1);
  const pct = Math.min(100, (state.xp % need) / need * 100);

  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container max-w-2xl flex items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-hero shadow-glow flex items-center justify-center text-lg">🪙</div>
          <div>
            <div className="text-xs text-muted-foreground leading-none">CoinQuest</div>
            <div className="text-sm font-display font-bold leading-tight">Lv {state.completed.length + 1}/25</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Stat icon={<Coins className="w-3.5 h-3.5" />} value={state.coins} cls="bg-gold/15 text-gold border-gold/30" k={`c-${state.coins}`} />
          <Stat icon={<Sparkles className="w-3.5 h-3.5" />} value={state.xp} cls="bg-xp/15 text-xp border-xp/30" k={`x-${state.xp}`} />
          <Stat icon={<Award className="w-3.5 h-3.5" />} value={state.badges.length} cls="bg-primary/15 text-primary border-primary/30" k={`b-${state.badges.length}`} />
          <Stat icon={<Flame className="w-3.5 h-3.5" />} value={state.streak} cls="bg-danger/15 text-danger border-danger/30" k={`s-${state.streak}`} />
        </div>
      </div>
      <div className="container max-w-2xl pb-2">
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <motion.div
            className="h-full bg-hero"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ icon, value, cls, k }: { icon: React.ReactNode; value: number; cls: string; k: string }) => (
  <div className={`px-2.5 py-1.5 rounded-full border text-xs font-semibold flex items-center gap-1 ${cls}`}>
    {icon}
    <AnimatePresence mode="popLayout">
      <motion.span
        key={k}
        initial={{ y: -8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="tabular-nums"
      >
        {value.toLocaleString()}
      </motion.span>
    </AnimatePresence>
  </div>
);
