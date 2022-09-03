import { addDoc, collection, getDocs } from 'firebase/firestore';

import { fireStore } from '../utils/firebase';

interface AddNewAlbum {
  name: string;
}

export const getAlbumList = async () => {
  const albumSnapshot = await getDocs(collection(fireStore, 'album'));
  return albumSnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
  }));
};

export const addNewAlbum = async ({ name }: AddNewAlbum) => {
  const newAlbum = await addDoc(collection(fireStore, 'album'), { name });

  return newAlbum;
};
