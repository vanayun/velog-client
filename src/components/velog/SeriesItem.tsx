import React from 'react';
import styled from 'styled-components';
import RatioImage from '../common/RatioImage';
import palette from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/utils';
import { formatDate } from '../../lib/utils';
import { seriesThumbnail } from '../../static/images';
import PlainLink from '../common/PlainLink';

const StyledLink = styled(PlainLink)`
  display: block;
  text-decoration: none;
  color: initial;
`;
const SeriesItemBlock = styled.div`
  width: 50%;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 3rem;
  font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
    arial, 나눔고딕, 'Nanum Gothic', 돋움;

  h4 {
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    line-height: 1.5;
    color: ${palette.gray8};
    ${ellipsis};
  }
  .info {
    font-size: 0.875rem;
    color: ${palette.gray6};
    .count {
      color: ${palette.gray8};
    }
    .dot {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }
  }
`;

export interface SeriesItemProps {
  thumbnail: string | null;
  name: string;
  postsCount: number;
  lastUpdate: string;
  username: string;
  urlSlug: string;
}

const SeriesItem: React.FC<SeriesItemProps> = ({
  thumbnail,
  name,
  postsCount,
  lastUpdate,
  urlSlug,
  username,
}) => {
  const url = `/@${username}/series/${urlSlug}`;

  return (
    <SeriesItemBlock>
      <StyledLink to={url}>
        <RatioImage
          src={thumbnail || seriesThumbnail}
          widthRatio={1.9}
          heightRatio={1}
        />
      </StyledLink>
      <h4>
        <StyledLink to={url}>{name}</StyledLink>
      </h4>
      <div className="info">
        <span className="count">{postsCount}개의 포스트</span>
        <span className="dot">·</span>
        마지막 업데이트 {formatDate(lastUpdate)}
      </div>
    </SeriesItemBlock>
  );
};

export default SeriesItem;
