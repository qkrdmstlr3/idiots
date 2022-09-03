import { useState } from 'react';

import { addNewAlbum } from '../apis/album';
import { ModalInterface } from '../contexts/ModalContext';

const ModalCreateAlbum: React.FC<ModalInterface> = (props) => {
  const [albumName, setAlbumName] = useState('');

  const onChangeAlbumName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlbumName(event.target.value);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addNewAlbum({ name: albumName });
    props.closeModal();
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={albumName} onChange={onChangeAlbumName} />
      <button>생성하기</button>
    </form>
  );
};

export default ModalCreateAlbum;
