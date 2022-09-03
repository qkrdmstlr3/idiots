import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAlbumList } from '../apis/album';
import { useModalDispatch } from '../contexts/ModalContext';
import { generateAlbumPath } from '../routes';
import ModalCreateAlbum from './ModalCreateAlbum';

interface AlbumType {
  id: string;
  name: string;
}

const PageHome: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const navigate = useNavigate();
  const dispatch = useModalDispatch();

  useEffect(() => {
    (async () => {
      const albums = await getAlbumList();
      setAlbums(albums);
    })();
  }, []);

  const onAddingAlbum = () => {
    dispatch({
      type: 'OPEN_MODAL',
      Component: ModalCreateAlbum,
    });
  };

  const navigateAlbumPage = (albumId: string) =>
    navigate(generateAlbumPath({ albumId }));

  return (
    <>
      <ul>
        {albums.map((album) => (
          <li key={album.id} onClick={() => navigateAlbumPage(album.id)}>
            {album.name}
          </li>
        ))}
      </ul>
      <button onClick={onAddingAlbum}>앨범 추가</button>
    </>
  );
};

export default PageHome;
