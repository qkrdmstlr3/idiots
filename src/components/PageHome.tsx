import { vars } from '@seed-design/design-token';
import { rem, rgba } from 'polished';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addNewAlbum, getAlbumList } from '../apis/album';
import { useModalDispatch } from '../contexts/ModalContext';
import { generateAlbumPath } from '../routes';
import { styled } from '../styles/stitches';
import { Button as AddAlbumButton } from '../styles/Template';
import { albumImageUrlList } from '../utils/constant';
import sortByKey from '../utils/sortByKey';
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
      sortByKey(albums, 'name');
      setAlbums(albums);
    })();
  }, []);

  const checkAlbumNameDuplicated = async (name: string) => {
    if (albums.some((album) => album.name === name))
      throw Error('중복된 이름이야');
    const album = await addNewAlbum({ name });
    const newAlbums = [...albums, { id: album.id, name }];
    sortByKey(newAlbums, 'name');
    setAlbums(newAlbums);
  };

  const onAddingAlbum = () => {
    dispatch({
      type: 'OPEN_MODAL',
      Component: ModalCreateAlbum,
      onConfirm: checkAlbumNameDuplicated,
    });
  };

  const navigateAlbumPage = (albumId: string) =>
    navigate(generateAlbumPath({ albumId }));

  const getAlbumImage = (index: number) => {
    return albumImageUrlList[index % 6];
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
      <AddAlbumButton theme="primary" position="fixed" onClick={onAddingAlbum}>
        앨범 추가
      </AddAlbumButton>
    </>
  );
};

const AlbumList = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '-1.3%',
  padding: rem(10),

  '@bp1': {
    marginLeft: '-1%',
  },

  '@bp3': {
    marginLeft: '-2%',
  },

  '@bp4': {
    marginLeft: '-2.2%',
  },
});

const AlbumTitle = styled('span', {
  width: '100%',
  position: 'absolute',
  bottom: 0,
  textAlign: 'center',
  borderRadius: rem(3),
  backgroundColor: rgba(0, 0, 0, 0.5),
  color: 'White',
  wordBreak: 'keep-all',
  transition: 'background-color .2s',
});

const AlbumItem = styled('li', {
  position: 'relative',
  flex: '1 0 32%',
  maxWidth: '32%',
  marginLeft: '1.3%',
  marginBottom: '1.3%',
  cursor: 'pointer',
  borderRadius: rem(3),
  transition: 'transform .35s',

  '&:hover': {
    [`& ${AlbumTitle}`]: {
      backgroundColor: vars.$scale.color.blue500,
      opacity: 0.8,
    },
  },

  '&:active': {
    transform: 'scale(0.95)',
  },

  '@bp1': {
    flex: '1 0 24%',
    maxWidth: '24%',
    marginLeft: '1%',
    marginBottom: '1%',
  },

  '@bp3': {
    flex: '1 0 18%',
    maxWidth: '18%',
    marginLeft: '2%',
    marginBottom: '2%',
  },

  '@bp4': {
    flex: '1 0 12%',
    maxWidth: '12%',
    marginLeft: '2.2%',
    marginBottom: '2.2%',
  },

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

export default PageHome;
