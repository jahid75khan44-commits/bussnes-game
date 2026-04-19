import { useEffect, useState, useCallback } from "react";

export type GameState = {
  coins: number;
  xp: number;
  level: number;            // current unlocked level (1..25)
  completed: number[];      // ids of completed levels
  badges: string[];
  monthlyEMI: number;       // total recurring EMI
  passiveIncome: number;    // total passive per "tick"
  streak: number;
  lastPlayed: string;       // ISO date
  choices: Record<number, string>; // levelId -> choiceId
};

const KEY = "coinquest:v1";

const initialState: GameState = {
  coins: 0,
  xp: 0,
  level: 1,
  completed: [],
  badges: [],
  monthlyEMI: 0,
  passiveIncome: 0,
  streak: 1,
  lastPlayed: new Date().toISOString().slice(0, 10),
  choices: {},
};

function load(): GameState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState;
    return { ...initialState, ...JSON.parse(raw) };
  } catch {
    return initialState;
  }
}

let memState: GameState = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(memState));
  } catch {}
  listeners.forEach((l) => l());
}

export function useGame() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((n) => n + 1);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);

  const setState = useCallback((updater: (s: GameState) => GameState) => {
    memState = updater(memState);
    persist();
  }, []);

  const reset = useCallback(() => {
    memState = { ...initialState, lastPlayed: new Date().toISOString().slice(0, 10) };
    persist();
  }, []);

  return { state: memState, setState, reset };
}

export function xpForLevel(level: number) {
  return 100 + (level - 1) * 25;
}
