import { motion } from 'framer-motion';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import { UserStats } from '@/types/workout';

interface QuickStatsProps {
  stats: UserStats;
}

export function QuickStats({ stats }: QuickStatsProps) {
  const statItems = [
    {
      label: 'This Week',
      value: stats.thisWeekWorkouts,
      icon: Target,
      suffix: 'workouts',
    },
    {
      label: 'Total',
      value: stats.totalWorkoutsCompleted,
      icon: TrendingUp,
      suffix: 'completed',
    },
    {
      label: 'Best Streak',
      value: stats.longestStreak,
      icon: Trophy,
      suffix: 'days',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl bg-card p-4 text-center"
          >
            <Icon className="mx-auto mb-2 h-5 w-5 text-primary" />
            <p className="text-2xl font-bold text-foreground">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.suffix}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
