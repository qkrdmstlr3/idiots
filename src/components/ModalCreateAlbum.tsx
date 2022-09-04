import { styled } from '@stitches/react';
import { rem } from 'polished';
import { useState } from 'react';

import { ModalInterface } from '../contexts/ModalContext';

const ModalCreateAlbum: React.FC<ModalInterface> = (props) => {
  const [albumName, setAlbumName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onChangeAlbumName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumName(event.target.value);
  };

  const checkAlbumName = () => {
    if (!albumName.length) throw Error('입력해주세요');
  };

  const onSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();

      if (!props.onConfirm) return;
      checkAlbumName();
      await props.onConfirm(albumName);
      props.closeModal();
    } catch (error) {
      setErrorMsg((error as Error).message);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input value={albumName} onChange={onChangeAlbumName} />
      <Button>생성하기</Button>
      <span>{errorMsg}</span>
    </Form>
  );
};

const Form = styled('form', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: rem(10),
});

const Input = styled('input', {
  width: rem(270),
  height: rem(36),
});

const Button = styled('button', {
  width: rem(270),
  height: rem(36),
});

export default ModalCreateAlbum;
