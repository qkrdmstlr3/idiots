import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAlbumImages, uploadAlbumImages } from '../apis/image';
import { styled } from '../styles/stitches';
import ComponentFAB from './ComponentFAB';
import ComponentPercentage from './ComponentPercentage';

const PageAlbum: React.FC = () => {
  const params = useParams();
  const [urls, setUrls] = useState<string[]>([]);
  const [percentage, setPercentage] = useState(0);

  const updatePercentage = (progress: number) => {
    setPercentage((prev) => Math.min(prev + progress, 100));
  };

  const addUrl = (url: string) => {
    setUrls((prev) => [...prev, url]);
  };

  const onUploadImage = async (images: FileList) => {
    if (!images || !params.albumId) return;
    setPercentage(1);
    await uploadAlbumImages({
      images,
      addUrl,
      updatePercentage,
      albumId: params.albumId,
    });
    setPercentage(100);
  };

  const clickButton = () => {
    setPercentage(0);
  };

  useEffect(() => {
    (async () => {
      if (!params.albumId) return;
      const urls = await getAlbumImages({ albumId: params.albumId });
      setUrls(urls);
    })();
  }, []);

  return (
    <div>
      <ImageList>
        {urls.map((url) => (
          <ImageItem key={url}>
            <Image src={url} />
          </ImageItem>
        ))}
      </ImageList>
      {percentage ? (
        <ComponentPercentage
          percentage={percentage}
          arriveFullPercentage={clickButton}
        />
      ) : (
        <ComponentFAB onUploadImage={onUploadImage} />
      )}
    </div>
  );
};

/**
 * style
 */
const ImageList = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '-1.3%',

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

const ImageItem = styled('li', {
  position: 'relative',
  flex: '1 0 32%',
  maxWidth: '32%',
  marginLeft: '1.3%',
  marginBottom: '1.3%',

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

const Image = styled('img', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default PageAlbum;
