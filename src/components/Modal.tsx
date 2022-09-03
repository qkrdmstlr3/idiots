import ReactDOM from 'react-dom';

import useKeyboard from '../hooks/useKeyboard';
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
        {() => (
          <div>
            <div onClick={closeModal} />
            <section>{children}</section>
          </div>
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

export default Modal;
