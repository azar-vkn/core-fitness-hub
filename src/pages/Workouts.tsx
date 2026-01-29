import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { WorkoutCard } from '@/components/WorkoutCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { workouts } from '@/data/workouts';

const Workouts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorkouts = useMemo(() => {
    return workouts.filter((workout) => {
      const matchesCategory = !selectedCategory || workout.category === selectedCategory;
      const matchesSearch = workout.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workout.muscleGroups.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground">Workouts</h1>
          <p className="mt-1 text-muted-foreground">Science-based training programs</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative mb-5"
        >
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search workouts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-card py-3.5 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </motion.div>

        {/* Results Count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {filteredWorkouts.length} workout{filteredWorkouts.length !== 1 ? 's' : ''} found
        </p>

        {/* Workout List */}
        <div className="space-y-4">
          {filteredWorkouts.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <WorkoutCard workout={workout} />
            </motion.div>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-lg text-muted-foreground">No workouts found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Workouts;
