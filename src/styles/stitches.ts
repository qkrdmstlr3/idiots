import { createStitches } from '@stitches/react';

export const { styled, css } = createStitches({
  media: {
    bp1: '(min-width: 480px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
    bp4: '(min-width: 1500px)',
  },
});
