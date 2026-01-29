import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { motivationalQuotes } from '@/data/workouts';
import { useMemo } from 'react';

export function MotivationalQuote() {
  const randomQuote = useMemo(() => {
    const index = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[index];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-5"
    >
      <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/20" />
      <p className="mb-2 text-base font-medium italic text-foreground leading-relaxed">
        "{randomQuote.quote}"
      </p>
      <p className="text-sm text-muted-foreground">— {randomQuote.author}</p>
    </motion.div>
  );
}
