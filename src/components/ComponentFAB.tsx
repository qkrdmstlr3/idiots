import { vars } from '@seed-design/design-token';
import { rem } from 'polished';
import { useState } from 'react';

import { glitterAnim } from '../styles/keyframes';
import { styled } from '../styles/stitches';
import Icon from './ComponentIcon';

interface ComponentFABProps {
  onUploadImage: (images: FileList) => void;
  onCancelButton?: () => void;
}

const ComponentFAB: React.FC<ComponentFABProps> = (props) => {
  const [useFAB, setUseFAB] = useState(false);
  const [images, setImages] = useState<FileList | null>();

  const getImagesFromLocal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (!file?.length) return;
    setImages(file);
    setUseFAB(true);
  };

  const onUploadImage = () => {
    if (!images) return;
    props.onUploadImage(images);
    setUseFAB(false);
  };

  return (
    <FABWrapper>
      {useFAB ? (
        <UploadImageButton onClick={onUploadImage}>
          <ImageNumber>{images?.length}</ImageNumber>업로드
        </UploadImageButton>
      ) : (
        <>
          <UploadImageLabel htmlFor="input-image">
            <IconWrapper>
              <Icon icon="upload" />
            </IconWrapper>
          </UploadImageLabel>
          <UploadImageInput
            multiple
            id="input-image"
            type="file"
            accept="image/*"
            onChange={getImagesFromLocal}
          />
        </>
      )}
    </FABWrapper>
  );
};

const FABWrapper = styled('div', {
  width: rem(60),
  height: rem(60),
  borderRadius: '50%',
  position: 'fixed',
  bottom: rem(20),
  left: '50%',
  transform: 'translateX(-50%)',
});

const UploadImageLabel = styled('label', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `3px solid ${vars.$scale.color.blue500}`,
  borderRadius: '50%',
  backgroundColor: 'White',
  color: 'White',
  cursor: 'pointer',
});

const IconWrapper = styled('div', {
  width: '50%',
  height: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const UploadImageInput = styled('input', {
  display: 'none',
});

const UploadImageButton = styled('button', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  border: `3px solid ${vars.$scale.color.blue500}`,
  backgroundColor: 'White',
  animation: `${glitterAnim} 1.5s infinite`,
});

const ImageNumber = styled('div', {
  position: 'absolute',
  width: rem(30),
  height: rem(30),
  top: rem(-10),
  left: rem(-10),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  color: 'White',
  backgroundColor: vars.$scale.color.red500,
});

export default ComponentFAB;
