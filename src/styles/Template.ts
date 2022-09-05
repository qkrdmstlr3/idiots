import { vars } from '@seed-design/design-token';
import { rem } from 'polished';

import { styled } from './stitches';

export const Button = styled('button', {
  width: '90%',
  height: rem(40),
  fontWeight: 'bolder',
  fontSize: rem(16),
  transition: 'background-color 0.3s ease',

  variants: {
    theme: {
      primary: {
        backgroundColor: vars.$scale.color.blue500,
        color: 'White',
        '&:hover': {
          backgroundColor: vars.$scale.color.blue400,
        },
      },
      warning: {
        backgroundColor: vars.$scale.color.blue500,
        color: 'White',
        '&:hover': {
          backgroundColor: vars.$scale.color.blue400,
        },
      },
    },
    position: {
      fixed: {
        position: 'fixed',
        bottom: rem(20),
        left: '50%',
        transform: 'translateX(-50%)',
      },
      absolute: {
        position: 'absolute',
        bottom: rem(20),
        left: '50%',
        transform: 'translateX(-50%)',
      },
      relative: {
        position: 'relative',
      },
    },
  },
});
