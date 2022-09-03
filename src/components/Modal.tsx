import { styled } from '@stitches/react';
import { rem } from 'polished';
import ReactDOM from 'react-dom';

import useKeyboard from '../hooks/useKeyboard';
import * as animations from '../styles/keyframes';
import Transition from '../utils/Transition';

const ANIMATION_DURATION = 150;

interface ModalInterface {
  children?: React.ReactNode;
  isOpen?: boolean;
  disableEscape?: boolean;
  closeModal: () => void;
}

interface ModalConfirmButtonProps {
  onConfirm: () => void;
  variant?: 'warn' | 'normal';
  text?: string;
}

interface ModalCancelButtonProps {
  onCancel: (() => void) | undefined;
  text?: string;
}

interface ModalCloseButtonProps {
  onClose: () => void;
}

const ModalPortal = ({ children }: Pick<ModalInterface, 'children'>) => {
  const modal = document.querySelector('#modal');
  if (!modal) throw new Error('#modal id div를 찾을 수 없어요');
  return ReactDOM.createPortal(children, modal);
};

const ModalConfirmButton = ({
  onConfirm,
  variant = 'normal',
  text = '수락하기',
}: ModalConfirmButtonProps) => {
  return <button onClick={onConfirm}>{text}</button>;
};

const ModalCancelButton = ({
  onCancel = () => {},
  text = '취소하기',
}: ModalCancelButtonProps) => {
  return <button onClick={onCancel}>{text}</button>;
};

const ModalCloseButton = ({ onClose }: ModalCloseButtonProps) => {
  return <div onClick={onClose}>x</div>;
};

const ModalWrapper = ({
  isOpen,
  children,
  disableEscape,
  closeModal,
}: ModalInterface) => {
  useKeyboard({
    keyEvents: [
      {
        key: 'Escape',
        keyEvent: () => {
          if (!disableEscape) closeModal();
        },
      },
    ],
  });

  return (
    <ModalPortal>
      <Transition isOn={isOpen} timeout={ANIMATION_DURATION}>
        {(status) => (
          <ModalContainerStyle useModal={status !== 'off'}>
            <Overlay onClick={closeModal} useModal={isOpen} />
            <ModalContent useModal={isOpen}>{children}</ModalContent>
          </ModalContainerStyle>
        )}
      </Transition>
    </ModalPortal>
  );
};

const ModalContainer = ({ children, ...props }: ModalInterface) => {
  return <ModalWrapper {...props}>{children}</ModalWrapper>;
};

const Modal = Object.assign(ModalContainer, {
  CloseButton: ModalCloseButton,
  CancelButton: ModalCancelButton,
  ConfirmButton: ModalConfirmButton,
});

/**
 * style
 */
const ModalContainerStyle = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',

  variants: {
    useModal: {
      true: { display: 'flex' },
      false: { display: 'none' },
    },
  },
});

const Overlay = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0.3,
  backgroundColor: 'Black',

  variants: {
    useModal: {
      true: {
        animation: `${animations.fadeIn(0.3)} ${ANIMATION_DURATION}ms`,
      },
      false: {
        animation: `${animations.fadeOut(0.3)} ${ANIMATION_DURATION}ms`,
      },
    },
  },
});

const ModalContent = styled('div', {
  padding: rem(15),
  backgroundColor: 'White',
  zIndex: 100,

  variants: {
    useModal: {
      true: {
        animation: `${animations.fadeIn(1)} ${ANIMATION_DURATION}ms, ${
          animations.scaleUp
        } ${ANIMATION_DURATION}ms`,
      },
      false: {
        animation: `${animations.fadeOut(1)} ${ANIMATION_DURATION}ms, ${
          animations.scaleDown
        } ${ANIMATION_DURATION}ms`,
      },
    },
  },
});

export default Modal;
