import React, { useCallback } from 'react';
import DetailedTagList from '../../components/tags/DetailedTagList';
import { useQuery } from '@apollo/react-hooks';
import { GetTagsResponse, GET_TAGS } from '../../lib/graphql/tags';
import useScrollPagination from '../../lib/hooks/useScrollPagination';
import { safe } from '../../lib/utils';

export type DetailedTagListContainerProps = {
  sort: 'trending' | 'alphabetical';
};

function DetailedTagListContainer({ sort }: DetailedTagListContainerProps) {
  const { data, fetchMore } = useQuery<GetTagsResponse>(GET_TAGS, {
    variables: {
      sort,
    },
  });

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          sort,
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            tags: [...prev.tags, ...fetchMoreResult.tags],
          };
        },
      });
    },
    [fetchMore, sort],
  );

  const cursor = safe(() => data!.tags![data!.tags.length - 1].id);
  useScrollPagination({
    cursor,
    onLoadMore,
  });

  if (!data || !data.tags) return null;

  return <DetailedTagList tags={data.tags} />;
}

export default DetailedTagListContainer;
