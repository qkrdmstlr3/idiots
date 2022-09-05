import { vars } from '@seed-design/design-token';
import { rem } from 'polished';
import { useState } from 'react';

import { ModalInterface } from '../contexts/ModalContext';
import { errorAnim } from '../styles/keyframes';
import { keyframes, styled } from '../styles/stitches';
import { Button as CreateAlbumButton } from '../styles/Template';

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
      <Title>앨범 만들기</Title>
      <Input
        autoFocus
        placeholder="앨범 이름을 입력해줘"
        value={albumName}
        onChange={onChangeAlbumName}
        useErrorMode={!!errorMsg}
      />
      <CreateAlbumButton theme="primary" position="relative">
        만들기
      </CreateAlbumButton>
      <Error>{errorMsg} </Error>
    </Form>
  );
};

const Form = styled('form', {
  width: rem(300),
  position: 'relative',
  padding: `${rem(15)} 0`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: rem(10),
  borderRadius: rem(3),

  backgroundColor: 'White',
});

const Title = styled('h2', {
  margin: 0,
  fontSize: rem(20),
});

const Input = styled('input', {
  width: '90%',
  height: rem(36),
  outlineColor: vars.$scale.color.blue500,
  transition: 'all 500ms',
  borderRadius: rem(3),

  variants: {
    useErrorMode: {
      true: {
        animation: `${errorAnim} 1s linear`,
      },
    },
  },
});

const Error = styled('span', {
  height: rem(20),
  color: vars.$scale.color.red500,
  fontSize: rem(15),
});

export default ModalCreateAlbum;
