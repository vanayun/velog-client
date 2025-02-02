import * as React from 'react';
import styled, { css } from 'styled-components';
import { breakpoints } from '../../lib/styles/responsive';
import RoundButton from '../common/RoundButton';
import { CurrentUser } from '../../lib/graphql/user';
import HeaderUserIcon from './HeaderUserIcon';
import useToggle from '../../lib/hooks/useToggle';
import HeaderUserMenu from './HeaderUserMenu';
import { logout } from '../../lib/api/auth';
import storage from '../../lib/storage';
import { UserLogo } from '../../modules/header';
import HeaderLogo from './HeaderLogo';

const HeaderBlock = styled.div<{
  floating: boolean;
}>`
  width: 100%;
  > .wrapper {
    width: ${breakpoints.xlarge};
    height: 5rem;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logged-in {
      position: relative;
      display: flex;
      align-items: center;
    }
  }

  ${props =>
    props.floating &&
    css`
      z-index: 10;
      position: fixed;
      top: 0;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.08);
    `}
`;

const Placeholder = styled.div`
  width: 100%;
  height: 5rem;
`;

interface HeaderProps {
  floating: boolean;
  floatingMargin: number;
  onLoginClick: () => void;
  user: CurrentUser | null;
  custom: boolean;
  userLogo: UserLogo | null;
  velogUsername: string | null;
}

const { useCallback } = React;

const Header: React.FC<HeaderProps> = ({
  floating,
  floatingMargin,
  onLoginClick,
  user,
  custom,
  userLogo,
  velogUsername,
}) => {
  const [userMenu, toggleUserMenu] = useToggle(false);

  const onLogout = useCallback(async () => {
    try {
      await logout();
    } catch {}
    storage.removeItem('CURRENT_USER');
    window.location.href = '/';
  }, []);
  return (
    <>
      <HeaderBlock
        floating={floating}
        style={{ marginTop: floating ? floatingMargin : 0 }}
        data-testid="Header"
      >
        <div className="wrapper">
          <div className="brand">
            <HeaderLogo
              custom={custom}
              userLogo={userLogo}
              velogUsername={velogUsername}
            />
          </div>
          <div className="right">
            {user ? (
              <div className="logged-in">
                <RoundButton
                  border
                  color="darkGray"
                  style={{ marginRight: '1.25rem' }}
                  to="/write"
                >
                  새 글 작성
                </RoundButton>
                <HeaderUserIcon user={user} onClick={toggleUserMenu} />
                <HeaderUserMenu
                  onClose={toggleUserMenu}
                  username={user.username}
                  onLogout={onLogout}
                  visible={userMenu}
                />
              </div>
            ) : (
              <RoundButton color="darkGray" onClick={onLoginClick}>
                로그인
              </RoundButton>
            )}
          </div>
        </div>
      </HeaderBlock>
      {floating && <Placeholder />}
    </>
  );
};

export default Header;
