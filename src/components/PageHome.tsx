import { useEffect, useState } from 'react';

import { getAlbumList } from '../apis/album';
import { useModalDispatch } from '../contexts/ModalContext';
import ModalCreateAlbum from './ModalCreateAlbum';

interface AlbumType {
  id: string;
  name: string;
}

const PageHome: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
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

  return (
    <>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>{album.name}</li>
        ))}
      </ul>
      <button onClick={onAddingAlbum}>앨범 추가</button>
    </>
  );
};

export default PageHome;
