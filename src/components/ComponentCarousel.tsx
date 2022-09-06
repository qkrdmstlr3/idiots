import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { rem } from 'polished';
import { Carousel } from 'react-responsive-carousel';

import { styled } from '../styles/stitches';
import Modal from './Modal';

interface ComponentCarouselProps {
  urls: string[];
  useModalOpen: boolean;
  initialIndex?: number;
  closeModal: () => void;
}

const ComponentCarousel: React.FC<ComponentCarouselProps> = (props) => {
  return (
    <Modal isOpen={props.useModalOpen} closeModal={props.closeModal}>
      <CarouselWrapper aria-label="carousel">
        <Carousel showIndicators={false} showStatus={false} showThumbs={false}>
          {props.urls.map((url) => (
            <Image key={url} src={url} />
          ))}
        </Carousel>
        <CloseButton onClick={props.closeModal}>닫기</CloseButton>
      </CarouselWrapper>
    </Modal>
  );
};

const CarouselWrapper = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'Black',

  overflow: 'hidden',

  '& li': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Image = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'scale-down',
});

const CloseButton = styled('button', {
  position: 'absolute',
  bottom: rem(20),
  width: rem(270),
  height: rem(36),
});

export default ComponentCarousel;
