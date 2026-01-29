import { Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-3 rounded-2xl bg-card p-4 glow-primary"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary/30 blur-md"
        />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary">
          <Flame className="h-7 w-7 text-primary-foreground" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
        <div className="flex items-baseline gap-1">
          <span className="stat-number text-primary">{streak}</span>
          <span className="text-lg text-muted-foreground">days</span>
        </div>
      </div>
    </motion.div>
  );
}
