import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { StreakCounter } from '@/components/StreakCounter';
import { WorkoutCard } from '@/components/WorkoutCard';
import { QuickStats } from '@/components/QuickStats';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import { workouts } from '@/data/workouts';

const Index = () => {
  const todayWorkout = workouts[0];
  const userStats = {
    currentStreak: 12,
    longestStreak: 23,
    totalWorkoutsCompleted: 47,
    thisWeekWorkouts: 4,
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-md px-4 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-muted-foreground">Welcome back</p>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            BUL<span className="text-primary text-glow">CORE</span>
          </h1>
        </motion.div>

        {/* Streak Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <StreakCounter streak={userStats.currentStreak} />
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <QuickStats stats={userStats} />
        </motion.div>

        {/* Today's Workout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Today's Workout</h2>
            <Link to="/workouts" className="text-sm font-medium text-primary">
              View All
            </Link>
          </div>
          <WorkoutCard workout={todayWorkout} featured />
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Link to={`/workout/${todayWorkout.id}`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary py-5 text-lg font-bold text-primary-foreground animate-glow-pulse"
            >
              <Play className="h-6 w-6" fill="currentColor" />
              Start Workout
            </motion.button>
          </Link>
        </motion.div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MotivationalQuote />
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
