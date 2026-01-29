import { motion } from 'framer-motion';
import { categories } from '@/data/workouts';

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
          selected === null
            ? 'bg-primary text-primary-foreground glow-primary'
            : 'bg-card text-foreground hover:bg-muted'
        }`}
      >
        All
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
            selected === category.id
              ? 'bg-primary text-primary-foreground glow-primary'
              : 'bg-card text-foreground hover:bg-muted'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
