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
      <div>
        {props.useSelectMode ? (
          <>
            <button onClick={props.onDownload}>
              {props.selectedUrls.length}장 다운
            </button>
            <button onClick={props.toggleSelectMode}>취소</button>
          </>
        ) : (
          <button onClick={props.toggleSelectMode}>선택</button>
        )}
      </div>
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
  fontSize: rem(20),

  variants: {
    useTopMode: {
      true: {
        backgroundColor: 'White',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
});

export default ComponentAlbumHeader;
