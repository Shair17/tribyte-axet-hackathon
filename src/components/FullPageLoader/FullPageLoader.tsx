import { motion, type Variants } from "motion/react";
import { Spinner } from "@/components/Spinner/Spinner";
import { Logo } from "@/components/Logo/Logo";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 1,
    },
  },
};

const descriptionVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 1,
    },
  },
};

type Props = {
  animated?: boolean;
  onAnimationEnd?: () => void;
};

export function FullPageLoader({ animated = true, onAnimationEnd }: Props) {
  return (
    <div className="isolate flex min-h-dvh flex-col items-center justify-center p-6 lg:p-8">
      <motion.div
        className="flex flex-col items-center"
        variants={animated ? containerVariants : undefined}
        initial={animated ? "hidden" : undefined}
        animate={animated ? "visible" : undefined}
        onAnimationComplete={() => {
          onAnimationEnd?.();
        }}
      >
        <motion.div variants={animated ? itemVariants : undefined}>
          <Logo className="w-40" />
        </motion.div>

        <motion.div variants={animated ? descriptionVariants : undefined}>
          <Spinner className="mt-4 size-6" />
        </motion.div>
      </motion.div>
    </div>
  );
}
