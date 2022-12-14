import { globalCss } from '@stitches/react';
import { rem } from 'polished';

export default globalCss({
  'html, body, #root': {
    margin: 0,
    padding: 0,
    height: '100%',
  },
  '*': {
    boxSizing: 'border-box',
    fontFamily:
      'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
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
  button: {
    border: 'none',
    borderRadius: rem(3),
    cursor: 'pointer',
  },
  input: {
    paddingLeft: rem(10),
  },
});
