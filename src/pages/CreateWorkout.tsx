import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Save, GripVertical } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Exercise } from '@/types/workout';
import { toast } from 'sonner';

const CreateWorkout = () => {
  const [title, setTitle] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newExercise, setNewExercise] = useState({
    name: '',
    sets: 3,
    reps: 10,
    isTimeBased: false,
    time: 30,
    restSeconds: 60,
  });

  const addExercise = () => {
    if (!newExercise.name.trim()) {
      toast.error('Please enter an exercise name');
      return;
    }

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExercise.name,
      sets: newExercise.sets,
      ...(newExercise.isTimeBased ? { time: newExercise.time } : { reps: newExercise.reps }),
      restSeconds: newExercise.restSeconds,
      muscleGroup: 'custom',
    };

    setExercises([...exercises, exercise]);
    setNewExercise({ name: '', sets: 3, reps: 10, isTimeBased: false, time: 30, restSeconds: 60 });
    setShowAddModal(false);
    toast.success('Exercise added!');
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((e) => e.id !== id));
  };

  const saveWorkout = () => {
    if (!title.trim()) {
      toast.error('Please enter a workout title');
      return;
    }
    if (exercises.length === 0) {
      toast.error('Add at least one exercise');
      return;
    }
    toast.success('Workout saved! Connect to Cloud to persist your workouts.');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-foreground">Create Workout</h1>
          <p className="mt-1 text-muted-foreground">Build your custom training session</p>
        </motion.div>

        {/* Workout Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Workout Name
          </label>
          <input
            type="text"
            placeholder="e.g., Morning Power Session"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl bg-card py-4 px-4 text-lg font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </motion.div>

        {/* Exercise List */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Exercises</h3>
            <span className="text-sm text-muted-foreground">{exercises.length} added</span>
          </div>

          {exercises.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl border-2 border-dashed border-muted py-12 text-center"
            >
              <p className="text-muted-foreground">No exercises yet</p>
              <p className="mt-1 text-sm text-muted-foreground">Tap the button below to add</p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 rounded-xl bg-card p-4"
                >
                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : `${exercise.time}s`}
                    </p>
                  </div>
                  <button
                    onClick={() => removeExercise(exercise.id)}
                    className="p-2 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Add Exercise Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddModal(true)}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/50 py-4 font-semibold text-primary hover:border-primary hover:bg-primary/5"
        >
          <Plus className="h-5 w-5" />
          Add Exercise
        </motion.button>

        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={saveWorkout}
          disabled={!title.trim() || exercises.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-bold text-primary-foreground disabled:opacity-50 glow-primary"
        >
          <Save className="h-5 w-5" />
          Save Workout
        </motion.button>
      </div>

      {/* Add Exercise Modal */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-card p-6"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Add Exercise</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2">
                <X className="h-6 w-6 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Exercise Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Barbell Squats"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  className="w-full rounded-xl bg-muted py-3.5 px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">Sets</label>
                  <input
                    type="number"
                    min={1}
                    value={newExercise.sets}
                    onChange={(e) => setNewExercise({ ...newExercise, sets: parseInt(e.target.value) || 1 })}
                    className="w-full rounded-xl bg-muted py-3.5 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    {newExercise.isTimeBased ? 'Time (sec)' : 'Reps'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newExercise.isTimeBased ? newExercise.time : newExercise.reps}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setNewExercise({
                        ...newExercise,
                        ...(newExercise.isTimeBased ? { time: val } : { reps: val }),
                      });
                    }}
                    className="w-full rounded-xl bg-muted py-3.5 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNewExercise({ ...newExercise, isTimeBased: !newExercise.isTimeBased })}
                  className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                    !newExercise.isTimeBased ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Rep-based
                </button>
                <button
                  onClick={() => setNewExercise({ ...newExercise, isTimeBased: !newExercise.isTimeBased })}
                  className={`flex-1 rounded-xl py-3 text-sm font-medium transition-colors ${
                    newExercise.isTimeBased ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Time-based
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">
                  Rest Between Sets (seconds)
                </label>
                <input
                  type="number"
                  min={0}
                  value={newExercise.restSeconds}
                  onChange={(e) => setNewExercise({ ...newExercise, restSeconds: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-xl bg-muted py-3.5 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={addExercise}
                className="w-full rounded-xl bg-primary py-4 font-bold text-primary-foreground"
              >
                Add Exercise
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
};

export default CreateWorkout;
