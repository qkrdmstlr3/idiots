import { ref, uploadBytesResumable } from 'firebase/storage';

import { fireStorage } from '../utils/firebase';

interface UploadAlbumImages {
  albumId: string;
  images: FileList;
}

// https://www.makeuseof.com/upload-files-to-firebase-using-reactjs/
export const uploadAlbumImages = async ({
  images,
  albumId,
}: UploadAlbumImages) => {
  await Promise.all(
    Array.from(images).map(async (i) => {
      const imgId = String(Date.now());
      const newImg = ref(fireStorage, `${albumId}/${imgId}`);
      uploadBytesResumable(newImg, i);
    }),
  );
};
