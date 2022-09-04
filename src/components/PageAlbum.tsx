import { styled } from '@stitches/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAlbumImages, uploadAlbumImages } from '../apis/image';
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
});

const ImageItem = styled('li', {
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

const Image = styled('img', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export default PageAlbum;
