import { ReactElement, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { authPath } from '../routes';
import localStorage from '../utils/localStorage';

interface PrivateRoutProps {
  element: ReactElement;
  generatePath: (params?: any) => string;
}

// TODO: useEffect없앨 수 있을 듯
const PrivateRoute: React.FC<PrivateRoutProps> = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const navigateAuthPage = useCallback(
    () =>
      navigate(authPath, {
        replace: true,
        state: { path: props.generatePath(params) },
      }),
    [navigate, params, props],
  );

  const authenticateUser = useCallback(async () => {
    const token = localStorage.getPassword();
    if (token !== 'password') navigateAuthPage();
  }, [navigateAuthPage]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return props.element;
};

export default PrivateRoute;
