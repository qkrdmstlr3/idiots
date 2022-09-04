import { styled } from '@stitches/react';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { homePath } from '../routes';
import localStorage from '../utils/localStorage';

interface UseLocation {
  state?: { path?: string };
}

const useCheckingPW = () => {
  const { state: location } = useLocation() as UseLocation;
  const navigate = useNavigate();

  const checkPassword = (pw: string) => {
    if (pw === 'password') {
      localStorage.setPassword(pw);
      navigate(location?.path || homePath);
    }
  };

  useEffect(() => {
    checkPassword(localStorage.getPassword() || '');
  }, []);

  return { checkPassword };
};

const PageAuth: React.FC = () => {
  const [pw, setPW] = useState('');
  const { checkPassword } = useCheckingPW();

  const onChangePW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPW(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    checkPassword(pw);
  };

  return (
    <Wrapper>
      <Logo src="/images/logo.png" />
      <form onSubmit={onSubmit}>
        <Input type="password" onChange={onChangePW} />
      </form>
      <SubmitButton>입장하기</SubmitButton>
    </Wrapper>
  );
};

const Wrapper = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  gap: rem(5),
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const Logo = styled('img', {
  width: rem(270),
});

const Input = styled('input', {
  width: rem(270),
  height: rem(36),
});

const SubmitButton = styled('button', {
  width: rem(270),
  height: rem(36),
});

export default PageAuth;
