import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useGame } from "@/game/store";

/**
 * Random scam popup — appears unpredictably after level 10.
 * Player has 1.5s to dismiss or loses coins.
 */
export const ScamPopup = () => {
  const { state, setState } = useGame();
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1.5);

  useEffect(() => {
    if (state.completed.length < 10) return;
    const t = setTimeout(() => {
      if (Math.random() < 0.4) setOpen(true);
    }, 8000 + Math.random() * 12000);
    return () => clearTimeout(t);
  }, [state.completed.length, open]);

  useEffect(() => {
    if (!open) return;
    setTimeLeft(1.5);
    const start = Date.now();
    const i = setInterval(() => {
      const left = 1.5 - (Date.now() - start) / 1000;
      setTimeLeft(Math.max(0, left));
      if (left <= 0) {
        clearInterval(i);
        setOpen(false);
        setState((s) => ({ ...s, coins: Math.max(0, s.coins - 300) }));
      }
    }, 50);
    return () => clearInterval(i);
  }, [open, setState]);

  const dismiss = () => {
    setOpen(false);
    setState((s) => ({ ...s, xp: s.xp + 30 }));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.6, rotate: -3 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="bg-danger-gradient text-danger-foreground rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-shake"
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-6 h-6" />
              <div className="font-display font-bold text-xl">⚠️ SCAM ALERT!</div>
            </div>
            <p className="text-sm opacity-95 mb-4">
              "Congratulations! You've won ₹50 LAKHS! Click YES to claim before it expires!"
            </p>
            <div className="text-xs opacity-80 mb-3">Tap DISMISS in {timeLeft.toFixed(1)}s or lose 300 coins</div>
            <div className="flex gap-2">
              <button
                onClick={dismiss}
                className="flex-1 bg-danger-foreground text-danger font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform"
              >
                DISMISS
              </button>
              <button
                onClick={() => { setOpen(false); setState((s) => ({ ...s, coins: Math.max(0, s.coins - 800) })); }}
                className="flex-1 bg-danger-foreground/10 border border-danger-foreground/30 font-bold py-3 rounded-xl"
              >
                Claim
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
