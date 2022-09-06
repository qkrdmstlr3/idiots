import { vars } from '@seed-design/design-token';
import { rem } from 'polished';
import { Link } from 'react-router-dom';

import useScrollPosition from '../hooks/useScrollPosition';
import { homePath } from '../routes';
import { styled } from '../styles/stitches';

interface ComponentAlbumHeaderProps {
  selectedUrls: string[];
  useSelectMode: boolean;
  toggleSelectMode: () => void;
  onDownload: () => void;
}

const ComponentAlbumHeader: React.FC<ComponentAlbumHeaderProps> = (props) => {
  const { isScrollTop } = useScrollPosition({ standard: 50 });

  return (
    <Header useTopMode={isScrollTop}>
      <Link to={homePath}>{'⏎'}</Link>
      <ButtonWrapper>
        {props.useSelectMode ? (
          <>
            <SelectButton onClick={props.onDownload}>
              {props.selectedUrls.length}장 다운
            </SelectButton>
            <SelectButton onClick={props.toggleSelectMode}>취소</SelectButton>
          </>
        ) : (
          <SelectButton onClick={props.toggleSelectMode}>선택</SelectButton>
        )}
      </ButtonWrapper>
    </Header>
  );
};

const Header = styled('header', {
  position: 'sticky',
  height: rem(50),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  top: rem(0),
  zIndex: 10,
  transition: 'all 0.3s ease-in-out',
  padding: `0 ${rem(10)}`,
  fontSize: rem(25),

  variants: {
    useTopMode: {
      true: {
        backgroundColor: 'White',
      },
      false: {
        color: 'White',
        background: `linear-gradient(rgba(0,0,0,.5) 10%, rgba(0,0,0,0))`,
      },
    },
  },
});

const SelectButton = styled('button', {
  padding: `${rem(3)} ${rem(10)}`,
  color: 'White',
  backgroundColor: vars.$scale.color.gray500,

  '&:hover': {
    backgroundColor: vars.$scale.color.gray400,
  },
});

const ButtonWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),
});

export default ComponentAlbumHeader;
