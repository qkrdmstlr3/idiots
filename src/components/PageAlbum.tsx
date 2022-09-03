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
      {urls.map((url) => (
        <img src={url} />
      ))}
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

export default PageAlbum;
