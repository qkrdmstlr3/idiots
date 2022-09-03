import { useEffect, useState } from 'react';

import { getAlbumList } from '../apis/album';

interface AlbumType {
  id: string;
  name: string;
}

const PageHome: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);

  useEffect(() => {
    (async () => {
      const albums = await getAlbumList();
      setAlbums(albums);
    })();
  }, []);

  const onAddingAlbum = () => {};

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
