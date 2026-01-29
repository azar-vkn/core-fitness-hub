import { motion } from 'framer-motion';
import { User, Trophy, Flame, Calendar, Settings, ChevronRight, LogOut } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';

const Profile = () => {
  const stats = {
    totalWorkouts: 47,
    currentStreak: 12,
    longestStreak: 23,
    thisMonth: 18,
    minutesTrained: 1420,
    caloriesBurned: 8500,
  };

  const achievements = [
    { icon: '🔥', title: '7-Day Warrior', description: 'Completed 7 days in a row', unlocked: true },
    { icon: '💪', title: 'Gym Rat', description: 'Complete 50 workouts', unlocked: false },
    { icon: '🏆', title: '30-Day Champion', description: '30 day streak', unlocked: false },
    { icon: '⚡', title: 'Early Bird', description: '10 workouts before 7 AM', unlocked: true },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 glow-primary">
            <User className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Fitness Hero</h1>
            <p className="text-muted-foreground">Member since Jan 2024</p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 grid grid-cols-2 gap-3"
        >
          <div className="rounded-2xl bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Workouts</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.totalWorkouts}</p>
          </div>
          <div className="rounded-2xl bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Current Streak</span>
            </div>
            <p className="text-3xl font-bold text-primary">{stats.currentStreak} days</p>
          </div>
          <div className="rounded-2xl bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">This Month</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.thisMonth}</p>
          </div>
          <div className="rounded-2xl bg-card p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm">⏱️</span>
              <span className="text-sm text-muted-foreground">Minutes</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.minutesTrained}</p>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-xl font-bold text-foreground">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={`rounded-xl p-4 ${
                  achievement.unlocked
                    ? 'bg-primary/10 border border-primary/30'
                    : 'bg-card opacity-60'
                }`}
              >
                <span className="mb-2 block text-3xl">{achievement.icon}</span>
                <p className={`font-semibold ${achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {achievement.title}
                </p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Settings Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <button className="flex w-full items-center justify-between rounded-xl bg-card p-4">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Settings</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="flex w-full items-center justify-between rounded-xl bg-card p-4">
            <div className="flex items-center gap-3">
              <LogOut className="h-5 w-5 text-destructive" />
              <span className="font-medium text-destructive">Sign Out</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
