import Download, { DownloadProps } from '../assets/Download';
import Upload, { UploadProps } from '../assets/Upload';

type LookUp<U, T> = U extends { icon: T } ? U : never;
type AddIconName<T, K> = T & { icon: K };
type IconType =
  | AddIconName<UploadProps, 'upload'>
  | AddIconName<DownloadProps, 'download'>;

const mapping = {
  download: Download,
  upload: Upload,
} as const;

const Icon = <T extends keyof typeof mapping>({
  icon,
  ...props
}: LookUp<IconType, T>) => mapping[icon](props as any);

export default Icon;
