import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFeed } from '../../services/slices/feed';
import { RootState, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector((store: RootState) => store.feed.orders);

  useEffect(() => {
    dispatch(getFeed());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
