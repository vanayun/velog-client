import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { userThumbnail } from '../../static/images';
import Tag from './TagItem';
import { PartialPost } from '../../lib/graphql/post';
import { formatDate } from '../../lib/utils';

const PostCardBlock = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  & > a {
    color: inherit;
    text-decoration: none;
  }
  &:first-child {
    padding-top: 0;
  }
  .user-info {
    display: flex;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
      display: block;
      margin-right: 1rem;
      background: ${palette.gray0};
      object-fit: cover;
      border-radius: 1.5rem;
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.1);
    }
    .username {
      font-size: 0.875rem;
      color: ${palette.gray9};
      font-weight: bold;
    }
    margin-bottom: 1.5rem;
  }
  .post-thumbnail {
    width: 100%;
    min-height: 369px;
    max-height: 369px;
    margin-bottom: 1rem;
    object-fit: cover;
  }
  line-height: 1.5;
  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: ${palette.gray9};
  }
  p {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${palette.gray7};
  }
  .subinfo {
    color: ${palette.gray6};
    font-size: 0.875rem;
    span {
    }
    span + span:before {
      content: ' · ';
    }
  }
  .tags-wrapper {
    margin-top: 0.875rem;
    margin-bottom: -0.875rem;
  }

  & + & {
    border-top: 1px solid ${palette.gray2};
  }
`;

interface PostCardProps {
  post: PartialPost;
  hideUser?: boolean;
}

const PostCard: React.FC<PostCardProps> = React.memo(({ post, hideUser }) => {
  const url = `/@${post.user.username}/${post.url_slug}`;
  return (
    <PostCardBlock>
      {!hideUser && (
        <div className="user-info">
          <img
            src={post.user.profile.thumbnail || userThumbnail}
            alt="thumbnail"
          />
          <div className="username">{post.user.username}</div>
        </div>
      )}
      {post.thumbnail && (
        <img
          className="post-thumbnail"
          src={post.thumbnail}
          alt="post-thumbnail"
        />
      )}
      <Link to={url}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.short_description}</p>
      <div className="subinfo">
        <span>{formatDate(post.released_at)}</span>
        <span>{post.comments_count}개의 댓글</span>
      </div>
      <div className="tags-wrapper">
        {post.tags.map(tag => (
          <Tag key={tag} name={tag} link />
        ))}
      </div>
    </PostCardBlock>
  );
});

export default React.memo(PostCard);
