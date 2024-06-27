import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';

import { getOrdes } from '../../services/slices/ordes';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((store: RootState) => store.orders.data);

  useEffect(() => {
    dispatch(getOrdes());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
