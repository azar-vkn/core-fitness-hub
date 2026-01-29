export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps?: number;
  time?: number;
  restSeconds: number;
  tempo?: string;
  muscleGroup: string;
}

export interface Workout {
  id: string;
  title: string;
  category: 'bodyweight' | 'dumbbell' | 'barbell' | 'gym';
  goal: 'strength' | 'hypertrophy' | 'endurance';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  muscleGroups: string[];
  scientificPrinciple: string;
  exercises: Exercise[];
  isCustom: boolean;
  imageUrl?: string;
}

export interface WorkoutHistory {
  id: string;
  workoutId: string;
  workoutName: string;
  completedAt: Date;
  duration: number;
  caloriesEstimate: number;
}

export interface UserStats {
  currentStreak: number;
  longestStreak: number;
  totalWorkoutsCompleted: number;
  thisWeekWorkouts: number;
}

export interface Challenge {
  id: string;
  title: string;
  durationDays: number;
  description: string;
  difficulty: string;
  workoutsRequired: number;
  active: boolean;
}
