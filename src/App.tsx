import { Navigate, Route, Routes } from 'react-router-dom';

import AlbumPage from './components/PageAlbum';
import AuthPage from './components/PageAuth';
import HomePage from './components/PageHome';
import PrivateRoute from './components/PrivateRoute';
import * as routes from './routes';
import globalStyle from './styles/globalStyle';

function App() {
  globalStyle();

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
      <Route
        path={routes.albumPath}
        element={
          <PrivateRoute
            element={<AlbumPage />}
            generatePath={routes.generateAlbumPath}
          />
        }
      />
      <Route path="*" element={<Navigate to={routes.authPath} replace />} />
    </Routes>
  );
}

export default App;
