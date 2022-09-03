export const homePath = '/';
export const generateHomePath = () => '/';

export const authPath = '/auth';

export const albumPath = '/album/:albumId';
export const generateAlbumPath = ({ albumId }: { albumId: string }) =>
  `/album/${albumId}`;
