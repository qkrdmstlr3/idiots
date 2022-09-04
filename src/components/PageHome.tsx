import { styled } from '@stitches/react';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAlbumList } from '../apis/album';
import { useModalDispatch } from '../contexts/ModalContext';
import { generateAlbumPath } from '../routes';
import { albumImageUrlList } from '../utils/constant';
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
      // TODO: sort
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

  const getAlbumImage = (index: number) => {
    return albumImageUrlList[index % 5];
  };

  return (
    <>
      <AlbumList>
        {albums.map((album, index) => (
          <AlbumItem key={album.id} onClick={() => navigateAlbumPage(album.id)}>
            <AlbumImage src={getAlbumImage(index)} />
            <AlbumTitle>{album.name}</AlbumTitle>
          </AlbumItem>
        ))}
      </AlbumList>
      <AddAlbumButton onClick={onAddingAlbum}>앨범 추가</AddAlbumButton>
    </>
  );
};

const AlbumList = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '-1.3%',
});

const AlbumItem = styled('li', {
  position: 'relative',
  flex: '1 0 32%',
  maxWidth: '32%',
  marginLeft: '1.3%',
  marginBottom: '1.3%',

  '&:after': {
    display: 'block',
    content: '',
    paddingBottom: '100%',
  },
});

const AlbumImage = styled('img', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'scale-down',
});

const AlbumTitle = styled('span', {
  position: 'absolute',
  bottom: 0,
});

const AddAlbumButton = styled('button', {
  position: 'fixed',
  bottom: rem(20),
  left: '50%',
  transform: 'translateX(-50%)',
  width: rem(270),
  height: rem(40),
});

export default PageHome;
