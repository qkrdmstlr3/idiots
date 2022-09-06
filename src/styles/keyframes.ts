import { vars } from '@seed-design/design-token';
import { keyframes } from '@stitches/react';
import { rem } from 'polished';

export const fadeIn = (to: number) =>
  keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: to },
  });

export const fadeOut = (from: number) =>
  keyframes({
    '0%': { opacity: from },
    '100%': { opacity: 0 },
  });

export const fadeInWithSinkDown = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-40px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const rotate = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

export const jumpUp = keyframes({
  '0%': { top: rem(0), zIndex: -1 },
  '100%': { top: rem(-30), zIndex: -1 },
});

export const sinkDown = keyframes({
  '0%': { top: rem(-30), zIndex: -1 },
  '100%': { top: rem(0), zIndex: -1 },
});

export const scaleUp = keyframes({
  '0%': { transform: 'scale(0.2)' },
  '100%': { transform: 'scale(1)' },
});

export const scaleDown = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0.2)' },
});

export const errorAnim = keyframes({
  '0%': { color: 'White' },
  '30%': {
    backgroundColor: vars.$scale.color.red500,
    outline: vars.$scale.color.red500,
    border: `1px solid ${vars.$scale.color.red500}`,
  },
  '70%': {
    color: 'White',
    backgroundColor: vars.$scale.color.red500,
    outline: vars.$scale.color.red500,
    border: `1px solid ${vars.$scale.color.red500}`,
  },
  '100%': { color: 'White' },
});

export const glitterAnim = keyframes({
  '50%': {
    backgroundColor: vars.$scale.color.blue300,
  },
});
