import 'react-circular-progressbar/dist/styles.css';

import { styled } from '@stitches/react';
import { rem } from 'polished';
import { CircularProgressbar } from 'react-circular-progressbar';

interface ComponentPercentageProps {
  percentage: number;
  arriveFullPercentage: () => void;
}

const ComponentPercentage: React.FC<ComponentPercentageProps> = (props) => {
  if (props.percentage >= 100) {
    setTimeout(() => {
      props.arriveFullPercentage();
    }, 1000);
  }

  return (
    <Wrapper>
      <CircularProgressbar
        background
        value={props.percentage}
        text={`${props.percentage}%`}
        styles={{ background: { fill: 'white' } }}
      />
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  position: 'fixed',
  width: rem(60),
  height: rem(60),
  bottom: rem(20),
  left: '50%',
  transform: 'translateX(-50%)',
});

export default ComponentPercentage;
