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
    <form onSubmit={onSubmit}>
      <input type="password" onChange={onChangePW} />
    </form>
  );
};

export default PageAuth;
