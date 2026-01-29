import { Clock, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Workout } from '@/types/workout';
import { Link } from 'react-router-dom';

interface WorkoutCardProps {
  workout: Workout;
  featured?: boolean;
}

const difficultyColors = {
  beginner: 'bg-green-500/20 text-green-400',
  intermediate: 'bg-yellow-500/20 text-yellow-400',
  advanced: 'bg-red-500/20 text-red-400',
};

const goalIcons = {
  strength: '💪',
  hypertrophy: '📈',
  endurance: '🔥',
};

export function WorkoutCard({ workout, featured = false }: WorkoutCardProps) {
  return (
    <Link to={`/workout/${workout.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden rounded-2xl gradient-card border border-border p-5 ${
          featured ? 'glow-primary' : ''
        }`}
      >
        {featured && (
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        )}
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-2xl">{goalIcons[workout.goal]}</span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${difficultyColors[workout.difficulty]}`}>
                {workout.difficulty}
              </span>
            </div>
            
            <h3 className="mb-1 text-xl font-bold text-foreground">{workout.title}</h3>
            
            <div className="mb-3 flex flex-wrap gap-1.5">
              {workout.muscleGroups.slice(0, 3).map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground capitalize"
                >
                  {muscle}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{workout.duration} min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="h-4 w-4" />
                <span>{workout.exercises.length} exercises</span>
              </div>
            </div>
          </div>
          
          <ChevronRight className="h-6 w-6 text-muted-foreground" />
        </div>
      </motion.div>
    </Link>
  );
}
