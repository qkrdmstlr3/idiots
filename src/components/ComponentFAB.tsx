import { styled } from '@stitches/react';
import { rem } from 'polished';
import { useState } from 'react';

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
        <UploadImageButton onClick={onUploadImage}>업로드</UploadImageButton>
      ) : (
        <>
          <UploadImageLabel htmlFor="input-image">사진</UploadImageLabel>
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
  borderRadius: '50%',
  backgroundColor: 'Gray',
});

const UploadImageInput = styled('input', {
  display: 'none',
});

const UploadImageButton = styled('button', {
  position: 'absolute',
  width: '100%',
  height: '100%',
  borderRadius: '50%',
});

export default ComponentFAB;
