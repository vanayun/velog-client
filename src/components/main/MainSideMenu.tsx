import * as React from 'react';
import styled from 'styled-components';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import { MdTrendingUp, MdAccessTime, MdRssFeed } from 'react-icons/md';
import SearchInput from '../search/SearchInput';

const MainSideMenuBlock = styled.div`
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
`;
const MenuItem = styled(NavLink)`
  display: flex;
  color: ${palette.gray8};
  text-decoration: none;
  height: 48px;
  align-items: center;
  padding-left: 1rem;
  font-size: 1.125rem;
  border-left: 3px solid transparent;
  transition: 0.125s all ease-in;
  svg {
    margin-right: 1rem;
    font-size: 1.5rem;
  }
  &.active {
    background: ${palette.teal0};
    border-color: ${palette.teal6};
    color: ${palette.teal6};
    font-weight: bold;
  }
`;

const StyledSearchInput = styled(SearchInput)`
  margin-bottom: 1.5rem;
`;

interface MainSideMenuProps extends RouteComponentProps {}

const MainSideMenu: React.FC<MainSideMenuProps> = ({ history }) => {
  const onSearch = (keyword: string) => {
    history.push(`/search/?q=${keyword}`);
  };

  return (
    <MainSideMenuBlock>
      <StyledSearchInput onSearch={onSearch} />
      <MenuItem
        to="/trending"
        activeClassName="active"
        isActive={(match, location) => {
          return ['/', '/trending'].indexOf(location.pathname) !== -1;
        }}
      >
        <MdTrendingUp />
        트렌딩
      </MenuItem>
      <MenuItem to="/recent" activeClassName="active">
        <MdAccessTime />
        최신
      </MenuItem>
      <MenuItem to="/following" activeClassName="active">
        <MdRssFeed />
        팔로잉
      </MenuItem>
    </MainSideMenuBlock>
  );
};

export default withRouter(MainSideMenu);
