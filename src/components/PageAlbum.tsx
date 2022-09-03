import { styled } from '@stitches/react';
import { rem } from 'polished';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getAlbumImages, uploadAlbumImages } from '../apis/image';

const PageAlbum: React.FC = () => {
  const params = useParams();
  const [urls, setUrls] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>();

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    setImages(file);
  };

  const onUploadImage = () => {
    if (!images || !params.albumId) return;
    uploadAlbumImages({ albumId: params.albumId, images });
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
      <label htmlFor="input-image">이미지 선택</label>
      <input
        id="input-image"
        accept="image/*"
        multiple
        type="file"
        onChange={uploadImage}
      />
      <button onClick={onUploadImage}>이미지 업로드</button>
    </div>
  );
};

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
