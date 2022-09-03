import { Navigate, Route, Routes } from 'react-router-dom';

import AuthPage from './components/PageAuth';
import HomePage from './components/PageHome';
import PrivateRoute from './components/PrivateRoute';
import * as routes from './routes';
import { fireStore } from './utils/firebase';

function App() {
  return (
    <Routes>
      <Route path={routes.authPath} element={<AuthPage />} />
      <Route
        path={routes.homePath}
        element={
          <PrivateRoute
            element={<HomePage />}
            generatePath={routes.generateHomePath}
          />
        }
      />
      <Route path="*" element={<Navigate to={routes.authPath} replace />} />
    </Routes>
  );
}

export default App;
