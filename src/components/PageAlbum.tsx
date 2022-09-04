import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAlbumImages, uploadAlbumImages } from '../apis/image';
import { styled } from '../styles/stitches';
import ComponentCarousel from './ComponentCarousel';
import ComponentFAB from './ComponentFAB';
import ComponentPercentage from './ComponentPercentage';

const PageAlbum: React.FC = () => {
  const params = useParams();
  const [urls, setUrls] = useState<string[]>([]);
  const [percentage, setPercentage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const updatePercentage = (progress: number) => {
    setPercentage((prev) => Math.min(prev + progress, 100));
  };

  const addUrl = (url: string) => {
    setUrls((prev) => [...prev, url]);
  };

  const onUploadImage = async (images: FileList) => {
    if (!images || !params.albumId) return;
    await uploadAlbumImages({
      images,
      addUrl,
      updatePercentage,
      albumId: params.albumId,
    });
  };

  const clickButton = () => {
    setPercentage(0);
  };

  const selectImageIndex = (index: number | null) => setSelectedIndex(index);

  useEffect(() => {
    (async () => {
      if (!params.albumId) return;
      const urls = await getAlbumImages({ albumId: params.albumId });
      setUrls(urls);
    })();
  }, []);

  const useModalOpen = typeof selectedIndex === 'number';
  const carouselUrls =
    selectedIndex === null
      ? []
      : [...urls.slice(selectedIndex), ...urls.slice(0, selectedIndex)];

  return (
    <div>
      {
        <ComponentCarousel
          urls={carouselUrls}
          useModalOpen={useModalOpen}
          closeModal={() => selectImageIndex(null)}
        />
      }
      <ImageList>
        {urls.map((url, index) => (
          <ImageItem key={url} onClick={() => selectImageIndex(index)}>
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
  cursor: 'pointer',

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
