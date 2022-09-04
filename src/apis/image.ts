import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { fireStorage } from '../utils/firebase';

interface UploadAlbumImages {
  albumId: string;
  images: FileList;
  addUrl: (url: string) => void;
  updatePercentage: (progress: number) => void;
}

interface GetAlbumImages {
  albumId: string;
}

export const uploadAlbumImages = async ({
  images,
  albumId,
  addUrl,
  updatePercentage,
}: UploadAlbumImages) => {
  await Promise.all(
    Array.from(images).map(async (i, index) => {
      const imgId = String(Date.now()) + i.name;
      const newImg = ref(fireStorage, `${albumId}/${imgId}`);
      uploadBytesResumable(newImg, i);

      const storageRef = ref(fireStorage, `${albumId}/${imgId}`);
      const uploadTask = uploadBytesResumable(storageRef, i);

      uploadTask.on(
        'state_changed',
        () => {},
        () => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(addUrl);
          updatePercentage(100 / images.length);
        },
      );
    }),
  );
};

export const getAlbumImages = async ({ albumId }: GetAlbumImages) => {
  try {
    const li = (await listAll(ref(fireStorage, albumId))).items;
    const urls = await Promise.all(
      li.map(async (i) => {
        const url = await getDownloadURL(ref(fireStorage, i.fullPath));
        return url;
      }),
    );
    return urls;
  } catch (error) {
    return [];
  }
};
