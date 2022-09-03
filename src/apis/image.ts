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
}

interface GetAlbumImages {
  albumId: string;
}

// https://www.makeuseof.com/upload-files-to-firebase-using-reactjs/
// https://velog.io/@dev-hannahk/react-firebase-crud#-firestore-storage%EC%97%90-%ED%8C%8C%EC%9D%BC-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%B0%8F-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C
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
