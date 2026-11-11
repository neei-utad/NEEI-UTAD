import { useCallback, useRef } from "./react.js";

const { motion, AnimatePresence, useMotionValue, useSpring, useTransform } = window.Motion;

export { motion, AnimatePresence };

const SPRING = { stiffness: 260, damping: 26, mass: 0.6 };

// sem isto o pointermove do scroll em ecrãs de toque inclinava os cartões
const HAS_HOVER = window.matchMedia("(hover: hover)").matches;

// grelha que distribui a entrada dos filhos
export const gridVariants = {
  hide: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
};

export const cardVariants = {
  hide: { opacity: 0, y: 18, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const listVariants = {
  hide: {},
  show: { transition: { staggerChildren: 0.07 } },
};

export const rowVariants = {
  hide: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/* inclinação 3D e posição do brilho a seguir o ponteiro.
   o glow vai por CSS vars porque animar box-shadow em JS custa muito mais. */
export function useTilt({ max = 7 } = {}) {
  const ref = useRef(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);

  const rotateY = useTransform(sx, [-1, 1], [-max, max]);
  const rotateX = useTransform(sy, [-1, 1], [max, -max]);

  const onPointerMove = useCallback(
    (event) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      node.style.setProperty("--mx", `${x}px`);
      node.style.setProperty("--my", `${y}px`);
      px.set((x / rect.width) * 2 - 1);
      py.set((y / rect.height) * 2 - 1);
    },
    [px, py]
  );

  const onPointerLeave = useCallback(() => {
    px.set(0);
    py.set(0);
  }, [px, py]);

  if (!HAS_HOVER) {
    return { ref, enabled: false, style: {}, handlers: {} };
  }

  return {
    ref,
    enabled: true,
    style: { rotateX, rotateY, transformPerspective: 900 },
    handlers: { onPointerMove, onPointerLeave },
  };
}
