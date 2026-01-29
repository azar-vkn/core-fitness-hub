import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward, X, Check, RotateCcw } from 'lucide-react';
import { workouts } from '@/data/workouts';
import { Exercise } from '@/types/workout';

type WorkoutState = 'preview' | 'exercise' | 'rest' | 'complete';

const WorkoutPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workout = workouts.find((w) => w.id === id);

  const [state, setState] = useState<WorkoutState>('preview');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const currentExercise: Exercise | undefined = workout?.exercises[currentExerciseIndex];
  const isTimeBased = currentExercise?.time !== undefined;

  const startWorkout = useCallback(() => {
    setState('exercise');
    setIsRunning(true);
    if (isTimeBased && currentExercise?.time) {
      setTimeLeft(currentExercise.time);
    }
  }, [isTimeBased, currentExercise]);

  const completeSet = useCallback(() => {
    if (!workout || !currentExercise) return;

    if (currentSet < currentExercise.sets) {
      setState('rest');
      setTimeLeft(currentExercise.restSeconds);
      setCurrentSet((prev) => prev + 1);
      setIsRunning(true);
    } else if (currentExerciseIndex < workout.exercises.length - 1) {
      setState('rest');
      setTimeLeft(currentExercise.restSeconds);
      setCurrentExerciseIndex((prev) => prev + 1);
      setCurrentSet(1);
      setIsRunning(true);
    } else {
      setState('complete');
      setIsRunning(false);
    }
  }, [workout, currentExercise, currentSet, currentExerciseIndex]);

  const skipRest = useCallback(() => {
    setState('exercise');
    if (isTimeBased && currentExercise?.time) {
      setTimeLeft(currentExercise.time);
    }
    setIsRunning(isTimeBased);
  }, [isTimeBased, currentExercise]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setTotalTime((prev) => prev + 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0 && state === 'exercise' && isTimeBased) {
      completeSet();
    } else if (isRunning && timeLeft === 0 && state === 'rest') {
      setState('exercise');
      if (isTimeBased && currentExercise?.time) {
        setTimeLeft(currentExercise.time);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, state, isTimeBased, currentExercise, completeSet]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!workout) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Workout not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Preview State */}
      <AnimatePresence mode="wait">
        {state === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <button onClick={() => navigate(-1)} className="p-2">
                <X className="h-6 w-6 text-foreground" />
              </button>
              <h2 className="text-lg font-semibold text-foreground">Workout Preview</h2>
              <div className="w-10" />
            </div>

            {/* Content */}
            <div className="flex-1 px-6 pb-8">
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold text-foreground">{workout.title}</h1>
                <p className="text-muted-foreground">{workout.duration} min • {workout.exercises.length} exercises</p>
              </div>

              <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Exercises</h3>
                <div className="space-y-3">
                  {workout.exercises.map((exercise, index) => (
                    <motion.div
                      key={exercise.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 rounded-xl bg-card p-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{exercise.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : `${exercise.time}s`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-primary/10 p-4">
                <h4 className="mb-1 text-sm font-semibold text-primary">Science Behind It</h4>
                <p className="text-sm text-muted-foreground">{workout.scientificPrinciple}</p>
              </div>
            </div>

            {/* Start Button */}
            <div className="p-6">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={startWorkout}
                className="w-full rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground glow-primary-strong"
              >
                Start Workout
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Exercise State */}
        {(state === 'exercise' || state === 'rest') && currentExercise && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4">
              <button onClick={() => navigate(-1)} className="p-2">
                <X className="h-6 w-6 text-foreground" />
              </button>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Exercise {currentExerciseIndex + 1} of {workout.exercises.length}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">{formatTime(totalTime)}</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col items-center justify-center px-6">
              {state === 'rest' ? (
                <motion.div
                  key="rest"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <p className="mb-4 text-lg text-muted-foreground">REST</p>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="number-display text-primary text-glow"
                  >
                    {timeLeft}
                  </motion.div>
                  <p className="mt-4 text-muted-foreground">seconds</p>
                  <p className="mt-8 text-foreground">
                    Next: <span className="font-semibold">{currentExercise.name}</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="exercise"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full text-center"
                >
                  <h2 className="mb-2 text-2xl font-bold text-foreground">{currentExercise.name}</h2>
                  <p className="mb-8 text-muted-foreground">
                    Set {currentSet} of {currentExercise.sets}
                  </p>

                  {isTimeBased ? (
                    <motion.div
                      animate={isRunning ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="relative mx-auto mb-8 flex h-56 w-56 items-center justify-center"
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-muted" />
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-primary"
                        style={{
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((1 - timeLeft / (currentExercise.time || 1)) * 2 * Math.PI)}% ${50 - 50 * Math.cos((1 - timeLeft / (currentExercise.time || 1)) * 2 * Math.PI)}%, 50% 50%)`,
                        }}
                        animate={{ boxShadow: ['0 0 20px hsl(110 100% 50% / 0.3)', '0 0 40px hsl(110 100% 50% / 0.6)', '0 0 20px hsl(110 100% 50% / 0.3)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="number-display text-primary">{timeLeft}</span>
                    </motion.div>
                  ) : (
                    <div className="mb-8">
                      <p className="number-display text-primary">{currentExercise.reps}</p>
                      <p className="mt-2 text-xl text-muted-foreground">reps</p>
                    </div>
                  )}

                  {currentExercise.tempo && (
                    <p className="text-sm text-muted-foreground">
                      Tempo: <span className="text-primary font-semibold">{currentExercise.tempo}</span>
                    </p>
                  )}
                </motion.div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6">
              <div className="flex items-center justify-center gap-6">
                {state === 'rest' ? (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={skipRest}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-primary glow-primary-strong"
                  >
                    <SkipForward className="h-8 w-8 text-primary-foreground" />
                  </motion.button>
                ) : (
                  <>
                    {isTimeBased && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsRunning(!isRunning)}
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-card"
                      >
                        {isRunning ? (
                          <Pause className="h-7 w-7 text-foreground" />
                        ) : (
                          <Play className="h-7 w-7 text-foreground" />
                        )}
                      </motion.button>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={completeSet}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-primary glow-primary-strong"
                    >
                      <Check className="h-10 w-10 text-primary-foreground" />
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Complete State */}
        {state === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-screen flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-primary glow-primary-strong"
            >
              <Check className="h-16 w-16 text-primary-foreground" />
            </motion.div>

            <h1 className="mb-2 text-4xl font-bold text-foreground">Workout Complete!</h1>
            <p className="mb-8 text-muted-foreground">Great job crushing {workout.title}</p>

            <div className="mb-8 grid w-full max-w-xs grid-cols-2 gap-4">
              <div className="rounded-xl bg-card p-4 text-center">
                <p className="text-3xl font-bold text-primary">{formatTime(totalTime)}</p>
                <p className="text-sm text-muted-foreground">Total Time</p>
              </div>
              <div className="rounded-xl bg-card p-4 text-center">
                <p className="text-3xl font-bold text-primary">{workout.exercises.length}</p>
                <p className="text-sm text-muted-foreground">Exercises</p>
              </div>
            </div>

            <div className="flex w-full max-w-xs flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="w-full rounded-xl bg-primary py-4 font-semibold text-primary-foreground"
              >
                Done
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setState('preview');
                  setCurrentExerciseIndex(0);
                  setCurrentSet(1);
                  setTotalTime(0);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-card py-4 font-semibold text-foreground"
              >
                <RotateCcw className="h-5 w-5" />
                Restart Workout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkoutPlayer;
