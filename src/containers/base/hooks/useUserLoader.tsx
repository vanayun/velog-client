import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentUser, GET_CURRENT_USER } from '../../../lib/graphql/user';
import { setUser } from '../../../modules/core';
import { useQuery } from '@apollo/react-hooks';
import { RootState } from '../../../modules';
import storage from '../../../lib/storage';
import { setCrispUser } from '../../../lib/crisp';

const useUserLoader = () => {
  const dispatch = useDispatch();
  const getCurrentUser = useQuery<{ auth: CurrentUser }>(GET_CURRENT_USER);
  const prevUser = useSelector((state: RootState) => state.core.user);

  const user = getCurrentUser.data ? getCurrentUser.data.auth : undefined;

  useEffect(() => {
    if (user === undefined) return () => {};
    if (prevUser !== user) {
      storage.setItem('CURRENT_USER', user);
      dispatch(setUser(user));
    }
  }, [dispatch, prevUser, user]);

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) return; // not logged in
    //
    setCrispUser({
      email: user.email,
      nickname: user.username,
      avatar: user.profile.thumbnail,
    });
  }, [user]);
};

export default useUserLoader;
