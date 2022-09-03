import { globalCss } from '@stitches/react';

export default globalCss({
  'html, body': {
    margin: 0,
    padding: 0,
    height: '100%',
  },
  '*': {
    boxSizing: 'border-box',
  },
  ul: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
});
